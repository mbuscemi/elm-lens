'use babel';

export default class Batch {

    constructor() {}

    /* ==============================
        PUBLIC
       ============================== */

    process(elmFiles, batchSize, batchDelay) {
        const elmFilesToProcess = elmFiles.slice(0, batchSize);
        const elmFilesToDelay = elmFiles.slice(batchSize);

        elmFilesToProcess.forEach(elmFile => elmFile.process(() => {}));

        if (elmFilesToDelay.length > 0) {
            setTimeout(() => this.process(elmFilesToDelay, batchSize, batchDelay), batchDelay);
        }
    }

}
