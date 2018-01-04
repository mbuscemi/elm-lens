'use babel';

import fs from 'fs';
import path from 'path';

export default class Navigation {

    constructor() {}

    /* ==============================
        PUBLIC
       ============================== */

    openFileAt(filePath, lineNumber, column) {
        let promise = atom.workspace.open(filePath, { pending: true });
        promise.then((editor) => {
            editor.scrollToBufferPosition([lineNumber, column]);
            editor.setCursorBufferPosition([lineNumber, column]);
        });
    }

}
