"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ResearchTable_1 = require("./ResearchTable");
const Map_1 = require("./Map");
const Import_1 = require("./Import");
const Total_1 = require("./Total");
const Layout = () => {
    var _a;
    const [tab, tabChanged] = React.useState((_a = localStorage.getItem("tab")) !== null && _a !== void 0 ? _a : "total");
    const setTab = React.useCallback((newTab) => {
        tabChanged(newTab);
        localStorage.setItem("tab", newTab);
    }, []);
    let content = null;
    switch (tab) {
        case "research":
            content = React.createElement(ResearchTable_1.default, null);
            break;
        case "map":
            content = React.createElement(Map_1.default, null);
            break;
        case "total":
            content = React.createElement(Total_1.default, null);
            break;
        case "import":
            content = React.createElement(Import_1.default, null);
            break;
        default:
            content = React.createElement("div", null, `404: ${tab}`);
    }
    return (React.createElement(React.Fragment, null,
        React.createElement("ul", { id: "Tabs" },
            React.createElement("li", { onClick: () => setTab("research") }, "Research"),
            React.createElement("li", { onClick: () => setTab("map") }, "Map"),
            React.createElement("li", { onClick: () => setTab("total") }, "Total"),
            React.createElement("li", { onClick: () => setTab("import") }, "Import data")),
        React.createElement("div", { id: "TabContent" }, content)));
};
exports.default = Layout;
//# sourceMappingURL=Layout.js.map