/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./Scripts/Index.ts","vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./Scripts/DataCache.ts":
/*!******************************!*\
  !*** ./Scripts/DataCache.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Resources = fetch("Resources.json").then(x => x.json());
exports.Research = fetch("Research.json").then(x => x.json());
class Data {
    static get owned() {
        var _a;
        try {
            return JSON.parse((_a = localStorage.getItem("ownedResources")) !== null && _a !== void 0 ? _a : "{}");
        }
        catch (_b) {
            return {};
        }
    }
    static set owned(newValue) {
        localStorage.setItem("ownedResources", JSON.stringify(newValue));
    }
    static get research() {
        var _a;
        try {
            return ((_a = localStorage.getItem("research")) !== null && _a !== void 0 ? _a : "").split(",");
        }
        catch (_b) {
            return [];
        }
    }
    static set research(newValue) {
        localStorage.setItem("research", newValue.join(","));
    }
    static get deposits() {
        var _a;
        try {
            return ((_a = localStorage.getItem("deposits")) !== null && _a !== void 0 ? _a : "").split(",");
        }
        catch (_b) {
            return [];
        }
    }
    static set deposits(newValue) {
        localStorage.setItem("deposits", newValue.join(","));
    }
}
exports.Data = Data;


/***/ }),

/***/ "./Scripts/Import.tsx":
/*!****************************!*\
  !*** ./Scripts/Import.tsx ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const Import = () => {
    document.createElement;
    const [text, setText] = React.useState("");
    const importFunc = React.useCallback(() => {
        try {
            const parsedArray = JSON.parse(text);
            for (const item of parsedArray) {
                if (item.requestMethod === "getDeposits" && item.requestClass === "CampaignService") {
                    const data = item.responseData;
                    const found = new Set();
                    for (const key in data.states) {
                        if (data.states[key] === 2) {
                            found.add(key.indexOf("raw_") === 0 ? key.substr(4) : key);
                        }
                    }
                    localStorage.setItem("deposits", [...found].join(","));
                }
                else if (item.requestMethod === "getPlayerResources" && item.requestClass === "ResourceService") {
                    const data = item.responseData;
                    localStorage.setItem("ownedResources", JSON.stringify(data.resources));
                }
                else if (item.requestMethod === "getProgress" && item.requestClass === "ResearchService") {
                    const data = item.responseData;
                    localStorage.setItem("research", data.unlockedTechnologies.join(","));
                }
            }
        }
        catch (error) {
            alert(error.message);
        }
    }, [text]);
    return (React.createElement("div", { id: "Import" },
        React.createElement("textarea", { placeholder: "Paste load data here", value: text, onChange: (ev) => setText(ev.target.value) }),
        React.createElement("button", { onClick: importFunc }, "Import")));
};
;
exports.default = Import;


/***/ }),

/***/ "./Scripts/Index.ts":
/*!**************************!*\
  !*** ./Scripts/Index.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const ReactDom = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
const Layout_1 = __webpack_require__(/*! ./Layout */ "./Scripts/Layout.tsx");
function start() {
    const root = document.createElement("div");
    document.body.appendChild(root);
    ReactDom.render(React.createElement(Layout_1.default), root);
}
window.addEventListener("load", start);


/***/ }),

/***/ "./Scripts/Layout.tsx":
/*!****************************!*\
  !*** ./Scripts/Layout.tsx ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const ResearchTable_1 = __webpack_require__(/*! ./ResearchTable */ "./Scripts/ResearchTable.tsx");
const Map_1 = __webpack_require__(/*! ./Map */ "./Scripts/Map.tsx");
const Import_1 = __webpack_require__(/*! ./Import */ "./Scripts/Import.tsx");
const Total_1 = __webpack_require__(/*! ./Total */ "./Scripts/Total.tsx");
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


/***/ }),

/***/ "./Scripts/Map.tsx":
/*!*************************!*\
  !*** ./Scripts/Map.tsx ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const Map = () => {
    //const [tab, setTab] = React.useState<string>("total");
    //let content: JSX.Element | null = null;
    //switch (tab) {
    //    case "research":
    //        content = <ResearchTable />;
    //        break;
    //    default:
    //        content = <div>{`404: ${tab}`}</div>;
    //}
    return (React.createElement(React.Fragment, null,
        React.createElement("img", { src: "Images/Map1.png", alt: "" })));
};
exports.default = Map;


/***/ }),

/***/ "./Scripts/ResearchTable.tsx":
/*!***********************************!*\
  !*** ./Scripts/ResearchTable.tsx ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const Types_1 = __webpack_require__(/*! ./Types */ "./Scripts/Types.ts");
const DataCache = __webpack_require__(/*! ./DataCache */ "./Scripts/DataCache.ts");
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
        setChecked(new Set(DataCache.Data.research));
        Promise.all([DataCache.Resources, DataCache.Research]).then(([resources, research]) => {
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
        DataCache.Data.research = [...clone];
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
    const tmp = /*React.useMemo(*/ () => {
        const filteredResources = resources.filter(x => (x.types.indexOf("negotiationGame") > -1) && (x.types.indexOf("specialResource") === -1));
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
                React.createElement("th", { style: headerCell1 }),
                resourceEras.map(x => React.createElement("th", { colSpan: x.count, style: { ...headerCell1, width: `${100 * x.count}px` }, className: "lineLeft centerAlign" }, x.title))),
            React.createElement("tr", null,
                React.createElement("th", { style: headerCell2 }),
                React.createElement("th", { style: headerCell2 }),
                React.createElement("th", { style: headerCell2, className: "centerAlign" }, "FP"),
                finalResources.map(x => React.createElement("th", { title: x.id, style: headerCell2, className: `${x.className} centerAlign` }, x.name))),
            React.createElement("tr", null,
                React.createElement("th", { style: headerCell3 }, "Era"),
                React.createElement("th", { style: headerCell3 }, "Name"),
                React.createElement("th", { style: headerCell3, className: "centerAlign" }, `${Types_1.Beautify(leftFP)} / ${Types_1.Beautify(totalFP)}`),
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
                React.createElement("td", { className: `centerAlign ${rowClassName}` }, x.fp),
                finalResources.map(y => React.createElement("td", { className: `centerAlign${rowClassName}${y.className}` }, Types_1.Beautify(x.requirements[y.id])))));
        }))));
};
exports.default = ResearchTable;


/***/ }),

/***/ "./Scripts/Total.tsx":
/*!***************************!*\
  !*** ./Scripts/Total.tsx ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const DataCache_1 = __webpack_require__(/*! ./DataCache */ "./Scripts/DataCache.ts");
const Total = () => {
    const [owned, setOwned] = React.useState(DataCache_1.Data.owned);
    const [researchCost, setResearchCost] = React.useState({});
    const [mapCost, setMapCost] = React.useState({});
    const [resources, setResources] = React.useState([]);
    React.useEffect(() => {
        Promise.all([DataCache_1.Research, DataCache_1.Resources]).then(([research, resources]) => {
            var _a;
            const checked = new Set(DataCache_1.Data.research);
            const leftCost = {};
            for (const item of research) {
                if (item.requirements) {
                    for (const key in item.requirements) {
                        if (!checked.has(item.id)) {
                            leftCost[key] = item.requirements[key] + ((_a = leftCost[key]) !== null && _a !== void 0 ? _a : 0);
                        }
                    }
                }
            }
            setResearchCost(leftCost);
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


/***/ }),

/***/ "./Scripts/Types.ts":
/*!**************************!*\
  !*** ./Scripts/Types.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function Beautify(value) {
    if (typeof value !== "number") {
        return "";
    }
    if (value < 1e3) {
        return value.toString();
    }
    else if (value < 1e6) {
        return `${Math.floor(value / 1e3)}K`;
    }
    else if (value < 1e9) {
        return `${Math.floor(value / 1e6)}M`;
    }
    else {
        return `${Math.floor(value / 1e9)}G`;
    }
}
exports.Beautify = Beautify;
function groupEras(eras) {
    const result = [];
    let last = null;
    let lastCount = 0;
    for (const item of eras) {
        if (last !== item) {
            if (last && (lastCount > 0)) {
                result.push({ era: last, title: last, count: lastCount });
            }
            last = item;
            lastCount = 1;
        }
        else {
            lastCount++;
        }
    }
    if (last && (lastCount > 0)) {
        result.push({ era: last, title: last, count: lastCount });
    }
    return result;
}
exports.groupEras = groupEras;


/***/ })

/******/ });
//# sourceMappingURL=app.main.js.map