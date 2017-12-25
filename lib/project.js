'use babel';

import TextEditorFacade from './text-editor-facade';

export default class Project {

    constructor(elm, workspace, fileProcessingSupervisor) {
        this.elm = elm;
        this.workspace = workspace;
        this.fileProcessingSupervisor = fileProcessingSupervisor;

        this.workspaceRetryAttempts = 0;
        this.workspaceRetryAttemptMax = 7;
    }

    /* ==============================
        PUBLIC
       ============================== */

    processAllElmFiles() {
        const elmFiles = this.workspace.getAllElmFiles();

        //NOTE: I know that the below code is hacky and sub-optimal.
        //The problem is in Atom code. The function workspace.getAllElmFiles is doing a
        //call to atom.project.getPaths(), which will return an empty array for a couple
        //of seconds the very first time Atom loads up a project. If the proper array
        //can't be generated, then Elm Lens's external reference markup numbers will be
        //wrong. The below hack will retry the Elm file scan up to seven times at one-
        //second intervals. This should eventually get the project path list on most systems.
        if (elmFiles.length === 0 && !this.hasReachedRetryLimit()) {
            setTimeout(() => this.processAllElmFiles(), 1000);
            this.workspaceRetryAttempts++;
            return;
        }

        const activeEditor = atom.workspace.getActiveTextEditor();
        const activeEditorFacade = new TextEditorFacade(activeEditor);

        this.elm.ports.registerProjectFiles.send(elmFiles);

        if (activeEditor && activeEditorFacade.isElmFile()) {
            this.fileProcessingSupervisor.addToQueue([activeEditorFacade.getFilePath()]);
        }

        this.fileProcessingSupervisor.addToQueue(elmFiles);
    }

    /* ==============================
        PRIVATE
       ============================== */

    hasReachedRetryLimit() {
        return this.workspaceRetryAttempts >= this.workspaceRetryAttemptMax;
    }

}
