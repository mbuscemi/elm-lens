'use babel';

import { CompositeDisposable } from 'atom';
import { Range } from 'atom';

import Workspace from './workspace';
import FileProcessingSupervisor from './file-processing-supervisor.js';
import Project from './project.js';

import elmApp from '../elm/built/elm.js';

export default {

    activate(state) {
        this.elm = elmApp.Main.worker();
        this.subscriptions = new CompositeDisposable();
        this.fileProcessingSupervisor = new FileProcessingSupervisor(this.elm);
        this.workspace = new Workspace(this.elm, this.subscriptions, this.fileProcessingSupervisor);
        this.project = new Project(this.elm, this.workspace, this.fileProcessingSupervisor);

        this.project.processAllElmFiles();
        this.workspace.monitorTextEditors();
    },

    deactivate() {
        this.subscriptions.dispose();
        this.fileProcessingSupervisor.terminateAllWorkers();
    },

    serialize() {
        return {};
    }

};
