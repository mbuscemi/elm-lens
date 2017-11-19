'use babel';

export default class TextEditorFacade {

    constructor(textEditor) {
        this.textEditor = textEditor;
    }

    /* ==============================
        PUBLIC
       ============================== */

    getFileName() {
        return this.textEditor.getFileName();
    }

    isElmFile() {
        const fileName = this.getFileName();
        const lastFourCharsOfFileName = fileName.substr(fileName.length - 4);
        return lastFourCharsOfFileName === ".elm";
    }

    getFirstLine() {
        return this.textEditor.lineTextForBufferRow(0);
    }

    getAllLines() {
        return this.textEditor.getText();
    }

    dispose() {
        return this.textEditor.dispose;
    }

    onDidDestroy() {
        return this.textEditor.onDidDestroy;
    }

}
