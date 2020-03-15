import * as React from "react";
import * as ReactDom from "react-dom";
import Layout from "./Layout";

function start() {
    const root = document.createElement("div");
    document.body.appendChild(root);
    ReactDom.render(React.createElement(Layout), root);
}

window.addEventListener("load", start);