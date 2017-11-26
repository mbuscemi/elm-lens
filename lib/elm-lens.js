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
        this.subscriptions = new CompositeDisposable();

        this.workspace = new Workspace(this.elm);
        this.elmFiles = this.workspace.getAllElmFiles();

        this.batch = new Batch();

        let activeEditor = atom.workspace.getActiveTextEditor();
        let activeEditorFacade = new TextEditorFacade(activeEditor);

        // Prioritize current open window if it is an Elm file.
        // Otherwise, start the batch immediately
        if (activeEditor && activeEditorFacade.isElmFile()) {
            (new ElmFile(this.elm, activeEditorFacade.getFilePath())).process(() => {
                this.batch.process(this.elmFiles, 2, 100);
            });
        } else {
            this.batch.process(this.elmFiles, 2, 100);
        }

        // Observe all text editors, and, if they're Elm files,
        // reprocess their text on save and update display markers.
        this.subscriptions.add(atom.workspace.observeTextEditors((textEditor) => {
            const editorPath = textEditor.getPath();
            if (!editorPath) { return; }

            let facade = new TextEditorFacade(textEditor);
            let fileDisplayMarkers = new FileDisplayMarkers(textEditor);

            if (facade.isElmFile()) {
                this.elm.ports.registerTextEditor.send(facade.getFilePath());

                let elmSubscription = this.processMarkupRequest(editorPath, fileDisplayMarkers);
                this.elm.ports.markupForFile.subscribe(elmSubscription);

                let onSaveSubscription = textEditor.onDidSave(() => {
                    console.log("sent request for " + facade.getFileName());
                    this.elm.ports.notifyReprocessingFile.send(facade.getFilePath());
                    (new ElmFile(this.elm, facade.getFilePath())).process(() => {});
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
                console.log(data);
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
