#!/usr/bin/env node

const fs = require('fs');

const elmApp = require('../elm/built/elm.js');
const elm = elmApp.Worker.worker();

process.on("message", message => {
    const name = message.name;

    if (name === "processFile") {
        const filePath = message.filePath;
        elm.ports.process.send([filePath, readFile(filePath)]);
    } else if (name === "exit") {
        process.exit(0);
    }
});

elm.ports.requestForFiles.subscribe(data => {
    let fileTextPairs = [];

    data.forEach(filePath => {
        if (fs.existsSync(filePath)) {
            fileTextPairs.push([filePath, readFile(filePath)]);
        }
    });

    elm.ports.processMultiple.send(fileTextPairs);
});

elm.ports.report.subscribe(data => {
    process.send({ name: "finishedProcessing", data: data });
});

function readFile(filePath) {
    return fs.readFileSync(filePath, "utf8");
}
