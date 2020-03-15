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
const ResearchTable_1 = __webpack_require__(/*! ./ResearchTable */ "./Scripts/ResearchTable.tsx");
function start() {
    const root = document.createElement("div");
    document.body.appendChild(root);
    ReactDom.render(React.createElement(ResearchTable_1.default), root);
}
window.addEventListener("load", start);


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
                resourceEras.map(x => React.createElement("th", { colSpan: x.count, style: { ...headerCell1, width: `${100 * x.count}px` }, className: "lineLeft" }, x.title))),
            React.createElement("tr", null,
                React.createElement("th", { style: headerCell2 }),
                React.createElement("th", { style: headerCell2 }),
                React.createElement("th", { style: headerCell2 }, "FP"),
                finalResources.map(x => React.createElement("th", { title: x.id, style: headerCell2, className: x.className }, x.name))),
            React.createElement("tr", null,
                React.createElement("th", { style: headerCell3 }, "Era"),
                React.createElement("th", { style: headerCell3 }, "Name"),
                React.createElement("th", { style: headerCell3 }, `${Types_1.Beautify(leftFP)} / ${Types_1.Beautify(totalFP)}`),
                finalResources.map(x => { var _a, _b; return React.createElement("th", { style: headerCell3, className: x.className }, `${Types_1.Beautify((_a = leftCost[x.id]) !== null && _a !== void 0 ? _a : 0)} / ${Types_1.Beautify((_b = totalCost[x.id]) !== null && _b !== void 0 ? _b : 0)}`); }))),
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
                finalResources.map(y => React.createElement("td", { className: `${rowClassName}${y.className}` }, Types_1.Beautify(x.requirements[y.id])))));
        }))));
};
exports.default = ResearchTable;


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