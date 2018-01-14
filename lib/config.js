'use babel';

import path from 'path';

export default {
    "display-access-control": {
        title: "Display Access Control Status",
        description: "display whether or not functions are exposed or local",
        type: "boolean",
        default: true,
        order: 10
    },
    "display-internal-references": {
        title: "Display Internal References",
        description: "display the number of times a function is referenced in its own module",
        type: "boolean",
        default: true,
        order: 20
    },
    "display-external-references": {
        title: "Display External References",
        description: "display the number of times a function is referenced in other modules",
        type: "boolean",
        default: true,
        order: 30
    },
    "markup-opacity": {
        title: "Markup Opacity",
        description: "adjusts the opacity of the metadata markup; 100 is full opacity, 0 is hidden",
        type: "integer",
        default: 100,
        minimum: 0,
        maximum: 100,
        order: 40
    }
}
