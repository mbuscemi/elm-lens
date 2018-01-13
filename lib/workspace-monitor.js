'use babel';

import TextEditorFacade from './text-editor-facade';
import FileDisplayMarkers from './file-display-markers';

export default class WorkspaceMonitor {

    constructor(elm, subscriptions, fileProcessingSupervisor, referencePanelView) {
        this.elm = elm;
        this.subscriptions = subscriptions;
        this.fileProcessingSupervisor = fileProcessingSupervisor;
        this.referencePanelView = referencePanelView;
    }

    /* ==============================
        PUBLIC
    ================================= */

    observeTextEditors() {
        this.subscriptions.add(atom.workspace.observeTextEditors((textEditor) => {
            const editorPath = textEditor.getPath();
            if (!editorPath) { return; }

            let facade = new TextEditorFacade(textEditor);
            let fileDisplayMarkers = new FileDisplayMarkers(this.elm, textEditor, this.referencePanelView);

            if (facade.isElmFile()) {
                this.elm.ports.registerTextEditor.send(facade.getFilePath());

                let elmSubscription = this.processMarkupRequest(editorPath, fileDisplayMarkers);
                this.elm.ports.markupForFile.subscribe(elmSubscription);

                this.fileProcessingSupervisor.addToQueue([facade.getFilePath()]);

                let onSaveSubscription = textEditor.onDidSave(() => this.reprocessFile(facade));
                let markupToggleSubscription = atom.commands.add(
                    "atom-workspace",
                    { "elm-lens:refresh-active-editors": () => this.reprocessFile(facade) }
                );

                let onDestructionSubscription = textEditor.onDidDestroy(() => {
                    fileDisplayMarkers.reset();

                    delete facade;
                    delete fileDisplayMarkers;

                    this.elm.ports.unregisterTextEditor.send(facade.getFilePath());
                    this.elm.ports.markupForFile.unsubscribe(elmSubscription);
                    this.subscriptions.remove(onSaveSubscription);
                    this.subscriptions.remove(markupToggleSubscription);
                    this.subscriptions.remove(onDestructionSubscription);
                });

                this.subscriptions.add(onSaveSubscription);
                this.subscriptions.add(markupToggleSubscription);
                this.subscriptions.add(onDestructionSubscription);
            }
        }));
    }

    /* ==============================
        PRIVATE
    ================================= */

    reprocessFile(facade) {
        this.elm.ports.notifyReprocessingFile.send(facade.getFilePath());
        this.fileProcessingSupervisor.addToQueue([facade.getFilePath()]);
    }

    processMarkupRequest(editorPath, fileDisplayMarkers) {
        return (data) => {
            if (data.fileName === editorPath) {
                fileDisplayMarkers.reset();
                data.expressions.forEach(expression => fileDisplayMarkers.generate(expression, data.projectIsProcessed, data.fileIsReprocessing));
            }
        };
    }

}
