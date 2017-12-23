'use babel';

import WorkerProcess from './worker-process.js';

export default class FileProcessingSupervisor {

    constructor(elm) {
        this.elm = elm;

        this.workers = [];
        this.numWorkers = 3;

        this.initializeWorkers();
    }

    /* ==============================
        PUBLIC
       ============================== */

    terminateAllWorkers() {
        this.workers.forEach(worker => worker.terminate());
        this.workers = [];
    }

    /* ==============================
        PRIVATE
       ============================== */

    initializeWorkers() {
        for (i = 0; i < this.numWorkers; i++) {
            this.workers.push(new WorkerProcess(this.elm));
        }
    }

}
