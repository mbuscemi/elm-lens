'use babel';

export default class TextEditorFacade {

    constructor(textEditor) {
        this.textEditor = textEditor;
    }

    /* ==============================
        PUBLIC
       ============================== */

    getPathAndLines() {
        return [this.getFilePath(), this.getText()];
    }

    getFileName() {
        return this.textEditor.getFileName();
    }

    getFilePath() {
        return this.textEditor.getPath();
    }

    isElmFile() {
        const fileName = this.getFileName();
        const lastFourCharsOfFileName = (fileName) ? fileName.substr(fileName.length - 4) : "";
        return lastFourCharsOfFileName === ".elm";
    }

    getFirstLine() {
        return this.textEditor.lineTextForBufferRow(0);
    }

    getText() {
        return this.textEditor.getText();
    }

    dispose() {
        return this.textEditor.dispose;
    }

    onDidDestroy() {
        return this.textEditor.onDidDestroy;
    }

}
