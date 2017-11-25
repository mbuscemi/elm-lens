#!/usr/bin/env node

const elmApp = require('../elm/built/elm.js');
const elm = elmApp.Worker.worker();

const [,, ...args] = process.argv;

const filePath = args[0];
const fileText = args[1];

elm.ports.process.send([filePath, fileText]);

elm.ports.report.subscribe(data => {
    process.stdout.write(JSON.stringify(data));
    process.exit(0);
});
