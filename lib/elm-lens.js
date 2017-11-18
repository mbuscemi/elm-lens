'use babel';

import { CompositeDisposable } from 'atom';

export default {

    activate(state) {
        this.subscriptions = new CompositeDisposable();
    },

    deactivate() {
        this.subscriptions.dispose();
    },

    serialize() {
        return {};
    }

};
