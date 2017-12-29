'use babel';

import fs from 'fs';
import path from 'path';

import TextEditorFacade from './text-editor-facade';
import FileDisplayMarkers from './file-display-markers';

export default class Workspace {

    constructor(elm, subscriptions, fileProcessingSupervisor, referencePanelView) {
        this.elm = elm;
        this.subscriptions = subscriptions;
        this.fileProcessingSupervisor = fileProcessingSupervisor;
        this.referencePanelView = referencePanelView;
    }

    /* ==============================
        PUBLIC
       ============================== */

    monitorTextEditors() {
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
    }

    getProjectPaths() {
        return atom.project.getPaths();
    }

    getAllElmFiles() {
        let elmFiles = [];

        this.getProjectPaths().forEach(dirPath => {
            elmFiles = elmFiles.concat(this.findElmFilesInSubdirectories(dirPath));
        });

        return elmFiles;
    }

    /* ==============================
        PRIVATE
       ============================== */

    processMarkupRequest(editorPath, fileDisplayMarkers) {
        return (data) => {
            if (data.fileName === editorPath) {
                fileDisplayMarkers.reset();
                data.expressions.forEach(expression => fileDisplayMarkers.generate(expression, data.projectIsProcessed, data.fileIsReprocessing));
            }
        };
    }

    findElmFilesInSubdirectories(dirPath) {
        let elmFiles = this.elmFileList(dirPath);
        const subdirectories = this.subdirectoryList(dirPath);

        subdirectories.forEach(subDir => {
            elmFiles = elmFiles.concat(this.findElmFilesInSubdirectories(subDir));
        });

        return elmFiles;
    }

    elmFileList(dirPath) {
        const finalDir = checkPath => checkPath.split(path.sep).pop();
        const isNotElmFile = source => finalDir(source).substr(-4) === ".elm";

        return fs.readdirSync(dirPath)
            .map(name => path.join(dirPath, name))
            .filter(isNotElmFile);
    }

    subdirectoryList(dirPath) {
        const isDirectory = source => fs.lstatSync(source).isDirectory();

        const finalDir = checkPath => checkPath.split(path.sep).pop();
        const isNotElmStuff = source => finalDir(source) !== "elm-stuff";
        const isNotNodeModules = source => finalDir(source) !== "node_modules";
        const doesNotBeginWithDot = source => finalDir(source).substr(0, 1) !== ".";

        return fs.readdirSync(dirPath)
           .map(name => path.join(dirPath, name))
           .filter(isDirectory)
           .filter(isNotElmStuff)
           .filter(isNotNodeModules)
           .filter(doesNotBeginWithDot);
    }

}
