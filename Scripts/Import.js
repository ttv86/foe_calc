"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
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
//# sourceMappingURL=Import.js.map