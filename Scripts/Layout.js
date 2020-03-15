"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
//import ResearchTable from "./ResearchTable";
//import Map from "./Map";
//import Import from "./Import";
//import Total from "./Total";
const Table_1 = require("./Components/Table");
const Layout = () => {
    const data = React.useMemo(() => {
        return [
            ["A", "B", "C", "D", "E", "F", "G"],
            ["H", "I", "J", "K", "L", "M", "N"],
            ["O", "P", "Q", "R", "S", "T", "U"],
            ["A", "B", "C", "D", "E", "F", "G"],
            ["H", "I", "J", "K", "L", "M", "N"],
            ["O", "P", "Q", "R", "S", "T", "U"],
        ];
    }, []);
    return React.createElement(Table_1.default, { data: data, fixedColumns: 5, fixedRows: 3 });
    //const [tab, tabChanged] = React.useState<TabName>(localStorage.getItem("tab") as TabName ?? "total");
    //const setTab = React.useCallback((newTab: TabName) => {
    //    tabChanged(newTab);
    //    localStorage.setItem("tab", newTab);
    //}, []);
    //let content: JSX.Element | null = null;
    //switch (tab) {
    //    case "research":
    //        content = <ResearchTable />;
    //        break;
    //    case "map":
    //        content = <Map />;
    //        break;
    //    case "total":
    //        content = <Total />;
    //        break;
    //    case "import":
    //        content = <Import />;
    //        break;
    //    default:
    //        content = <div>{`404: ${tab}`}</div>;
    //}
    //return (
    //    <>
    //        <ul id="Tabs">
    //            <li onClick={() => setTab("research")}>Research</li>
    //            <li onClick={() => setTab("map")}>Map</li>
    //            <li onClick={() => setTab("total")}>Total</li>
    //            <li onClick={() => setTab("import")}>Import data</li>
    //        </ul>
    //        <div id="TabContent">{content}</div>
    //    </>
    //);
};
exports.default = Layout;
//# sourceMappingURL=Layout.js.map