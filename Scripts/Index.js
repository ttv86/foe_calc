"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ReactDom = require("react-dom");
const ResearchTable_1 = require("./ResearchTable");
function start() {
    const root = document.createElement("div");
    document.body.appendChild(root);
    ReactDom.render(React.createElement(ResearchTable_1.default), root);
}
window.addEventListener("load", start);
//# sourceMappingURL=Index.js.map