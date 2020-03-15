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

/***/ "./Scripts/Components/Table.tsx":
/*!**************************************!*\
  !*** ./Scripts/Components/Table.tsx ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
class Table extends React.PureComponent {
    constructor(props) {
        super(props);
        this.mainContentRef = React.createRef();
        this.topScrollRef = React.createRef();
        this.leftScrollRef = React.createRef();
        this.scroll = this.scroll.bind(this);
    }
    render() {
        var _a, _b;
        let content;
        const fixedColumns = (_a = this.props.fixedColumns) !== null && _a !== void 0 ? _a : 0;
        const fixedRows = (_b = this.props.fixedRows) !== null && _b !== void 0 ? _b : 0;
        //const totalWidth = getSize(this.props.columnWidths, data[0].length, 100);
        //const totalHeight = getSize(this.props.rowHeights, data.length, 20);
        if ((fixedColumns !== null && fixedColumns !== void 0 ? fixedColumns : 0) > 0) {
            if ((fixedRows !== null && fixedRows !== void 0 ? fixedRows : 0) > 0) {
                // Fixed columns & rows
                const fixedColumnWidth = getSize(this.props.columns.map(x => { var _a; return (_a = x.width) !== null && _a !== void 0 ? _a : 100; }), fixedColumns);
                const fixedRowHeight = getSize(this.props.rows.map(x => { var _a; return (_a = x.height) !== null && _a !== void 0 ? _a : 20; }), fixedRows);
                content = (React.createElement(React.Fragment, null,
                    React.createElement("div", { className: "q1", style: { top: "0", left: "0", width: `${fixedColumnWidth}px`, height: `${fixedRowHeight}px` } }, this.renderTable(0, 0, fixedColumns, fixedRows)),
                    React.createElement("div", { className: "q2", ref: this.topScrollRef, style: { top: "0", left: fixedColumnWidth, width: `calc(100% - ${fixedColumnWidth}px)`, height: `${fixedRowHeight}px` } }, this.renderTable(fixedColumns, 0, void 0, fixedRows, true)),
                    React.createElement("div", { className: "q3", ref: this.leftScrollRef, style: { top: fixedRowHeight, left: "0", width: `${fixedColumnWidth}px`, height: `calc(100% - ${fixedRowHeight}px)` } }, this.renderTable(0, fixedRows, fixedColumns, void 0)),
                    React.createElement("div", { className: "q4", ref: this.mainContentRef, onScroll: this.scroll, style: { top: fixedRowHeight, left: fixedColumnWidth, width: `calc(100% - ${fixedColumnWidth}px)`, height: `calc(100% - ${fixedRowHeight}px)` } }, this.renderTable(fixedColumns, fixedRows))));
            }
            else {
                // Only fixed columns
                //const fixedColumnWidth = getSize(this.props.columnWidths, fixedColumns, 100);
                content = (React.createElement(React.Fragment, null,
                    React.createElement("div", { className: "q3", ref: this.leftScrollRef }, this.renderTable(0, 0, fixedColumns)),
                    React.createElement("div", { className: "q4", ref: this.mainContentRef, onScroll: this.scroll }, this.renderTable(fixedColumns, 0, void 0))));
            }
        }
        else {
            if ((fixedRows !== null && fixedRows !== void 0 ? fixedRows : 0) > 0) {
                // Only fixed rows
                //const fixedRowHeight = getSize(this.props.rowHeights, fixedRows, 20);
                content = (React.createElement(React.Fragment, null,
                    React.createElement("div", { className: "q2", ref: this.topScrollRef }, this.renderTable(0, 0, void 0, fixedRows, true)),
                    React.createElement("div", { className: "q4", ref: this.mainContentRef, onScroll: this.scroll }, this.renderTable(0, fixedRows))));
            }
            else {
                // No fixed
                content = (React.createElement("div", { className: "q4" }, this.renderTable(0, 0)));
            }
        }
        return React.createElement("div", { className: "Table", style: this.props.style }, content);
    }
    scroll() {
        if (this.mainContentRef.current) {
            if (this.leftScrollRef.current) {
                this.leftScrollRef.current.scrollTop = this.mainContentRef.current.scrollTop;
            }
            if (this.topScrollRef.current) {
                this.topScrollRef.current.scrollLeft = this.mainContentRef.current.scrollLeft;
            }
        }
    }
    renderTable(colStart, rowStart, colCount = Number.MAX_VALUE, rowCount = Number.MAX_VALUE, extraColumn = false) {
        var _a, _b, _c, _d;
        const rows = [];
        const widths = this.props.columns.map(x => { var _a; return (_a = x.width) !== null && _a !== void 0 ? _a : 100; });
        const heights = this.props.rows.map(x => { var _a; return (_a = x.height) !== null && _a !== void 0 ? _a : 20; });
        const rowEnd = Math.min(heights.length, rowStart + rowCount);
        const colEnd = Math.min(widths.length, colStart + colCount);
        let width = 0;
        for (let y = rowStart; y < rowEnd; y++) {
            const cols = [];
            for (let x = colStart; x < colEnd; x++) {
                if (y === rowStart) {
                    width += (_a = widths[x]) !== null && _a !== void 0 ? _a : 100;
                }
                let style = (_d = (_c = (_b = this.props).getStyle) === null || _c === void 0 ? void 0 : _c.call(_b, this.props.columns[x], this.props.rows[y])) !== null && _d !== void 0 ? _d : {};
                cols.push(React.createElement("td", { style: { ...style, width: `${widths[x]}px` } },
                    React.createElement("div", { style: { overflow: "hidden", whiteSpace: "nowrap" } }, this.props.getContent(this.props.columns[x], this.props.rows[y]))));
            }
            if (extraColumn && (y === rowStart)) {
                width += 20;
                cols.push(React.createElement("td", { style: { width: "20px" } }, "\u00A0"));
            }
            rows.push(React.createElement("tr", { style: { height: `${heights[y]}px` } }, cols));
        }
        return React.createElement("table", { cellPadding: 0, cellSpacing: 0, style: { width: `${width}px`, tableLayout: "fixed" } }, rows);
    }
}
exports.default = Table;
function getSize(sizes, count) {
    let result = 0;
    for (let i = 0; i < count; i++) {
        result += sizes[i];
    }
    return result;
}


/***/ }),

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
exports.Provinces = fetch("Provinces.json").then(x => x.json());
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
            const value = (_a = localStorage.getItem("research")) !== null && _a !== void 0 ? _a : "";
            return value ? value.split(",") : [];
        }
        catch (_b) {
            return [];
        }
    }
    static set research(newValue) {
        localStorage.setItem("research", newValue.join(","));
    }
    static get sectors() {
        var _a;
        try {
            const value = (_a = localStorage.getItem("sectors")) !== null && _a !== void 0 ? _a : "";
            return value ? value.split(",") : [];
        }
        catch (_b) {
            return [];
        }
    }
    static set sectors(newValue) {
        localStorage.setItem("sectors", newValue.join(","));
    }
    static get deposits() {
        try {
            const value = localStorage.getItem("deposits");
            return value ? value.split(",") : [];
        }
        catch (_a) {
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
            setText("");
            alert("Success");
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
    root.id = "ReactRoot";
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
const options = [
    React.createElement("option", null, "NoAge"),
    React.createElement("option", null, "AllAge"),
    React.createElement("option", null, "StoneAge"),
    React.createElement("option", null, "BronzeAge"),
    React.createElement("option", null, "IronAge"),
    React.createElement("option", null, "EarlyMiddleAge"),
    React.createElement("option", null, "HighMiddleAge"),
    React.createElement("option", null, "LateMiddleAge"),
    React.createElement("option", null, "ColonialAge"),
    React.createElement("option", null, "IndustrialAge"),
    React.createElement("option", null, "ProgressiveEra"),
    React.createElement("option", null, "ModernEra"),
    React.createElement("option", null, "PostModernEra"),
    React.createElement("option", null, "ContemporaryEra"),
    React.createElement("option", null, "TomorrowEra"),
    React.createElement("option", null, "FutureEra"),
    React.createElement("option", null, "ArcticFuture"),
    React.createElement("option", null, "OceanicFuture"),
    React.createElement("option", null, "VirtualFuture"),
    React.createElement("option", null, "SpaceAgeMars"),
    React.createElement("option", null, "SpaceAgeAsteroidBelt"),
];
const Layout = () => {
    var _a, _b;
    const [tab, tabChanged] = React.useState((_a = localStorage.getItem("tab")) !== null && _a !== void 0 ? _a : "total");
    const [limitEra, setLimitEra] = React.useState((_b = localStorage.getItem("limit")) !== null && _b !== void 0 ? _b : "SpaceAgeAsteroidBelt");
    const setTab = React.useCallback((newTab) => {
        tabChanged(newTab);
        localStorage.setItem("tab", newTab);
    }, []);
    let content = null;
    switch (tab) {
        case "research":
            content = React.createElement(ResearchTable_1.default, { limitEraName: limitEra });
            break;
        case "map":
            content = React.createElement(Map_1.default, { limitEraName: limitEra });
            break;
        case "total":
            content = React.createElement(Total_1.default, { limitEraName: limitEra });
            break;
        case "import":
            content = React.createElement(Import_1.default, null);
            break;
        default:
            content = React.createElement("div", null, `404: ${tab}`);
    }
    const limitChanged = React.useCallback((ev) => {
        setLimitEra(ev.target.value);
        localStorage.setItem("limit", ev.target.value);
    }, []);
    return (React.createElement(React.Fragment, null,
        React.createElement("ul", { id: "Tabs" },
            React.createElement("li", { onClick: () => setTab("research") }, "Research"),
            React.createElement("li", { onClick: () => setTab("map") }, "Map"),
            React.createElement("li", { onClick: () => setTab("total") }, "Total"),
            React.createElement("li", { onClick: () => setTab("import") }, "Import data"),
            React.createElement("li", { style: { padding: "7px 8px 6px" } },
                "Limit: ",
                React.createElement("select", { onChange: limitChanged, value: limitEra }, options))),
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
const Types_1 = __webpack_require__(/*! ./Types */ "./Scripts/Types.ts");
const DataCache_1 = __webpack_require__(/*! ./DataCache */ "./Scripts/DataCache.ts");
const Table_1 = __webpack_require__(/*! ./Components/Table */ "./Scripts/Components/Table.tsx");
const MapView = (props) => {
    const [limitEra, setLimitEra] = React.useState(Types_1.eraIndex(props.limitEraName));
    const [checked, setChecked] = React.useState(new Set());
    const [columnInfo, setColumnInfo] = React.useState([]);
    const [rowInfo, setRowInfo] = React.useState([]);
    const [totals, setTotals] = React.useState(new Map());
    React.useEffect(() => {
        setChecked(new Set(DataCache_1.Data.sectors));
        const newEra = Types_1.eraIndex(props.limitEraName);
        setLimitEra(newEra);
        Promise.all([DataCache_1.Resources, DataCache_1.Provinces]).then(([resources, provinces]) => {
            const columns = [
                { name: "#era", width: 100 },
                { name: "#name", width: 200 },
            ];
            const rows = [
                { name: "#title1" },
                { name: "#title2" },
                { name: "#title3" },
            ];
            const sortedProvinces = provinces.filter(x => (Types_1.eraIndex(x.era) <= newEra));
            sortedProvinces.sort((a, b) => Types_1.eraIndex(a.era) - Types_1.eraIndex(b.era));
            let lastEra = "NoAge";
            let odd = true;
            for (const r of resources.filter(x => (Types_1.eraIndex(x.era) <= newEra) && x.types.indexOf("goodsProduceable") > -1)) {
                columns.push({ name: r.id, tag: { eraText: r.era !== lastEra ? r.era : "", resource: r, color: odd ? "e" : "f" } });
                lastEra = r.era;
                odd = !odd;
            }
            odd = true;
            for (const r of sortedProvinces) {
                rows.push({ name: r.id.toString(), tag: { eraText: r.era !== lastEra ? r.era : "", province: r, color: odd ? "e" : "f" } });
                lastEra = r.era;
                odd = !odd;
            }
            const checked = new Set(DataCache_1.Data.sectors);
            setChecked(checked);
            setColumnInfo(columns);
            setRowInfo(rows);
            setTotals(calculateTotals(checked, rows));
        }, (error) => { var _a; return alert((_a = "Error: " + error.message) !== null && _a !== void 0 ? _a : error.toString()); });
    }, [props.limitEraName]);
    const checkedChanged = React.useCallback((ev) => {
        const clone = new Set(checked);
        if (ev.target.checked) {
            clone.add(ev.target.id);
        }
        else {
            clone.delete(ev.target.id);
        }
        DataCache_1.Data.sectors = [...clone];
        setChecked(clone);
        setTotals(calculateTotals(clone, rowInfo));
    }, [checked, rowInfo]);
    const cellRenderer = React.useCallback((column, row) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        switch (column.name) {
            case "#era":
                switch (row.name) {
                    case "#title1":
                    case "#title3":
                        return "";
                    case "#title2":
                        return "Era";
                    default:
                        return (_b = (_a = row.tag) === null || _a === void 0 ? void 0 : _a.eraText) !== null && _b !== void 0 ? _b : "";
                }
            case "#name":
                switch (row.name) {
                    case "#title1":
                    case "#title3":
                        return "";
                    case "#title2":
                        return "Name";
                    default:
                        return (React.createElement("label", null,
                            React.createElement("input", { checked: checked.has((_c = row.name) !== null && _c !== void 0 ? _c : ""), id: row.name, type: "checkbox", onChange: checkedChanged }), (_e = (_d = row.tag) === null || _d === void 0 ? void 0 : _d.province.name) !== null && _e !== void 0 ? _e : ""));
                }
            default:
                switch (row.name) {
                    case "#title1":
                        return (_g = (_f = column.tag) === null || _f === void 0 ? void 0 : _f.eraText) !== null && _g !== void 0 ? _g : "";
                    case "#title2":
                        return (_j = (_h = column.tag) === null || _h === void 0 ? void 0 : _h.resource.name) !== null && _j !== void 0 ? _j : "";
                    case "#title3":
                        const res = (_l = totals.get((_k = column.name) !== null && _k !== void 0 ? _k : "")) !== null && _l !== void 0 ? _l : { total: 0, left: 0 };
                        return `${Types_1.Beautify(res.left)} / ${Types_1.Beautify(res.total)}`;
                    default:
                        let cost = 0;
                        if ((_m = row.tag) === null || _m === void 0 ? void 0 : _m.province.sectors) {
                            for (const sector of (_o = row.tag) === null || _o === void 0 ? void 0 : _o.province.sectors) {
                                cost += sector.negotiation.filter(x => x.name === column.name).reduce((a, b) => a + b.amount, 0);
                            }
                        }
                        return Types_1.Beautify(cost);
                }
        }
    }, [checked, totals]);
    const cellStyler = React.useCallback((column, row) => {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const result = { padding: "0 6px" };
        if (((_a = column.name) === null || _a === void 0 ? void 0 : _a.startsWith("#")) || ((_b = row.name) === null || _b === void 0 ? void 0 : _b.startsWith("#"))) {
            result.fontWeight = "bold";
        }
        if ((_c = row.tag) === null || _c === void 0 ? void 0 : _c.eraText) {
            result.borderTop = "1px solid black";
        }
        if ((_d = column.tag) === null || _d === void 0 ? void 0 : _d.eraText) {
            result.borderLeft = "1px solid black";
        }
        if ((column.name === "#name") || (column.name === "#fp") || (column.name === "supplies")) {
            result.borderRight = "1px solid black";
        }
        if (row.name === "#title3") {
            result.borderBottom = "1px solid black";
        }
        if ((column.name !== "#era") && (column.name !== "#name") && (row.name !== "#title1")) {
            result.textAlign = "end";
        }
        const color = `#e${(_f = (_e = row.tag) === null || _e === void 0 ? void 0 : _e.color) !== null && _f !== void 0 ? _f : "f"}${(_h = (_g = column.tag) === null || _g === void 0 ? void 0 : _g.color) !== null && _h !== void 0 ? _h : "f"}`;
        result.backgroundColor = color;
        return result;
    }, []);
    return (React.createElement(Table_1.default, { style: { height: "100%" }, columns: columnInfo, rows: rowInfo, fixedColumns: 2, fixedRows: 3, getContent: cellRenderer, getStyle: cellStyler }));
};
function calculateTotals(set, rows) {
    var _a;
    const newTotals = new Map();
    function addAmount(code, amount, done) {
        var _a;
        let existing = (_a = newTotals.get(code)) !== null && _a !== void 0 ? _a : { total: 0, left: 0 };
        newTotals.set(code, { total: existing.total + amount, left: existing.left + (done ? 0 : amount) });
    }
    for (const row of rows) {
        if ((_a = row.tag) === null || _a === void 0 ? void 0 : _a.province) {
            const done = set.has(row.tag.province.id.toString());
            for (const sector of row.tag.province.sectors) {
                for (const cost of sector.negotiation) {
                    addAmount(cost.name, cost.amount, done);
                }
            }
        }
    }
    return newTotals;
}
exports.default = MapView;


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
const DataCache_1 = __webpack_require__(/*! ./DataCache */ "./Scripts/DataCache.ts");
const Table_1 = __webpack_require__(/*! ./Components/Table */ "./Scripts/Components/Table.tsx");
const ResearchTable = (props) => {
    const [limitEra, setLimitEra] = React.useState(Types_1.eraIndex(props.limitEraName));
    const [checked, setChecked] = React.useState(new Set());
    const [columnInfo, setColumnInfo] = React.useState([]);
    const [rowInfo, setRowInfo] = React.useState([]);
    const [totals, setTotals] = React.useState(new Map());
    React.useEffect(() => {
        setChecked(new Set(DataCache_1.Data.research));
        const newEra = Types_1.eraIndex(props.limitEraName);
        setLimitEra(newEra);
        Promise.all([DataCache_1.Resources, DataCache_1.Research]).then(([resources, research]) => {
            const columns = [
                { name: "#era", width: 100 },
                { name: "#name", width: 200 },
                { name: "#fp", width: 75 },
            ];
            const rows = [
                { name: "#title1" },
                { name: "#title2" },
                { name: "#title3" },
            ];
            let lastEra = "NoAge";
            let odd = true;
            for (const r of resources.filter(x => (Types_1.eraIndex(x.era) <= newEra) && (x.types.indexOf("negotiationGame") > -1) && (x.types.indexOf("specialResource") === -1) && (x.era !== "AllAge"))) {
                columns.push({ name: r.id, tag: { eraText: r.era !== lastEra ? r.era : "", resource: r, color: odd ? "e" : "f" } });
                lastEra = r.era;
                odd = !odd;
            }
            odd = true;
            for (const r of research.filter(x => (Types_1.eraIndex(x.era) <= newEra))) {
                rows.push({ name: r.id, tag: { eraText: r.era !== lastEra ? r.era : "", research: r, color: odd ? "e" : "f" } });
                lastEra = r.era;
                odd = !odd;
            }
            const checked = new Set(DataCache_1.Data.research);
            setChecked(checked);
            setColumnInfo(columns);
            setRowInfo(rows);
            setTotals(calculateTotals(checked, rows));
        }, (error) => { var _a; return alert((_a = "Error: " + error.message) !== null && _a !== void 0 ? _a : error.toString()); });
    }, [props.limitEraName]);
    const checkedChanged = React.useCallback((ev) => {
        const clone = new Set(checked);
        if (ev.target.checked) {
            clone.add(ev.target.id);
        }
        else {
            clone.delete(ev.target.id);
        }
        DataCache_1.Data.research = [...clone];
        setChecked(clone);
        setTotals(calculateTotals(clone, rowInfo));
    }, [checked, rowInfo]);
    const cellRenderer = React.useCallback((column, row) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
        switch (column.name) {
            case "#era":
                switch (row.name) {
                    case "#title1":
                    case "#title3":
                        return "";
                    case "#title2":
                        return "Era";
                    default:
                        return (_b = (_a = row.tag) === null || _a === void 0 ? void 0 : _a.eraText) !== null && _b !== void 0 ? _b : "";
                }
            case "#name":
                switch (row.name) {
                    case "#title1":
                    case "#title3":
                        return "";
                    case "#title2":
                        return "Name";
                    default:
                        return (React.createElement("label", null,
                            React.createElement("input", { checked: checked.has((_c = row.name) !== null && _c !== void 0 ? _c : ""), id: row.name, type: "checkbox", onChange: checkedChanged }), (_e = (_d = row.tag) === null || _d === void 0 ? void 0 : _d.research.name) !== null && _e !== void 0 ? _e : ""));
                }
            case "#fp":
                switch (row.name) {
                    case "#title1":
                        return "";
                    case "#title2":
                        return "FP";
                    case "#title3":
                        const fp = (_f = totals.get("#fp")) !== null && _f !== void 0 ? _f : { total: 0, left: 0 };
                        return `${Types_1.Beautify(fp.left)} / ${Types_1.Beautify(fp.total)}`;
                    default:
                        return Types_1.Beautify((_g = row.tag) === null || _g === void 0 ? void 0 : _g.research.fp);
                }
            default:
                switch (row.name) {
                    case "#title1":
                        return (_j = (_h = column.tag) === null || _h === void 0 ? void 0 : _h.eraText) !== null && _j !== void 0 ? _j : "";
                    case "#title2":
                        return (_l = (_k = column.tag) === null || _k === void 0 ? void 0 : _k.resource.name) !== null && _l !== void 0 ? _l : "";
                    case "#title3":
                        const res = (_o = totals.get((_m = column.name) !== null && _m !== void 0 ? _m : "")) !== null && _o !== void 0 ? _o : { total: 0, left: 0 };
                        return `${Types_1.Beautify(res.left)} / ${Types_1.Beautify(res.total)}`;
                    default:
                        return Types_1.Beautify((_p = row.tag) === null || _p === void 0 ? void 0 : _p.research.requirements[(_r = (_q = column.tag) === null || _q === void 0 ? void 0 : _q.resource.id) !== null && _r !== void 0 ? _r : ""]);
                }
        }
    }, [checked, totals]);
    const cellStyler = React.useCallback((column, row) => {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const result = { padding: "0 6px" };
        if (((_a = column.name) === null || _a === void 0 ? void 0 : _a.startsWith("#")) || ((_b = row.name) === null || _b === void 0 ? void 0 : _b.startsWith("#"))) {
            result.fontWeight = "bold";
        }
        if ((_c = row.tag) === null || _c === void 0 ? void 0 : _c.eraText) {
            result.borderTop = "1px solid black";
        }
        if ((_d = column.tag) === null || _d === void 0 ? void 0 : _d.eraText) {
            result.borderLeft = "1px solid black";
        }
        if ((column.name === "#name") || (column.name === "#fp") || (column.name === "supplies")) {
            result.borderRight = "1px solid black";
        }
        if (row.name === "#title3") {
            result.borderBottom = "1px solid black";
        }
        if ((column.name !== "#era") && (column.name !== "#name") && (row.name !== "#title1")) {
            result.textAlign = "end";
        }
        const color = `#e${(_f = (_e = row.tag) === null || _e === void 0 ? void 0 : _e.color) !== null && _f !== void 0 ? _f : "f"}${(_h = (_g = column.tag) === null || _g === void 0 ? void 0 : _g.color) !== null && _h !== void 0 ? _h : "f"}`;
        result.backgroundColor = color;
        return result;
    }, []);
    return (React.createElement(Table_1.default, { style: { height: "100%" }, columns: columnInfo, rows: rowInfo, fixedColumns: 5, fixedRows: 3, getContent: cellRenderer, getStyle: cellStyler }));
};
function calculateTotals(set, rows) {
    var _a;
    const newTotals = new Map();
    function addAmount(code, amount, done) {
        var _a;
        let existing = (_a = newTotals.get(code)) !== null && _a !== void 0 ? _a : { total: 0, left: 0 };
        newTotals.set(code, { total: existing.total + amount, left: existing.left + (done ? 0 : amount) });
    }
    for (const row of rows) {
        if ((_a = row.tag) === null || _a === void 0 ? void 0 : _a.research) {
            const done = set.has(row.tag.research.id);
            addAmount("#fp", row.tag.research.fp, done);
            for (const res in row.tag.research.requirements) {
                addAmount(res, row.tag.research.requirements[res], done);
            }
        }
    }
    return newTotals;
}
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
const Types_1 = __webpack_require__(/*! ./Types */ "./Scripts/Types.ts");
const Total = (props) => {
    const [limitEra, setLimitEra] = React.useState(Types_1.eraIndex(props.limitEraName));
    const [owned, setOwned] = React.useState(DataCache_1.Data.owned);
    const [researchCost, setResearchCost] = React.useState({});
    const [mapCost, setMapCost] = React.useState({});
    const [resources, setResources] = React.useState([]);
    React.useEffect(() => {
        const newEra = Types_1.eraIndex(props.limitEraName);
        setLimitEra(newEra);
        Promise.all([DataCache_1.Research, DataCache_1.Resources, DataCache_1.Provinces]).then(([research, resources, provinces]) => {
            var _a, _b;
            const checkedResearch = new Set(DataCache_1.Data.research);
            const checkedMap = new Set(DataCache_1.Data.sectors);
            const researchCost = {};
            const mapCost = {};
            for (const item of research) {
                if (item.requirements) {
                    if (Types_1.eraIndex(item.era) > newEra) {
                        continue;
                    }
                    for (const key in item.requirements) {
                        if (!checkedResearch.has(item.id)) {
                            researchCost[key] = item.requirements[key] + ((_a = researchCost[key]) !== null && _a !== void 0 ? _a : 0);
                        }
                    }
                }
            }
            for (const item of provinces) {
                if (Types_1.eraIndex(item.era) > newEra) {
                    continue;
                }
                if (item.sectors) {
                    for (const sector of item.sectors) {
                        for (const cost of sector.negotiation) {
                            if (!checkedMap.has(item.id.toString())) {
                                mapCost[cost.name] = cost.amount + ((_b = mapCost[cost.name]) !== null && _b !== void 0 ? _b : 0);
                            }
                        }
                    }
                }
            }
            setResearchCost(researchCost);
            setMapCost(mapCost);
            setResources(resources.filter(x => x.types.includes("goodsProduceable")));
        });
    }, [props.limitEraName]);
    const ownedChanged = React.useCallback((ev) => {
        const newValue = parseInt(ev.target.value);
        if ((typeof newValue === "number") && isFinite(newValue) && (newValue >= 0)) {
            const newOwned = {
                ...owned, [ev.target.id]: newValue
            };
            setOwned(newOwned);
        }
    }, [owned]);
    let lastEra = "NoAge";
    return (React.createElement(React.Fragment, null,
        React.createElement("table", { id: "TotalTable" },
            React.createElement("thead", null,
                React.createElement("tr", null,
                    React.createElement("th", { className: "leftAlign" }, "Era"),
                    React.createElement("th", { className: "leftAlign" }, "Resource"),
                    React.createElement("th", { className: "rightAlign" }, "Owned"),
                    React.createElement("th", { className: "rightAlign" }, "Research"),
                    React.createElement("th", { className: "rightAlign" }, "Map"),
                    React.createElement("th", { className: "rightAlign" }, "Total"))),
            React.createElement("tbody", null, resources.filter(x => Types_1.eraIndex(x.era) <= limitEra).map(x => {
                var _a, _b, _c;
                const currentAmount = (_a = owned[x.id]) !== null && _a !== void 0 ? _a : 0;
                const neededMap = (_b = mapCost[x.id]) !== null && _b !== void 0 ? _b : 0;
                const neededResearch = (_c = researchCost[x.id]) !== null && _c !== void 0 ? _c : 0;
                const usableAmount = currentAmount - (neededMap + neededResearch);
                const eraText = lastEra !== x.era ? x.era : "";
                lastEra = x.era;
                return (React.createElement("tr", null,
                    React.createElement("td", { className: "leftAlign" }, eraText),
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
function eraIndex(era) {
    switch (era) {
        default:
        case "NoAge": return 0;
        case "AllAge": return 0;
        case "StoneAge": return 1;
        case "BronzeAge": return 2;
        case "IronAge": return 3;
        case "EarlyMiddleAge": return 4;
        case "HighMiddleAge": return 5;
        case "LateMiddleAge": return 6;
        case "ColonialAge": return 7;
        case "IndustrialAge": return 8;
        case "ProgressiveEra": return 9;
        case "ModernEra": return 10;
        case "PostModernEra": return 11;
        case "ContemporaryEra": return 12;
        case "TomorrowEra": return 13;
        case "FutureEra": return 14;
        case "ArcticFuture": return 15;
        case "OceanicFuture": return 16;
        case "VirtualFuture": return 17;
        case "SpaceAgeMars": return 18;
        case "SpaceAgeAsteroidBelt": return 19;
    }
}
exports.eraIndex = eraIndex;


/***/ })

/******/ });
//# sourceMappingURL=app.main.js.map