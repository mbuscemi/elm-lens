'use babel';

import { CompositeDisposable } from 'atom';
import { Range } from 'atom';

import ElmLensView from './elm-lens-view.js';
import Workspace from './workspace.js';
import FileProcessingSupervisor from './file-processing-supervisor.js';
import Project from './project.js';

import elmApp from '../elm/built/elm.js';

export default {

    activate(state) {
        this.elmLensView = new ElmLensView(state.elmLensViewState);
        this.elm = elmApp.Main.embed(this.elmLensView.element);

        this.subscriptions = new CompositeDisposable();
        this.activateSubscriptions();
        this.initializeElmPorts();

        this.fileProcessingSupervisor = new FileProcessingSupervisor(this.elm);
        this.workspace = new Workspace(this.elm, this.subscriptions, this.fileProcessingSupervisor, this.elmLensView);
        this.project = new Project(this.elm, this.workspace, this.fileProcessingSupervisor);

        this.project.processAllElmFiles();
        this.workspace.monitorTextEditors();

        return this.elmLensView;
    },

    activateSubscriptions() {
        this.subscriptions.add(atom.workspace.addOpener(uri => {
            if (uri === 'atom://elm-lens') {
                return this.elmLensView;
            }
        }));
    },

    initializeElmPorts() {
        this.elm.ports.fileLineRequest.subscribe((data) => {
            console.log(data);
        });
    },

    deactivate() {
        this.subscriptions.dispose();
        this.fileProcessingSupervisor.terminateAllWorkers();
    },

    serialize() {
        return {};
    }

};
