'use babel';

export default class ElmLensView {

    constructor() {
        this.element = document.createElement('div');
        this.element.classList.add('elm-lens');
        this.showing = false;
    }

    getTitle() {
        return 'Elm Lens: References';
    }

    getIconName() {
        return 'search';
    }

    getDefaultLocation() {
        return 'bottom';
    }

    getAllowedLocations() {
        return ['bottom'];
    }

    getURI() {
        return 'atom://elm-lens';
    }

    getElement() {
        return this.element;
    }

    isOpen() {
        return this.showing;
    }

    isClosed() {
        return !this.showing;
    }

    toggle() {
        atom.workspace.toggle(this.getURI());
        this.showing = !this.showing;
    }

    toggleIfClosed() {
        if (this.isClosed()) {
            this.toggle();
        }
    }

    setState(newState) {
        this.state = newState;
    }

    serialize() {
        return {
            deserializer: 'ElmLensView',
            data: this.state
        };
    }

    deserialize(serializedState) {
        this.state = {};
    }

    destroy() {
        this.element.remove();
    }

}
