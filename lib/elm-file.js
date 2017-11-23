'use babel';

import { BufferedNodeProcess } from 'atom';

export default class ElmFile {

    constructor(elm) {
        this.elm = elm;
    }

    /* ==============================
        PUBLIC
       ============================== */

    process(filePath, text) {
        const command = "./worker-process.js";
        const args = [filePath, text];
        const options = { cwd: __dirname };

        const stdout = output => this.processStdout(output);
        const stderr = error => this.processStderr(error);
        const exit = code => this.processExit(code);

        const process = new BufferedNodeProcess({command, args, options, stdout, stderr, exit});
    }

   /* ==============================
       PRIVATE
      ============================== */

      processStdout(output) {
          console.log(output);
          this.elm.ports.processReport.send(JSON.parse(output));
      }

      processStderr(error) {
          console.log(error);
      }

      processExit(code) {
          console.log(code);
      }

}
