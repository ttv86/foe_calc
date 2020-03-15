import * as React from "react";
import { Era, ItemType, Beautify, groupEras } from "./Types";

const checkedItems = new Set<string>();
const width: React.CSSProperties = { width: "200px" };
const headerCell: React.CSSProperties = {
    position: "sticky",
};
const headerCell1: React.CSSProperties = {
    ...headerCell,
    top: "0px",
};
const headerCell2: React.CSSProperties = {
    ...headerCell,
    top: "20px",
};
const headerCell3: React.CSSProperties = {
    ...headerCell,
    top: "40px",
    borderBottom: "1px solid #000"
};


const ResearchTable: React.FunctionComponent = () => {
    const [resources, setResources] = React.useState<(readonly IResource[]) | null>(null);
    const [list, setList] = React.useState<(readonly IResearch[]) | null>(null);
    const [checked, setChecked] = React.useState<ReadonlySet<string>>(new Set<string>());

    React.useEffect(() => {
        const checked = localStorage.getItem("research")?.split(",");
        if (checked) {
            setChecked(new Set<string>(checked));
        }

        fetch("/resources.json")
            .then(x => x.json())
            .then(setResources);

        fetch("/research.json")
            .then(x => x.json())
            .then(setList);
    }, []);

    const checkedChanged = React.useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
        const clone = new Set(checked);
        if (ev.target.checked) {
            clone.add(ev.target.id);
        } else {
            clone.delete(ev.target.id);
        }

        localStorage.setItem("research", [...clone].join(","));
        setChecked(clone);
    }, [checked]);

    if (!(list && resources)) {
        return <div>Loading...</div>;
    }

    let totalFP = 0;
    let leftFP = 0;
    const totalCost: Record<string, number> = {};
    const leftCost: Record<string, number> = {};
    for (const item of list) {
        totalFP += item.fp;
        if (!checked.has(item.id)) {
            leftFP += item.fp;
        }

        if (item.requirements) {
            for (const key in item.requirements) {
                totalCost[key] = item.requirements[key] + (totalCost[key] ?? 0);
                if (!checked.has(item.id)) {
                    leftCost[key] = item.requirements[key] + (leftCost[key] ?? 0);
                }
            }
        }
    }

    const tmp = /*React.useMemo(*/() => {
        const filteredResources = resources.filter(x => (x.types.indexOf("negotiationGame") > -1) && (x.types.indexOf("specialResource") === -1));
        const resourceEras = groupEras(filteredResources.map(x => x.era));
        const indexes = new Set<number>();
        let counter = 0;
        for (const era of resourceEras) {
            indexes.add(counter);
            counter += era.count;
        }

        return {
            resourceEras,
            researchEras: groupEras(list.map(x => x.era)),
            finalResources: filteredResources.map((x, i) => ({ ...x, className: indexes.has(i) ? " lineLeft" : "" }))
        };
    }/*, [])*/;

    const { resourceEras, researchEras, finalResources } = tmp();

    let lastEra = "";
    return (
        <table id="ResearchTable">
            <thead>
                <tr>
                    <th style={headerCell1} />
                    <th style={{ ...headerCell1, width: "200px" }} />
                    <th style={headerCell1} />
                    {resourceEras.map(x => <th colSpan={x.count} style={{ ...headerCell1, width: `${100 * x.count}px` }} className="lineLeft">{x.title}</th>)}
                </tr>
                <tr>
                    <th style={headerCell2} />
                    <th style={headerCell2} />
                    <th style={headerCell2}>FP</th>
                    {finalResources.map(x => <th title={x.id} style={headerCell2} className={x.className}>{x.name}</th>)}
                </tr>
                <tr>
                    <th style={headerCell3}>Era</th>
                    <th style={headerCell3}>Name</th>
                    <th style={headerCell3}>{`${Beautify(leftFP)} / ${Beautify(totalFP)}`}</th>
                    {finalResources.map(x => <th style={headerCell3} className={x.className}>{`${Beautify(leftCost[x.id] ?? 0)} / ${Beautify(totalCost[x.id] ?? 0)}`}</th>)}
                </tr>
            </thead>
            <tbody>
                {list.map(x => {
                    let eraBox: JSX.Element | null = null;
                    let rowClassName = "";
                    if (lastEra !== x.era) {
                        const item = researchEras.find(y => y.era === x.era)!;
                        eraBox = <td rowSpan={item.count} className="lineAbove">{item.title}</td>;
                        lastEra = x.era;
                        rowClassName += " lineAbove";
                    }
                    return (
                        <tr>
                            {eraBox}
                            <td className={rowClassName}>
                                <input type="checkbox" id={x.id} checked={checked.has(x.id)} onChange={checkedChanged} />
                                <label htmlFor={x.id}>{x.name}</label>
                            </td>
                            <td className={rowClassName}>{x.fp}</td>
                            {finalResources.map(y => <td className={`${rowClassName}${y.className}`}>{Beautify(x.requirements[y.id])}</td>)}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default ResearchTable;

interface IResearch {
    readonly id: string;
    readonly era: Era;
    readonly name: string;
    readonly fp: number;
    readonly rewards: readonly string[];
    readonly children: readonly string[];
    readonly parents: readonly string[];
    readonly level: number;
    readonly requirements: Record<string, number>;
}

interface IRawResource {
    readonly id: string;
    readonly name: string;
    readonly era: string;
    readonly abilities: Record<string, never>;
}

interface IResource {
    readonly id: string;
    readonly name: string;
    readonly era: Era;
    readonly types: readonly string[];
}