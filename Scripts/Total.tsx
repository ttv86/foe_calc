import * as React from "react";
import { Data, Resources, Research, Provinces } from "./DataCache";
import { IResource, Era, eraIndex } from "./Types";

const Total: React.FunctionComponent<{ limitEraName: Era }> = (props) => {
    const [limitEra, setLimitEra] = React.useState<number>(eraIndex(props.limitEraName));
    const [owned, setOwned] = React.useState<Record<string, number>>(Data.owned);
    const [researchCost, setResearchCost] = React.useState<Record<string, number>>({});
    const [mapCost, setMapCost] = React.useState<Record<string, number>>({});
    const [resources, setResources] = React.useState<readonly IResource[]>([]);

    React.useEffect(() => {
        const newEra = eraIndex(props.limitEraName);
        setLimitEra(newEra);
        Promise.all([Research, Resources, Provinces]).then(([research, resources, provinces]) => {
            const checkedResearch = new Set<string>(Data.research);
            const checkedMap = new Set<string>(Data.sectors);
            const researchCost: Record<string, number> = {};
            const mapCost: Record<string, number> = {};
            for (const item of research) {
                if (item.requirements) {
                    if (eraIndex(item.era) > newEra) {
                        continue;
                    }

                    for (const key in item.requirements) {
                        if (!checkedResearch.has(item.id)) {
                            researchCost[key] = item.requirements[key] + (researchCost[key] ?? 0);
                        }
                    }
                }
            }

            for (const item of provinces) {
                if (eraIndex(item.era) > newEra) {
                    continue;
                }

                if (item.sectors) {
                    for (const sector of item.sectors) {
                        for (const cost of sector.negotiation) {
                            if (!checkedMap.has(item.id.toString())) {
                                mapCost[cost.name] = cost.amount + (mapCost[cost.name] ?? 0);
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

    const ownedChanged = React.useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(ev.target.value);
        if ((typeof newValue === "number") && isFinite(newValue) && (newValue >= 0)) {
            const newOwned = {
                ...owned, [ev.target.id]: newValue
            };
            setOwned(newOwned);
        }
    }, [owned]);

    let lastEra: Era = "NoAge";
    return (
        <>
            <table id="TotalTable">
                <thead>
                    <tr>
                        <th className="leftAlign">Era</th>
                        <th className="leftAlign">Resource</th>
                        <th className="rightAlign">Owned</th>
                        <th className="rightAlign">Research</th>
                        <th className="rightAlign">Map</th>
                        <th className="rightAlign">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {resources.filter(x => eraIndex(x.era) <= limitEra).map(x => {
                        const currentAmount = owned[x.id] ?? 0;
                        const neededMap = mapCost[x.id] ?? 0;
                        const neededResearch = researchCost[x.id] ?? 0;
                        const usableAmount = currentAmount - (neededMap + neededResearch)
                        const eraText = lastEra !== x.era ? x.era : "";
                        lastEra = x.era;

                        return (
                            <tr>
                                <td className="leftAlign">{eraText}</td>
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