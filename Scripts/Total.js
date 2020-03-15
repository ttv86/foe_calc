"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const DataCache_1 = require("./DataCache");
const Total = () => {
    const [owned, setOwned] = React.useState(DataCache_1.Data.owned);
    const [researchCost, setResearchCost] = React.useState({});
    const [mapCost, setMapCost] = React.useState({});
    const [resources, setResources] = React.useState([]);
    React.useEffect(() => {
        Promise.all([DataCache_1.Research, DataCache_1.Resources, DataCache_1.Provinces]).then(([research, resources, provinces]) => {
            var _a, _b;
            const checked = new Set(DataCache_1.Data.research);
            const researchCost = {};
            const mapCost = {};
            for (const item of research) {
                if (item.requirements) {
                    for (const key in item.requirements) {
                        if (!checked.has(item.id)) {
                            researchCost[key] = item.requirements[key] + ((_a = researchCost[key]) !== null && _a !== void 0 ? _a : 0);
                        }
                    }
                }
            }
            for (const item of provinces) {
                if (item.sectors) {
                    for (const sector of item.sectors) {
                        for (const cost of sector.negotiation) {
                            //if (!checked.has(item.id)) {
                            mapCost[cost.name] = cost.amount + ((_b = mapCost[cost.name]) !== null && _b !== void 0 ? _b : 0);
                            //}
                        }
                    }
                }
            }
            setResearchCost(researchCost);
            setMapCost(mapCost);
            setResources(resources.filter(x => x.types.includes("goodsProduceable")));
        });
    }, []);
    const ownedChanged = React.useCallback((ev) => {
        const newValue = parseInt(ev.target.value);
        if ((typeof newValue === "number") && isFinite(newValue) && (newValue >= 0)) {
            const newOwned = {
                ...owned, [ev.target.id]: newValue
            };
            setOwned(newOwned);
        }
    }, [owned]);
    return (React.createElement(React.Fragment, null,
        React.createElement("table", { id: "TotalTable" },
            React.createElement("thead", null,
                React.createElement("tr", null,
                    React.createElement("th", { className: "leftAlign" }, "Resource"),
                    React.createElement("th", { className: "rightAlign" }, "Owned"),
                    React.createElement("th", { className: "rightAlign" }, "Research"),
                    React.createElement("th", { className: "rightAlign" }, "Map"),
                    React.createElement("th", { className: "rightAlign" }, "Total"))),
            React.createElement("tbody", null, resources.map(x => {
                var _a, _b, _c;
                const currentAmount = (_a = owned[x.id]) !== null && _a !== void 0 ? _a : 0;
                const neededMap = (_b = mapCost[x.id]) !== null && _b !== void 0 ? _b : 0;
                const neededResearch = (_c = researchCost[x.id]) !== null && _c !== void 0 ? _c : 0;
                const usableAmount = currentAmount - (neededMap + neededResearch);
                return (React.createElement("tr", null,
                    React.createElement("td", { className: "leftAlign" }, x.name),
                    React.createElement("td", { className: "rightAlign" },
                        React.createElement("input", { type: "number", value: currentAmount.toString(), id: x.id, onChange: ownedChanged, className: "rightAlign" })),
                    React.createElement("td", { className: "rightAlign" }, neededResearch.toString()),
                    React.createElement("td", { className: "rightAlign" }, neededMap.toString()),
                    React.createElement("td", { className: `rightAlign ${usableAmount < 0 ? "bad" : "good"}` }, usableAmount.toString())));
            })))));
};
exports.default = Total;
//# sourceMappingURL=Total.js.map