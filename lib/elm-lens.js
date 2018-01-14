'use babel';

import { CompositeDisposable } from 'atom';
import { Range } from 'atom';

import Config from './config';
import ElmLensView from './elm-lens-view';
import Workspace from './workspace';
import WorkspaceMonitor from './workspace-monitor';
import FileProcessingSupervisor from './file-processing-supervisor';
import Project from './project';
import Navigation from './navigation';
import MarkupDisplay from './markup-display';

import elmApp from '../elm/built/elm.js';

export default {

    config: Config,

    activate(state) {
        this.elmLensView = new ElmLensView(state.elmLensViewState);
        this.elm = elmApp.Main.embed(this.elmLensView.element);

        this.subscriptions = new CompositeDisposable();
        this.activateSubscriptions();
        this.initializeElmPorts();

        this.workspace = new Workspace();
        this.navigation = new Navigation();
        this.markupDisplay = new MarkupDisplay();

        this.fileProcessingSupervisor = new FileProcessingSupervisor(this.elm);
        this.workspaceMonitor = new WorkspaceMonitor(this.elm, this.subscriptions, this.fileProcessingSupervisor, this.elmLensView);
        this.project = new Project(this.elm, this.workspace, this.fileProcessingSupervisor);

        this.project.processAllElmFiles();
        this.workspaceMonitor.observeTextEditors();

        return this.elmLensView;
    },

    activateSubscriptions() {
        this.subscriptions.add(atom.workspace.addOpener(uri => {
            if (uri === "atom://elm-lens-reference-panel") {
                return this.elmLensView;
            }
        }));

        this.subscriptions.add(atom.commands.add("atom-workspace", {
            "elm-lens:toggle-markup-display": () => this.markupDisplay.toggle()
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
    }

};
