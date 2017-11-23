'use babel';

import { CompositeDisposable } from 'atom';
import { Range } from 'atom';
import { BufferedNodeProcess } from 'atom';

import TextEditorFacade from './text-editor-facade';
import FileDisplayMarkers from './file-display-markers';

import elmApp from '../v2/built/elm.js';

export default {

    activate(state) {
        this.elm = elmApp.Main.worker();

        this.subscriptions = new CompositeDisposable();

        this.subscriptions.add(atom.workspace.observeTextEditors((textEditor) => {
            const editorPath = textEditor.getPath();
            if (!editorPath) { return; }

            let facade = new TextEditorFacade(textEditor);
        //     let fileDisplayMarkers = new FileDisplayMarkers(textEditor);

            if (facade.isElmFile()) {

                const command = "./worker-process.js";
                const args = [facade.getFilePath(), facade.getText()];
                const options = { cwd: __dirname };

                const stdout = (output) => {
                    console.log(output);
                    this.elm.ports.processReport.send(JSON.parse(output));
                };

                const stderr = (error) => console.log(error);
                const exit = (code) => console.log(code);
                const process = new BufferedNodeProcess({command, args, options, stdout, stderr, exit});

        //         this.elm.ports.process.send(facade.getPathAndLines());
        //
        //         let elmSubscription = this.generateReportProcessor(editorPath, fileDisplayMarkers);
        //         this.elm.ports.report.subscribe(elmSubscription);
        //
        //         const onSaveSubscription = textEditor.onDidSave(() => {
        //             this.elm.ports.process.send(facade.getPathAndLines());
        //         });
        //
        //         const onDestructionSubscription = textEditor.onDidDestroy(() => {
        //             fileDisplayMarkers.reset();
        //
        //             delete facade;
        //             delete fileDisplayMarkers;
        //
        //             this.elm.ports.report.unsubscribe(elmSubscription);
        //             this.subscriptions.remove(onDestructionSubscription);
        //             this.subscriptions.remove(onSaveSubscription);
        //         });
        //
        //         this.subscriptions.add(onDestructionSubscription);
        //         this.subscriptions.add(onSaveSubscription);
            }
        }));
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
