import * as React from "react";

const Import: React.FunctionComponent = () => {
    document.createElement
    const [text, setText] = React.useState<string>("");
    const importFunc = React.useCallback(() => {
        try {
            const parsedArray: readonly IResponseBase[] = JSON.parse(text);
            for (const item of parsedArray) {
                if (item.requestMethod === "getDeposits" && item.requestClass === "CampaignService") {
                    const data = (item as IResponse<"getDeposits">).responseData;
                    const found = new Set<string>();
                    for (const key in data.states) {
                        if (data.states[key] === 2) {
                            found.add(key.indexOf("raw_") === 0 ? key.substr(4) : key);
                        }
                    }

                    localStorage.setItem("deposits", [...found].join(","));
                } else if (item.requestMethod === "getPlayerResources" && item.requestClass === "ResourceService") {
                    const data = (item as IResponse<"getPlayerResources">).responseData;
                    localStorage.setItem("ownedResources", JSON.stringify(data.resources));
                } else if (item.requestMethod === "getProgress" && item.requestClass === "ResearchService") {
                    const data = (item as IResponse<"getProgress">).responseData;
                    localStorage.setItem("research", data.unlockedTechnologies.join(","));
                }
            }

        } catch (error) {
            alert(error.message);
        }
    }, [text]);

    return (
        <div id="Import">
            <textarea placeholder="Paste load data here" value={text} onChange={(ev) => setText(ev.target.value)} />
            <button onClick={importFunc}>Import</button>
        </div>
    );
};

interface IRequestType {
    readonly getDeposits: IGetDepositsResponse;
    readonly getProgress: IGetProgressResponse;
    readonly getPlayerResources: IGetPlayerResourcesResponse;
};

interface IGetDepositsResponse {
    readonly states: Record<string, number>;
}

interface IGetPlayerResourcesResponse {
    readonly resources: Record<string, number>
}

interface IGetProgressResponse {
    readonly unlockedTechnologies: readonly string[];
    readonly inProgressTechnologies: readonly IInProgressTechnology[];
}

interface IInProgressTechnology {
    readonly tech_id: string;
    readonly currentSP: number;
    readonly researched: boolean;
    readonly is_paid: boolean;
    readonly last_changed_at: number;
    readonly ignore_money: boolean;
    readonly ignore_supplies: boolean;
}

interface IResponseBase {
    readonly responseData: unknown;
    readonly requestClass: string;
    readonly requestMethod: keyof IRequestType;
    readonly requestId: number;
}

interface IResponse<T extends keyof IRequestType> extends IResponseBase {
    readonly responseData: IRequestType[T];
    readonly requestClass: string;
    readonly requestMethod: T;
    readonly requestId: number;
}

export default Import;