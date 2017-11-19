'use babel';

import { CompositeDisposable } from 'atom';
import { Range } from 'atom';

import TextEditorFacade from './text-editor-facade';

import elmApp from '../elm/built/elm.js';

export default {

    activate(state) {
        this.elm = elmApp.Main.worker();

        this.subscriptions = new CompositeDisposable();

        this.subscriptions.add(atom.workspace.observeTextEditors((textEditor) => {
            const editorPath = textEditor.getPath();
            if (!editorPath) { return; }

            let facade = new TextEditorFacade(textEditor);
            // console.log(textEditor);
            // console.log(facade.getFileName());
            // console.log(facade.isElmFile());
            // console.log(facade.getFirstLine());

            if (facade.isElmFile()) {
                this.elm.ports.process.send([facade.getFilePath(), facade.getFirstLine(), facade.getAllLines()]);

                this.elm.ports.report.subscribe((data) => {
                    const fileName = data[0];
                    if (fileName === editorPath) {
                        const functionList = data[1];

                        console.log(fileName);

                        functionList.forEach((functionData) => {
                            const functionName = functionData[0];
                            const lineNumber = functionData[1];
                            const isExposed = functionData[2];

                            console.log(functionName, lineNumber, isExposed);

                            // console.log(textEditor);
                            let element = document.createElement("div");
                            element.classList.add("elm-lens-marker", "syntax--keyword", "syntax--other");
                            element.innerHTML = (isExposed) ? "exposed" : "internal";

                            const displayMarker = textEditor.defaultMarkerLayer.markBufferRange(new Range([lineNumber, 0], [lineNumber, functionName.length]));
                            textEditor.decorateMarker(displayMarker, { type: "block", position: "head", item: element });
                        });
                    }
                });

                const subscription = textEditor.onDidDestroy(() => {
                    delete facade;
                    this.subscriptions.remove(subscription);
                });

                this.subscriptions.add(subscription);
            }
        }));
    },

    deactivate() {
        this.subscriptions.dispose();
    },

    serialize() {
        return {};
    }

};
