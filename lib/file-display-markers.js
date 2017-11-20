'use babel';

export default class FileDisplayMarkers {

    constructor(textEditor) {
        this.textEditor = textEditor;
        this.displayMarkers = [];
    }

    /* ==============================
        PUBLIC
       ============================== */

    generate(functionName, lineNumber, isExposed) {
        const range = this.generateMarkerRange(functionName, lineNumber);
        const decorationOptions = this.generateDecorationOptions(isExposed);

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

   generateDecorationOptions(isExposed) {
       let element = document.createElement("div");

       element.classList.add("elm-lens-marker", "syntax--keyword", "syntax--other");
       element.innerHTML = (isExposed) ? "exposed" : "internal";

       return { type: "block", position: "head", item: element };
   }

   generateMarkerRange(functionName, lineNumber) {
       return [[lineNumber, 0], [lineNumber, functionName.length]];
   }

   add(displayMarker) {
       this.displayMarkers.push(displayMarker);
   }

}
