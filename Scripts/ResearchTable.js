"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Types_1 = require("./Types");
const checkedItems = new Set();
const width = { width: "200px" };
const headerCell = {
    position: "sticky",
};
const headerCell1 = {
    ...headerCell,
    top: "0px",
};
const headerCell2 = {
    ...headerCell,
    top: "20px",
};
const headerCell3 = {
    ...headerCell,
    top: "40px",
    borderBottom: "1px solid #000"
};
const ResearchTable = () => {
    var _a, _b;
    const [resources, setResources] = React.useState(null);
    const [list, setList] = React.useState(null);
    const [checked, setChecked] = React.useState(new Set());
    React.useEffect(() => {
        var _a;
        const checked = (_a = localStorage.getItem("research")) === null || _a === void 0 ? void 0 : _a.split(",");
        if (checked) {
            setChecked(new Set(checked));
        }
        fetch("/resources.json")
            .then(x => x.json())
            .then(setResources);
        fetch("/research.json")
            .then(x => x.json())
            .then(setList);
    }, []);
    const checkedChanged = React.useCallback((ev) => {
        const clone = new Set(checked);
        if (ev.target.checked) {
            clone.add(ev.target.id);
        }
        else {
            clone.delete(ev.target.id);
        }
        localStorage.setItem("research", [...clone].join(","));
        setChecked(clone);
    }, [checked]);
    if (!(list && resources)) {
        return React.createElement("div", null, "Loading...");
    }
    let totalFP = 0;
    let leftFP = 0;
    const totalCost = {};
    const leftCost = {};
    for (const item of list) {
        totalFP += item.fp;
        if (!checked.has(item.id)) {
            leftFP += item.fp;
        }
        if (item.requirements) {
            for (const key in item.requirements) {
                totalCost[key] = item.requirements[key] + ((_a = totalCost[key]) !== null && _a !== void 0 ? _a : 0);
                if (!checked.has(item.id)) {
                    leftCost[key] = item.requirements[key] + ((_b = leftCost[key]) !== null && _b !== void 0 ? _b : 0);
                }
            }
        }
    }
    const filteredResources = resources.filter(x => (x.types.indexOf("negotiationGame") > -1) && (x.types.indexOf("specialResource") === -1));
    const resourceEras = Types_1.groupEras(filteredResources.map(x => x.era));
    const researchEras = Types_1.groupEras(list.map(x => x.era));
    let lastEra = "";
    return (React.createElement("table", { style: { borderCollapse: "collapse" } },
        React.createElement("thead", null,
            React.createElement("tr", null,
                React.createElement("th", { style: headerCell1 }),
                React.createElement("th", { style: headerCell1 }),
                React.createElement("th", { style: headerCell1 }),
                resourceEras.map(x => React.createElement("th", { colSpan: x.count, style: headerCell1 }, x.title))),
            React.createElement("tr", null,
                React.createElement("th", { style: headerCell2 }),
                React.createElement("th", { style: headerCell2 }),
                React.createElement("th", { style: headerCell2 }, "FP"),
                filteredResources.map(x => React.createElement("th", { title: x.id, style: headerCell2 }, x.name))),
            React.createElement("tr", null,
                React.createElement("th", { style: headerCell3 }, "Era"),
                React.createElement("th", { style: headerCell3 }, "Name"),
                React.createElement("th", { style: headerCell3 }, `${Types_1.Beautify(leftFP)} / ${Types_1.Beautify(totalFP)}`),
                filteredResources.map(x => { var _a, _b; return React.createElement("th", { style: headerCell3, className: "lineLeft" }, `${Types_1.Beautify((_a = leftCost[x.id]) !== null && _a !== void 0 ? _a : 0)} / ${Types_1.Beautify((_b = totalCost[x.id]) !== null && _b !== void 0 ? _b : 0)}`); }))),
        React.createElement("tbody", null, list.map(x => {
            let eraBox = null;
            let rowClassName = "";
            if (lastEra !== x.era) {
                const item = researchEras.find(y => y.era === x.era);
                eraBox = React.createElement("td", { rowSpan: item.count, className: "lineAbove" }, item.title);
                lastEra = x.era;
                rowClassName += " lineAbove";
            }
            return (React.createElement("tr", null,
                eraBox,
                React.createElement("td", { className: rowClassName },
                    React.createElement("input", { type: "checkbox", id: x.id, checked: checked.has(x.id), onChange: checkedChanged }),
                    React.createElement("label", { htmlFor: x.id }, x.name)),
                React.createElement("td", { className: rowClassName }, x.fp),
                filteredResources.map(y => React.createElement("td", { className: rowClassName }, Types_1.Beautify(x.requirements[y.id])))));
        }))));
};
exports.default = ResearchTable;
//# sourceMappingURL=ResearchTable.js.map