'use babel';

export default class MarkupDisplay {

    isAnyElementShowing() {
        const shouldShowAccessStatus = atom.config.get("elm-lens.display-access-control");
        const shouldShowInternalRefs = atom.config.get("elm-lens.display-internal-references");
        const shouldShowExternalRefs = atom.config.get("elm-lens.display-external-references");
        return shouldShowAccessStatus || shouldShowInternalRefs || shouldShowExternalRefs;
    }

    toggle() {
        const targetMode = !this.isAnyElementShowing();
        atom.config.set("elm-lens.display-access-control", targetMode);
        atom.config.set("elm-lens.display-internal-references", targetMode);
        atom.config.set("elm-lens.display-external-references", targetMode);

        atom.commands.dispatch(atom.views.getView(atom.workspace), "elm-lens:refresh-active-editors");
    }

}
