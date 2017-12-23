'use babel';

import fs from 'fs';

import { BufferedNodeProcess } from 'atom';

export default class ElmFile {

    constructor(elm, filePath) {
        this.elm = elm;
        this.filePath = filePath;
        this.fileText = fs.readFileSync(filePath, "utf8");
    }

    /* ==============================
        PUBLIC
       ============================== */

    process(callback) {
        const command = "./worker.js";
        const args = [this.filePath, this.fileText];
        const options = { cwd: __dirname };

        const stdout = output => this.processStdout(output);
        const stderr = error => this.processStderr(error);
        const exit = code => this.processExit(code);

        const process = new BufferedNodeProcess({command, args, options, stdout, stderr, exit});
        this.callback = callback;
    }

   /* ==============================
       PRIVATE
      ============================== */

      processStdout(output) {
          //console.log(output);
          this.elm.ports.processReport.send(JSON.parse(output));
      }

      processStderr(error) {
          //console.log(error);
      }

      processExit(code) {
          //console.log(code);
          this.callback();
          delete this.callback;
      }

}
