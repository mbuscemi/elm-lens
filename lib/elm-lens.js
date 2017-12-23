'use babel';

import { CompositeDisposable } from 'atom';
import { Range } from 'atom';

import TextEditorFacade from './text-editor-facade';
import FileDisplayMarkers from './file-display-markers';
import Workspace from './workspace';
import Batch from './batch';
import ElmFile from './elm-file';

import elmApp from '../elm/built/elm.js';

export default {

    activate(state) {
        this.elm = elmApp.Main.worker();
        this.workspace = new Workspace();
        this.batch = new Batch();
        this.subscriptions = new CompositeDisposable();

        this.processEntireProject();
        this.monitorWorkspaceTextEditors();
    },

    processEntireProject() {
        const elmFiles = this.workspace.getAllElmFiles();
        const activeEditor = atom.workspace.getActiveTextEditor();
        const activeEditorFacade = new TextEditorFacade(activeEditor);

        this.elm.ports.registerProjectFiles.send(elmFiles);

        if (activeEditor && activeEditorFacade.isElmFile()) {
            this.processFile(activeEditorFacade, () => this.processAllFiles(elmFiles));
        } else {
            this.processAllFiles(elmFiles);
        }
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

                this.processFile(facade, () => {});

                let onSaveSubscription = textEditor.onDidSave(() => {
                    //console.log("sent request for " + facade.getFileName());
                    this.elm.ports.notifyReprocessingFile.send(facade.getFilePath());
                    this.processFile(facade, () => {});
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

    processFile(editorFacade, callback) {
        (new ElmFile(this.elm, editorFacade.getFilePath()).process(callback));
    },

    processAllFiles(elmFiles) {
        const elmFileObjects = elmFiles.map(filePath => new ElmFile(this.elm, filePath));
        this.batch.process(elmFileObjects, 1, 330);
    },

    processMarkupRequest(editorPath, fileDisplayMarkers) {
        return (data) => {
            if (data.fileName === editorPath) {
                //console.log(data);
                fileDisplayMarkers.reset();
                data.expressions.forEach(expression => fileDisplayMarkers.generate(expression, data.projectIsProcessed, data.fileIsReprocessing));
            }
        };
    },

    deactivate() {
        this.subscriptions.dispose();
    },

    serialize() {
        return {};
    }

};
