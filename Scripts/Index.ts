import * as React from "react";
import * as ReactDom from "react-dom";
import ReseachTable from "./ResearchTable";

function start() {
    const root = document.createElement("div");
    document.body.appendChild(root);
    ReactDom.render(React.createElement(ReseachTable), root);
}

window.addEventListener("load", start);