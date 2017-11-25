'use babel';

export default class Batch {

    constructor() {
        this.isProcessingComplete = false;
        this.callbacks = [];
        this.completionCount = 0;
    }

    /* ==============================
        PUBLIC
       ============================== */

    process(elmFiles, batchSize, batchDelay) {
        this.numFilesToProcess = elmFiles.length;
        this.processHelper(elmFiles, batchSize, batchDelay);
    }

    onProcessingComplete(callback) {
        if (this.isProcessingComplete) {
            callback();
        } else {
            this.callbacks.push(callback);
        }
    }

    isDoneProcessing() {
        return this.isProcessingComplete;
    }

    isStillProcessing() {
        return !this.isProcessingComplete;
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
        console.log("processed " + this.completionCount + " / " + this.numFilesToProcess + " files");
        if (this.completionCount >= this.numFilesToProcess) {
            this.complete();
        }
    }

    complete() {
        this.isProcessingComplete = true;
        this.callbacks.forEach(callback => callback());
        this.callbacks = [];
    }

}
