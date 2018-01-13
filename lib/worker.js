#!/usr/bin/env node

const fs = require('fs');

const elmApp = require('../elm/built/elm.js');
const elm = elmApp.Worker.worker();

process.on("message", message => {
    const name = message.name;

    if (name === "processFile") {
        const filePath = message.filePath;
        const fileText = fs.readFileSync(filePath, "utf8");
        elm.ports.process.send([filePath, fileText]);
    } else if (name === "exit") {
        process.exit(0);
    }
});

elm.ports.requestForFiles.subscribe(data => {
    
});

elm.ports.report.subscribe(data => {
    process.send({ name: "finishedProcessing", data: data });
});
