"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Types_1 = require("./Types");
const DataCache = require("./DataCache");
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
const Map = () => {
    var _a, _b;
    const [resources, setResources] = React.useState(null);
    const [list, setList] = React.useState(null);
    const [checked, setChecked] = React.useState(new Set());
    React.useEffect(() => {
        setChecked(new Set(DataCache.Data.sectors));
        Promise.all([DataCache.Resources, DataCache.Provinces]).then(([resources, research]) => {
            setResources(resources);
            setList(research);
        }, (error) => { var _a; return alert((_a = "Error: " + error.message) !== null && _a !== void 0 ? _a : error.toString()); });
    }, []);
    const checkedChanged = React.useCallback((ev) => {
        const clone = new Set(checked);
        if (ev.target.checked) {
            clone.add(ev.target.id);
        }
        else {
            clone.delete(ev.target.id);
        }
        DataCache.Data.sectors = [...clone];
        setChecked(clone);
    }, [checked]);
    if (!(list && resources)) {
        return React.createElement("div", null, "Loading...");
    }
    const totalCost = {};
    const leftCost = {};
    for (const item of list) {
        if (item.sectors) {
            for (const sector of item.sectors) {
                for (const cost of sector.negotiation) {
                    totalCost[cost.name] = cost.amount + ((_a = totalCost[cost.name]) !== null && _a !== void 0 ? _a : 0);
                    if (!checked.has(item.id)) {
                        leftCost[cost.name] = cost.amount + ((_b = leftCost[cost.name]) !== null && _b !== void 0 ? _b : 0);
                    }
                }
            }
        }
    }
    const tmp = /*React.useMemo(*/ () => {
        const filteredResources = resources.filter(x => (x.types.indexOf("goodsProduceable") > -1));
        const resourceEras = Types_1.groupEras(filteredResources.map(x => x.era));
        const indexes = new Set();
        let counter = 0;
        for (const era of resourceEras) {
            indexes.add(counter);
            counter += era.count;
        }
        return {
            resourceEras,
            researchEras: Types_1.groupEras(list.map(x => x.era)),
            finalResources: filteredResources.map((x, i) => ({ ...x, className: indexes.has(i) ? " lineLeft" : "" }))
        };
    } /*, [])*/;
    const { resourceEras, researchEras, finalResources } = tmp();
    let lastEra = "";
    return (React.createElement("table", { id: "ResearchTable" },
        React.createElement("thead", null,
            React.createElement("tr", null,
                React.createElement("th", { style: headerCell1 }),
                React.createElement("th", { style: { ...headerCell1, width: "200px" } }),
                resourceEras.map(x => React.createElement("th", { colSpan: x.count, style: { ...headerCell1, width: `${100 * x.count}px` }, className: "lineLeft centerAlign" }, x.title))),
            React.createElement("tr", null,
                React.createElement("th", { style: headerCell2 }),
                React.createElement("th", { style: headerCell2 }),
                finalResources.map(x => React.createElement("th", { title: x.id, style: headerCell2, className: `${x.className} centerAlign` }, x.name))),
            React.createElement("tr", null,
                React.createElement("th", { style: headerCell3 }, "Era"),
                React.createElement("th", { style: headerCell3 }, "Name"),
                finalResources.map(x => { var _a, _b; return React.createElement("th", { style: headerCell3, className: `${x.className} centerAlign` }, `${Types_1.Beautify((_a = leftCost[x.id]) !== null && _a !== void 0 ? _a : 0)} / ${Types_1.Beautify((_b = totalCost[x.id]) !== null && _b !== void 0 ? _b : 0)}`); }))),
        React.createElement("tbody", null, list.map(x => {
            let eraBox = null;
            let rowClassName = "";
            if (lastEra !== x.era) {
                const item = researchEras.find(y => y.era === x.era);
                eraBox = React.createElement("td", { rowSpan: item.count, className: "lineAbove leftAlign" }, item.title);
                lastEra = x.era;
                rowClassName += " lineAbove";
            }
            return (React.createElement("tr", null,
                eraBox,
                React.createElement("td", { className: `${rowClassName} leftAlign` },
                    React.createElement("input", { type: "checkbox", id: x.id, checked: checked.has(x.id), onChange: checkedChanged }),
                    React.createElement("label", { htmlFor: x.id }, x.name)),
                finalResources.map(y => React.createElement("td", { className: `centerAlign${rowClassName}${y.className}` }, Types_1.Beautify(0)))));
        }))));
};
exports.default = Map;
//# sourceMappingURL=Map.js.map