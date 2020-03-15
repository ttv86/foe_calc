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
//# sourceMappingURL=Types.js.map