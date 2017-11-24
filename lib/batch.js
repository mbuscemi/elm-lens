'use babel';

export default class Batch {

    constructor() {
        this.isProcessing = false;
        this.callbacks = [];
        this.completionCount = 0;
    }

    /* ==============================
        PUBLIC
       ============================== */

    process(elmFiles, batchSize, batchDelay) {
        this.isProcessing = true;
        this.numFilesToProcess = elmFiles.length;
        this.processHelper(elmFiles, batchSize, batchDelay);
    }

    onProcessingComplete(callback) {
        if (this.isProcessing) {
            this.callbacks.push(callback);
        } else {
            callback();
        }
    }

    /* ==============================
        PRIVATE
       ============================== */

    processHelper(elmFiles, batchSize, batchDelay) {
        const elmFilesToProcess = elmFiles.slice(0, batchSize);
        const elmFilesToDelay = elmFiles.slice(batchSize);

        elmFilesToProcess.forEach(elmFile => elmFile.process(() => this.incrementCompletionCount()));

        if (elmFilesToDelay.length > 0) {
            setTimeout(() => this.processHelper(elmFilesToDelay, batchSize, batchDelay));
        }
    }

    incrementCompletionCount() {
        this.completionCount += 1;
        if (this.completionCount >= this.numFilesToProcess) {
            this.complete();
        }
    }

    complete() {
        this.isProcessing = false;
        this.callbacks.forEach(callback => callback());
        this.callbacks = [];
    }

}
