'use babel';

import { CompositeDisposable } from 'atom';

import TextEditorFacade from './text-editor-facade';

export default {

    activate(state) {
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
