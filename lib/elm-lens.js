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
            let displayMarkers = [];

            if (facade.isElmFile()) {
                this.elm.ports.process.send(facade.getPathAndLines());

                this.elm.ports.report.subscribe((data) => {
                    const fileName = data[0];
                    if (fileName === editorPath) {
                        displayMarkers.forEach((marker) => marker.destroy())
                        displayMarkers = [];

                        const functionList = data[1];
                        functionList.forEach((functionData) => {
                            const functionName = functionData[0];
                            const lineNumber = functionData[1];
                            const isExposed = functionData[2];

                            let element = document.createElement("div");
                            element.classList.add("elm-lens-marker", "syntax--keyword", "syntax--other");
                            element.innerHTML = (isExposed) ? "exposed" : "internal";

                            const displayMarker = textEditor.defaultMarkerLayer.markBufferRange(new Range([lineNumber, 0], [lineNumber, functionName.length]));
                            textEditor.decorateMarker(displayMarker, { type: "block", position: "head", item: element });
                            displayMarkers.push(displayMarker);
                        });
                    }
                });

                const onSaveSubscription = textEditor.onDidSave(() => {
                    this.elm.ports.process.send(facade.getPathAndLines());
                });

                const onDestructionSubscription = textEditor.onDidDestroy(() => {
                    delete facade;
                    this.subscriptions.remove(onDestructionSubscription);
                    this.subscriptions.remove(onSaveSubscription);
                });

                this.subscriptions.add(onDestructionSubscription);
                this.subscriptions.add(onSaveSubscription);
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
