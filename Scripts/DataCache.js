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
//# sourceMappingURL=DataCache.js.map