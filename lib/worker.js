#!/usr/bin/env node

const elmApp = require('../elm/built/elm.js');
const elm = elmApp.Worker.worker();

process.on('message', (m) => {
    const name = m.name;

    if (name == "processFile") {
        const filePath = m.filePath;
        const fileText = m.fileText;
        elm.ports.process.send([filePath, fileText]);
    } else if (name == "exit") {
        process.exit(0);
    }
});

elm.ports.report.subscribe(data => {
    process.stdout.write(JSON.stringify(data));
});
