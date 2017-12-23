'use babel';

import fs from 'fs';

import { BufferedNodeProcess } from 'atom';

export default class WorkerProcess {

    constructor(elm) {
        this.elm = elm;
        this.nodeProcess = null;

        this.initialize();
    }

    /* ==============================
        PUBLIC
       ============================== */

    processFile(name) {
        const fileText = fs.readFileSync(name, "utf8");
        this.nodeProcess.send({ name: "processFile", filePath: name, fileText: fileText });
    }

    terminate() {
        this.nodeProcess.send({ name: "exit" });
    }

   /* ==============================
       PRIVATE
      ============================== */

    initialize(callback) {
        const command = "./worker.js";
        const args = [];
        const options = { cwd: __dirname };

        const stdout = output => this.processStdout(output);
        const stderr = error => this.processStderr(error);
        const exit = code => this.processExit(code);

        this.nodeProcess = new BufferedNodeProcess({command, args, options, stdout, stderr, exit});
    }

    processStdout(output) {
        //console.log(output);
        this.elm.ports.processReport.send(JSON.parse(output));
    }

    processStderr(error) {
        //console.log(error);
    }

    processExit(code) {
        //console.log(code);
    }

}
