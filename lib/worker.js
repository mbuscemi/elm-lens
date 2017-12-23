#!/usr/bin/env node

const elmApp = require('../elm/built/elm.js');
const elm = elmApp.Worker.worker();

process.on('message', message => {
    const name = message.name;

    if (name === "processFile") {
        const filePath = message.filePath;
        const fileText = message.fileText;
        elm.ports.process.send([filePath, fileText]);
    } else if (name === "exit") {
        process.exit(0);
    }
});

elm.ports.report.subscribe(data => {
    process.stdout.write(JSON.stringify(data))
    process.send({ name: "finishedProcessing" });
});
