"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ReactDom = require("react-dom");
const Layout_1 = require("./Layout");
function start() {
    const root = document.createElement("div");
    document.body.appendChild(root);
    ReactDom.render(React.createElement(Layout_1.default), root);
}
window.addEventListener("load", start);
//# sourceMappingURL=Index.js.map