'use babel';

import { CompositeDisposable } from 'atom';
import { Range } from 'atom';

import TextEditorFacade from './text-editor-facade';
import FileDisplayMarkers from './file-display-markers';
import Workspace from './workspace';
import FileProcessingSupervisor from './file-processing-supervisor.js';
import Project from './project.js';

import elmApp from '../elm/built/elm.js';

export default {

    activate(state) {
        this.elm = elmApp.Main.worker();
        this.workspace = new Workspace();
        this.fileProcessingSupervisor = new FileProcessingSupervisor(this.elm);
        this.project = new Project(this.elm, this.workspace, this.fileProcessingSupervisor);
        this.subscriptions = new CompositeDisposable();

        this.project.processAllElmFiles();
        this.monitorWorkspaceTextEditors();
    },

    monitorWorkspaceTextEditors() {
        this.subscriptions.add(atom.workspace.observeTextEditors((textEditor) => {
            const editorPath = textEditor.getPath();
            if (!editorPath) { return; }

            let facade = new TextEditorFacade(textEditor);
            let fileDisplayMarkers = new FileDisplayMarkers(textEditor);

            if (facade.isElmFile()) {
                this.elm.ports.registerTextEditor.send(facade.getFilePath());

                let elmSubscription = this.processMarkupRequest(editorPath, fileDisplayMarkers);
                this.elm.ports.markupForFile.subscribe(elmSubscription);

                this.fileProcessingSupervisor.addToQueue([facade.getFilePath()]);

                let onSaveSubscription = textEditor.onDidSave(() => {
                    this.elm.ports.notifyReprocessingFile.send(facade.getFilePath());
                    this.fileProcessingSupervisor.addToQueue([facade.getFilePath()]);
                });

                let onDestructionSubscription = textEditor.onDidDestroy(() => {
                    fileDisplayMarkers.reset();

                    delete facade;
                    delete fileDisplayMarkers;

                    this.elm.ports.unregisterTextEditor.send(facade.getFilePath());
                    this.elm.ports.markupForFile.unsubscribe(elmSubscription);
                    this.subscriptions.remove(onSaveSubscription);
                    this.subscriptions.remove(onDestructionSubscription);
                });

                this.subscriptions.add(onSaveSubscription);
                this.subscriptions.add(onDestructionSubscription);
            }
        }));
    },

    processMarkupRequest(editorPath, fileDisplayMarkers) {
        return (data) => {
            if (data.fileName === editorPath) {
                fileDisplayMarkers.reset();
                data.expressions.forEach(expression => fileDisplayMarkers.generate(expression, data.projectIsProcessed, data.fileIsReprocessing));
            }
        };
    },

    deactivate() {
        this.subscriptions.dispose();
        this.fileProcessingSupervisor.terminateAllWorkers();
    },

    serialize() {
        return {};
    }

};
