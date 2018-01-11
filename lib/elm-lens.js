'use babel';

import { CompositeDisposable } from 'atom';
import { Range } from 'atom';

import Config from './config.js';
import ElmLensView from './elm-lens-view.js';
import Workspace from './workspace.js';
import FileProcessingSupervisor from './file-processing-supervisor.js';
import Project from './project.js';
import Navigation from './navigation.js';

import elmApp from '../elm/built/elm.js';

export default {

    config: Config,

    activate(state) {
        this.elmLensView = new ElmLensView(state.elmLensViewState);
        this.elm = elmApp.Main.embed(this.elmLensView.element);

        this.subscriptions = new CompositeDisposable();
        this.activateSubscriptions();
        this.initializeElmPorts();

        this.fileProcessingSupervisor = new FileProcessingSupervisor(this.elm);
        this.workspace = new Workspace(this.elm, this.subscriptions, this.fileProcessingSupervisor, this.elmLensView);
        this.project = new Project(this.elm, this.workspace, this.fileProcessingSupervisor);
        this.navigation = new Navigation();

        this.project.processAllElmFiles();
        this.workspace.monitorTextEditors();

        return this.elmLensView;
    },

    activateSubscriptions() {
        this.subscriptions.add(atom.workspace.addOpener(uri => {
            if (uri === 'atom://elm-lens-reference-panel') {
                return this.elmLensView;
            }
        }));

        this.subscriptions.add(atom.commands.add('atom-workspace', {
            "elm-lens:toggle-markup-display": () => this.toggleMarkupDisplay()
        }));
    },

    initializeElmPorts() {
        this.elm.ports.fileLineRequest.subscribe((data) => {
            let response = {};

            Object.keys(data).forEach((fileName) => {
                const lines = data[fileName];
                response[fileName] = this.workspace.getLinesForFile(fileName, lines);
            });

            this.elm.ports.reportFileLines.send(response);
        });

        this.elm.ports.fileOpenRequest.subscribe((data) => {
            this.navigation.openFileAt(data[0], data[1], data[2]);
        });
    },

    deactivate() {
        this.subscriptions.dispose();
        this.fileProcessingSupervisor.terminateAllWorkers();
    },

    serialize() {
        return {};
    },

    toggleMarkupDisplay() {
        const shouldShowAccessStatus = atom.config.get("elm-lens.display-access-control");
        const shouldShowInternalRefs = atom.config.get("elm-lens.display-internal-references");
        const shouldShowExternalRefs = atom.config.get("elm-lens.display-external-references");

        const targetMode = !(shouldShowAccessStatus || shouldShowInternalRefs || shouldShowExternalRefs);

        atom.config.set("elm-lens.display-access-control", targetMode);
        atom.config.set("elm-lens.display-internal-references", targetMode);
        atom.config.set("elm-lens.display-external-references", targetMode);
    }

};
