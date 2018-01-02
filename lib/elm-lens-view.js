'use babel';

export default class ElmLensView {

    constructor() {
        this.element = document.createElement('div');
        this.element.classList.add('elm-lens');
        this.showing = false;
        this.lastOpenedId = null;
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

    getLastUniqueId() {
        return this.lastOpenedId;
    }

    toggle(uniqueId) {
        atom.workspace.toggle(this.getURI());
        this.showing = !this.showing;
        this.lastOpenedId = uniqueId;
    }

    toggleIfClosed(uniqueId) {
        if (this.isClosed()) {
            this.toggle(uniqueId);
        } else {
            this.lastOpenedId = uniqueId;
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
