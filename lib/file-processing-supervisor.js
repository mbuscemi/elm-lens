'use babel';

import WorkerProcess from './worker-process.js';

export default class FileProcessingSupervisor {

    constructor(elm) {
        this.elm = elm;

        this.numWorkers = 3;
        this.workers = [];

        this.fileQueue = [];

        this.initializeWorkers();
    }

    /* ==============================
        PUBLIC
       ============================== */

    addToQueue(files) {
        this.fileQueue = files.concat(this.fileQueue);

        this.workers.forEach(worker => {
            if (!worker.isProcessing) {
                this.processNextFile(worker);
            }
        });
    }

    onWorkerReady(worker) {
        this.processNextFile(worker);
    }

    terminateAllWorkers() {
        this.workers.forEach(worker => worker.terminate());
        this.workers = [];
    }

    /* ==============================
        PRIVATE
       ============================== */

    initializeWorkers() {
        for (i = 0; i < this.numWorkers; i++) {
            this.workers.push(new WorkerProcess(this, this.elm));
        }
    }

    processNextFile(worker) {
        if (this.fileQueue.length > 0) {
            worker.processFile(this.fileQueue.pop());
        }
    }

}
