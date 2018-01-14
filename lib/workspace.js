'use babel';

import os from 'os';
import fs from 'fs';
import path from 'path';

export default class Workspace {

    constructor() {}

    /* ==============================
        PUBLIC
    ================================= */

    getProjectPaths() {
        return atom.project.getPaths();
    }

    getAllElmFiles() {
        let elmFiles = [];

        this.getProjectPaths().forEach(dirPath => {
            elmFiles = elmFiles.concat(this.findElmFilesInSubdirectories(dirPath));
        });

        return elmFiles;
    }

    getLinesForFile(filePath, lineNumbers) {
        let lines = {};
        const fileText = fs.readFileSync(filePath, "utf8");
        const fileLines = fileText.split(os.EOL);

        lineNumbers.forEach(lineNumber => lines[lineNumber] = fileLines[lineNumber]);
        return lines;
    }

    /* ==============================
        PRIVATE
    ================================= */

    findElmFilesInSubdirectories(dirPath) {
        let elmFiles = this.elmFileList(dirPath);
        const subdirectories = this.subdirectoryList(dirPath);

        subdirectories.forEach(subDir => {
            elmFiles = elmFiles.concat(this.findElmFilesInSubdirectories(subDir));
        });

        return elmFiles;
    }

    elmFileList(dirPath) {
        const finalDir = checkPath => checkPath.split(path.sep).pop();
        const isNotElmFile = source => finalDir(source).substr(-4) === ".elm";

        return fs.readdirSync(dirPath)
            .map(name => path.join(dirPath, name))
            .filter(isNotElmFile);
    }

    subdirectoryList(dirPath) {
        const isDirectory = source => fs.lstatSync(source).isDirectory();

        const finalDir = checkPath => checkPath.split(path.sep).pop();
        const isNotElmStuff = source => finalDir(source) !== "elm-stuff";
        const isNotNodeModules = source => finalDir(source) !== "node_modules";
        const doesNotBeginWithDot = source => finalDir(source).substr(0, 1) !== ".";

        return fs.readdirSync(dirPath)
           .map(name => path.join(dirPath, name))
           .filter(isDirectory)
           .filter(isNotElmStuff)
           .filter(isNotNodeModules)
           .filter(doesNotBeginWithDot);
    }

}
