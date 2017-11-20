'use babel';

export default class FileDisplayMarkers {

    constructor(textEditor) {
        this.textEditor = textEditor;
        this.displayMarkers = [];
    }

    /* ==============================
        PUBLIC
       ============================== */

    generate(func) {
        const range = this.generateMarkerRange(func.name, func.lineNumber);
        const decorationOptions = this.generateDecorationOptions(func.isExposed, func.numInternalRefs);

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

   generateDecorationOptions(isExposed, numInternalRefs) {
       let mainDiv = document.createElement("div");
       let exposingSpan = document.createElement("span");
       let divider = document.createElement("span");
       let internalRefSpan = document.createElement("span");

       mainDiv.appendChild(exposingSpan);
       mainDiv.appendChild(divider);
       mainDiv.appendChild(internalRefSpan);

       mainDiv.classList.add("elm-lens-marker");
       exposingSpan.classList.add("syntax--keyword", "syntax--other");
       divider.classList.add("divider");
       internalRefSpan.classList.add("internal-refs");

       exposingSpan.innerHTML = (isExposed) ? "exposed" : "local";
       divider.innerHTML = "|";
       internalRefSpan.innerHTML = numInternalRefs + " internal reference" + this.pluralSuffix(numInternalRefs);

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
