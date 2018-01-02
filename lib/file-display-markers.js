'use babel';

import $ from 'jquery';

export default class FileDisplayMarkers {

    constructor(elm, textEditor, referencePanelView) {
        this.elm = elm;
        this.textEditor = textEditor;
        this.referencePanelView = referencePanelView;

        this.displayMarkers = [];
        this.tooltipDisposables = [];
    }

    /* ==============================
        PUBLIC
       ============================== */

    generate(expression, projectIsProcessed, fileIsReprocessing) {
        const range = this.generateMarkerRange(expression.name, expression.lineNumber);
        const decorationOptions = this.generateDecorationOptions(
            projectIsProcessed,
            fileIsReprocessing,
            expression.name,
            expression.isExposed,
            expression.numInternalRefs,
            expression.numExternalRefs,
            expression.specialType
        );

        let displayMarker = this.textEditor.markBufferRange(range);
        this.textEditor.decorateMarker(displayMarker, decorationOptions);

        this.displayMarkers.push(displayMarker);
    }

    reset() {
        this.displayMarkers.forEach((marker) => marker.destroy());
        this.displayMarkers = [];

        this.tooltipDisposables.forEach((disposable) => disposable.dispose());
        this.tooltipDisposables = [];
    }

    /* ==============================
        PRIVATE
       ============================== */

    generateDecorationOptions(
        projectIsProcessed,
        fileIsReprocessing,
        name,
        isExposed,
        numInternalRefs,
        numExternalRefs,
        specialType
    ) {
        let mainDiv = document.createElement("div");
        let exposingSpan = document.createElement("span");
        let divider1 = document.createElement("span");
        let internalRefSpan = document.createElement("span");
        let externalRefSpan = document.createElement("span");
        let loadingCog1 = document.createElement("span");
        let warningIcon1 = document.createElement("span");

        mainDiv.classList.add("elm-lens-marker");
        if (fileIsReprocessing) {
            mainDiv.classList.add("reprocessing");
        }

        exposingSpan.classList.add("exposing", "syntax--keyword", "syntax--other");
        divider1.classList.add("divider");
        internalRefSpan.classList.add("internal-refs");
        externalRefSpan.classList.add("external-refs");
        loadingCog1.classList.add("fa", "fa-spinner", "fa-pulse", "fa-3x", "fa-fw");
        warningIcon1.classList.add("warning-icon", "fa", "fa-exclamation-triangle");

        exposingSpan.innerHTML = (isExposed) ? "exposed" : "local";
        divider1.innerHTML = "|";

        mainDiv.appendChild(exposingSpan);
        mainDiv.appendChild(divider1);

        if (specialType === "ElmProgram") {

            let teaEntrypointSpan = document.createElement("span");
            let teaEntrypointTextSpan = document.createElement("span");

            teaEntrypointTextSpan.innerHTML = "Elm Application Entry Point";

            teaEntrypointSpan.appendChild(teaEntrypointTextSpan);
            mainDiv.appendChild(teaEntrypointSpan);

        } else if (specialType === "ElmTest" ) {

            let elmTestSpan = document.createElement("span");
            let elmTestTextSpan = document.createElement("span");

            let testIcon = document.createElement("span");
            testIcon.classList.add("fa", "fa-flask", "test-icon");

            elmTestTextSpan.innerHTML = "Elm Test";

            elmTestSpan.appendChild(testIcon);
            elmTestSpan.appendChild(elmTestTextSpan);
            mainDiv.appendChild(elmTestSpan);

        } else {

            const isLocalAndNoInternalRefs = !fileIsReprocessing && !isExposed && numInternalRefs == 0;
            const isExposedAndNoExternalRefs = projectIsProcessed && !fileIsReprocessing && isExposed && numExternalRefs == 0;

            if (isLocalAndNoInternalRefs) {
                internalRefSpan.classList.add("warning");
                internalRefSpan.appendChild(warningIcon1);

                let disposable = atom.tooltips.add(internalRefSpan, {
                    title: "Local methods should be used internally or deleted.",
                    placement: "top",
                    trigger: "hover"
                });
                this.tooltipDisposables.push(disposable);
            }

            let internalRefText = " internal reference";
            if (!fileIsReprocessing) {
                internalRefText = numInternalRefs + internalRefText + this.pluralSuffix(numInternalRefs)
            }

            let internalRefTextHolder = document.createElement("span");
            internalRefTextHolder.innerHTML = internalRefText;
            internalRefSpan.appendChild(internalRefTextHolder);

            if (numInternalRefs > 0) {
                $(internalRefSpan).on("click", () => {
                    const isExternal = false;
                    this.elm.ports.setReferencePanel.send([this.textEditor.getPath(), name, isExternal]);
                    this.togglePanel(name, isExternal);
                });
            }

            if (isExposedAndNoExternalRefs) {
                externalRefSpan.classList.add("warning");
                externalRefSpan.appendChild(warningIcon1);

                let disposable = atom.tooltips.add(externalRefSpan, {
                    title: "Exposed methods should be used externally, made local, or deleted.",
                    placement: "top",
                    trigger: "hover"
                });
                this.tooltipDisposables.push(disposable);
            }

            let externalRefText = " external reference";
            if (projectIsProcessed && !fileIsReprocessing) {
                externalRefText = numExternalRefs + externalRefText + this.pluralSuffix(numExternalRefs);
            }

            let externalRefTextHolder = document.createElement("span");
            externalRefTextHolder.innerHTML = externalRefText;
            externalRefSpan.appendChild(externalRefTextHolder);

            if (numExternalRefs > 0) {
                $(externalRefSpan).on("click", () => {
                    const isExternal = true;
                    this.elm.ports.setReferencePanel.send([this.textEditor.getPath(), name, isExternal]);
                    this.togglePanel(name, isExternal);
                });
            }

            let divider2 = divider1.cloneNode(true);

            if (fileIsReprocessing) {
                let loadingCog2 = loadingCog1.cloneNode(true);
                mainDiv.appendChild(loadingCog2);
            }

            mainDiv.appendChild(internalRefSpan);

            if (isExposed) {
                mainDiv.appendChild(divider2);

                if (!projectIsProcessed || fileIsReprocessing) {
                    mainDiv.appendChild(loadingCog1);
                }

                mainDiv.appendChild(externalRefSpan);
            }

        }

        return { type: "block", position: "head", item: mainDiv };
    }

    pluralSuffix(num) {
        return (num === 1) ? "" : "s";
    }

    generateMarkerRange(functionName, lineNumber) {
        return [[lineNumber, 0], [lineNumber, functionName.length]];
    }

    add(displayMarker) {
        this.displayMarkers.push(displayMarker);
    }

    generateUniqueIdFor(name, isExternal) {
        return this.textEditor.getPath() + "|" + name + "|" + isExternal;
    }

    togglePanel(name, isExternal) {
        const uniqueId = this.generateUniqueIdFor(name, isExternal);
        const lastOpenedId = this.referencePanelView.getLastUniqueId();

        if (lastOpenedId === null || lastOpenedId === uniqueId) {
            this.referencePanelView.toggle(uniqueId);
        } else {
            this.referencePanelView.toggleIfClosed(uniqueId);
        }
    }

}
