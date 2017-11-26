'use babel';

export default class FileDisplayMarkers {

    constructor(textEditor) {
        this.textEditor = textEditor;
        this.displayMarkers = [];
    }

    /* ==============================
        PUBLIC
       ============================== */

    generate(expression, projectIsProcessed, fileIsReprocessing) {
        const range = this.generateMarkerRange(expression.name, expression.lineNumber);
        const decorationOptions = this.generateDecorationOptions(projectIsProcessed, fileIsReprocessing, expression.isExposed, expression.numInternalRefs, expression.numExternalRefs);

        let displayMarker = this.textEditor.markBufferRange(range);
        this.textEditor.decorateMarker(displayMarker, decorationOptions);

        this.add(displayMarker);
    }

    reset() {
        this.displayMarkers.forEach((marker) => marker.destroy())
        this.displayMarkers = [];
    }

    /* ==============================
        PRIVATE
       ============================== */

   generateDecorationOptions(projectIsProcessed, fileIsReprocessing, isExposed, numInternalRefs, numExternalRefs) {
       let mainDiv = document.createElement("div");
       let exposingSpan = document.createElement("span");
       let divider1 = document.createElement("span");
       let internalRefSpan = document.createElement("span");
       let externalRefSpan = document.createElement("span");
       let loadingCog1 = document.createElement("span");

       mainDiv.classList.add("elm-lens-marker");
       if (fileIsReprocessing) {
           mainDiv.classList.add("reprocessing");
       }

       exposingSpan.classList.add("exposing", "syntax--keyword", "syntax--other");
       divider1.classList.add("divider");
       internalRefSpan.classList.add("internal-refs");
       externalRefSpan.classList.add("external-refs");
       loadingCog1.classList.add("fa", "fa-spinner", "fa-pulse", "fa-3x", "fa-fw")
       
       exposingSpan.innerHTML = (isExposed) ? "exposed" : "local";
       divider1.innerHTML = "|";

       let internalRefText = " internal reference";
       if (!fileIsReprocessing) {
           internalRefText = numInternalRefs + internalRefText + this.pluralSuffix(numInternalRefs)
       }
       internalRefSpan.innerHTML = internalRefText;

       let externalRefText = " external reference";
       if (projectIsProcessed && !fileIsReprocessing) {
           externalRefText = numExternalRefs + externalRefText + this.pluralSuffix(numExternalRefs);
       }
       externalRefSpan.innerHTML = externalRefText;

       let divider2 = divider1.cloneNode(true);

       mainDiv.appendChild(exposingSpan);
       mainDiv.appendChild(divider1);

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

}
