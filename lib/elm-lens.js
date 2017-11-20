'use babel';

import { CompositeDisposable } from 'atom';
import { Range } from 'atom';

import TextEditorFacade from './text-editor-facade';
import FileDisplayMarkers from './file-display-markers';

import elmApp from '../elm/built/elm.js';

export default {

    activate(state) {
        this.elm = elmApp.Main.worker();

        this.subscriptions = new CompositeDisposable();

        this.subscriptions.add(atom.workspace.observeTextEditors((textEditor) => {
            const editorPath = textEditor.getPath();
            if (!editorPath) { return; }

            let facade = new TextEditorFacade(textEditor);
            let fileDisplayMarkers = new FileDisplayMarkers(textEditor);

            if (facade.isElmFile()) {
                this.elm.ports.process.send(facade.getPathAndLines());

                let elmSubscription = this.generateReportProcessor(editorPath, fileDisplayMarkers);
                this.elm.ports.report.subscribe(elmSubscription);

                const onSaveSubscription = textEditor.onDidSave(() => {
                    this.elm.ports.process.send(facade.getPathAndLines());
                });

                const onDestructionSubscription = textEditor.onDidDestroy(() => {
                    fileDisplayMarkers.reset();

                    delete facade;
                    delete fileDisplayMarkers;

                    this.elm.ports.report.unsubscribe(elmSubscription);
                    this.subscriptions.remove(onDestructionSubscription);
                    this.subscriptions.remove(onSaveSubscription);
                });

                this.subscriptions.add(onDestructionSubscription);
                this.subscriptions.add(onSaveSubscription);
            }
        }));
    },

    generateReportProcessor(editorPath, fileDisplayMarkers) {
        return (data) => {
            const fileName = data[0];
            if (fileName === editorPath) {
                fileDisplayMarkers.reset();

                const functionList = data[1];
                functionList.forEach((functionData) => {
                    const functionName = functionData[0];
                    const lineNumber = functionData[1];
                    const isExposed = functionData[2];
                    fileDisplayMarkers.generate(functionName, lineNumber, isExposed);
                });
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
