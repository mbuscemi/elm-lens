'use babel';

import fs from 'fs';
import path from 'path';

import ElmFile from './elm-file';

export default class Workspace {

    constructor(elm) {
        this.elm = elm;
    }

    /* ==============================
        PUBLIC
       ============================== */

    getAllElmFiles() {
        let elmFiles = [];
        const projectPaths = atom.project.getPaths();

        projectPaths.forEach(dirPath => {
            elmFiles = elmFiles.concat(this.findElmFilesInSubdirectories(dirPath));
        });

        elmFiles = elmFiles.map(filePath => new ElmFile(this.elm, filePath));

        return elmFiles;
    }

    /* ==============================
        PRIVATE
       ============================== */

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
