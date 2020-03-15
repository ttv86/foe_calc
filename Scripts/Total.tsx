import * as React from "react";
import { Data, Resources, Research } from "./DataCache";
import { IResource } from "./Types";

const Total: React.FunctionComponent = () => {
    const [owned, setOwned] = React.useState<Record<string, number>>(Data.owned);
    const [researchCost, setResearchCost] = React.useState<Record<string, number>>({});
    const [mapCost, setMapCost] = React.useState<Record<string, number>>({});
    const [resources, setResources] = React.useState<readonly IResource[]>([]);

    React.useEffect(() => {
        Promise.all([Research, Resources]).then(([research, resources]) => {
            const checked = new Set<string>(Data.research);
            const leftCost: Record<string, number> = {};
            for (const item of research) {
                if (item.requirements) {
                    for (const key in item.requirements) {
                        if (!checked.has(item.id)) {
                            leftCost[key] = item.requirements[key] + (leftCost[key] ?? 0);
                        }
                    }
                }
            }

            setResearchCost(leftCost);
            setResources(resources.filter(x => x.types.includes("goodsProduceable")));
        });
    }, []);

    const ownedChanged = React.useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(ev.target.value);
        if ((typeof newValue === "number") && isFinite(newValue) && (newValue >= 0)) {
            const newOwned = {
                ...owned, [ev.target.id]: newValue
            };
            setOwned(newOwned);
        }
    }, [owned]);

    return (
        <>
            <table id="TotalTable">
                <thead>
                    <tr>
                        <th className="leftAlign">Resource</th>
                        <th className="rightAlign">Owned</th>
                        <th className="rightAlign">Research</th>
                        <th className="rightAlign">Map</th>
                        <th className="rightAlign">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {resources.map(x => {
                        const currentAmount = owned[x.id] ?? 0;
                        const neededMap = mapCost[x.id] ?? 0;
                        const neededResearch = researchCost[x.id] ?? 0;
                        const usableAmount = currentAmount - (neededMap + neededResearch)

                        return (
                            <tr>
                                <td className="leftAlign">{x.name}</td>
                                <td className="rightAlign">
                                    <input type="number" value={currentAmount.toString()} id={x.id} onChange={ownedChanged} className="rightAlign" />
                                </td>
                                <td className="rightAlign">{neededResearch.toString()}</td>
                                <td className="rightAlign">{neededMap.toString()}</td>
                                <td className={`rightAlign ${usableAmount < 0 ? "bad" : "good"}`}>{usableAmount.toString()}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
};

export default Total;