"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ResearchTable_1 = require("./ResearchTable");
const Layout = () => {
    const [tab, setTab] = React.useState("total");
    let content = null;
    switch (tab) {
        case "research":
            content = React.createElement(ResearchTable_1.default, null);
            break;
        default:
            content = React.createElement("div", null, `404: ${tab}`);
    }
    return (React.createElement(React.Fragment, null,
        React.createElement("ul", { id: "Tabs" },
            React.createElement("li", { onClick: () => setTab("research") }, "Research"),
            React.createElement("li", { onClick: () => setTab("map") }, "Map"),
            React.createElement("li", { onClick: () => setTab("total") }, "Total")),
        React.createElement("div", { id: "TabContent" }, content)));
};
exports.default = Layout;
//# sourceMappingURL=Layout.js.map