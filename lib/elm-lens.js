'use babel';

import { CompositeDisposable } from 'atom';
import { Range } from 'atom';

import TextEditorFacade from './text-editor-facade';
import FileDisplayMarkers from './file-display-markers';
import Workspace from './workspace';
import Batch from './batch';

import elmApp from '../v2/built/elm.js';

export default {

    activate(state) {
        this.elm = elmApp.Main.worker();
        this.subscriptions = new CompositeDisposable();

        this.workspace = new Workspace(this.elm);
        this.elmFiles = this.workspace.getAllElmFiles();

        this.batch = new Batch();
        this.batch.process(this.elmFiles, 2, 1000);

        this.subscriptions.add(atom.workspace.observeTextEditors((textEditor) => {
            const editorPath = textEditor.getPath();
            if (!editorPath) { return; }

            let facade = new TextEditorFacade(textEditor);
            let fileDisplayMarkers = new FileDisplayMarkers(textEditor);

            if (facade.isElmFile()) {
                this.batch.onProcessingComplete(() => {
                    this.elm.ports.fileMarkupRequest.send(facade.getFilePath());
                });

                let elmSubscription = this.processMarkupRequest(editorPath, fileDisplayMarkers);
                this.elm.ports.markupForFile.subscribe(elmSubscription);

                let onSaveSubscription = textEditor.onDidSave(() => {
                    this.elm.ports.fileMarkupRequest.send(facade.getFilePath());
                });

                let onDestructionSubscription = textEditor.onDidDestroy(() => {
                    fileDisplayMarkers.reset();

                    delete facade;
                    delete fileDisplayMarkers;

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
            }
        };
    },

    // generateReportProcessor(editorPath, fileDisplayMarkers) {
    //     return (data) => {
    //         if (data.fileName === editorPath) {
    //             fileDisplayMarkers.reset();
    //             data.functions.forEach(func => fileDisplayMarkers.generate(func));
    //         }
    //     };
    // },

    deactivate() {
        this.subscriptions.dispose();
    },

    serialize() {
        return {};
    }

};
