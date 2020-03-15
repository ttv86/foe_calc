import * as React from "react";
import { Era, ItemType, Beautify, groupEras, IResearch, IResource, IProvince } from "./Types";
import * as DataCache from "./DataCache";

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


const Map: React.FunctionComponent = () => {
    const [resources, setResources] = React.useState<(readonly IResource[]) | null>(null);
    const [list, setList] = React.useState<(readonly IProvince[]) | null>(null);
    const [checked, setChecked] = React.useState<ReadonlySet<string>>(new Set<string>());

    React.useEffect(() => {
        setChecked(new Set<string>(DataCache.Data.sectors));

        Promise.all([DataCache.Resources, DataCache.Provinces]).then(
            ([resources, research]) => {
                setResources(resources);
                setList(research);
            },
            (error) => alert("Error: " + error.message ?? error.toString()));
    }, []);

    const checkedChanged = React.useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
        const clone = new Set(checked);
        if (ev.target.checked) {
            clone.add(ev.target.id);
        } else {
            clone.delete(ev.target.id);
        }

        DataCache.Data.sectors = [...clone];
        setChecked(clone);
    }, [checked]);

    if (!(list && resources)) {
        return <div>Loading...</div>;
    }

    const totalCost: Record<string, number> = {};
    const leftCost: Record<string, number> = {};
    for (const item of list) {
        if (item.sectors) {
            for (const sector of item.sectors) {
                for (const cost of sector.negotiation) {
                    totalCost[cost.name] = cost.amount + (totalCost[cost.name] ?? 0);
                    if (!checked.has(item.id)) {
                        leftCost[cost.name] = cost.amount + (leftCost[cost.name] ?? 0);
                    }
                }
            }
        }
    }

    const tmp = /*React.useMemo(*/() => {
        const filteredResources = resources.filter(x => (x.types.indexOf("goodsProduceable") > -1));
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
                    {resourceEras.map(x => <th colSpan={x.count} style={{ ...headerCell1, width: `${100 * x.count}px` }} className="lineLeft centerAlign">{x.title}</th>)}
                </tr>
                <tr>
                    <th style={headerCell2} />
                    <th style={headerCell2} />
                    {finalResources.map(x => <th title={x.id} style={headerCell2} className={`${x.className} centerAlign`}>{x.name}</th>)}
                </tr>
                <tr>
                    <th style={headerCell3}>Era</th>
                    <th style={headerCell3}>Name</th>
                    {finalResources.map(x => <th style={headerCell3} className={`${x.className} centerAlign`}>{`${Beautify(leftCost[x.id] ?? 0)} / ${Beautify(totalCost[x.id] ?? 0)}`}</th>)}
                </tr>
            </thead>
            <tbody>
                {list.map(x => {
                    let eraBox: JSX.Element | null = null;
                    let rowClassName = "";
                    if (lastEra !== x.era) {
                        const item = researchEras.find(y => y.era === x.era)!;
                        eraBox = <td rowSpan={item.count} className="lineAbove leftAlign">{item.title}</td>;
                        lastEra = x.era;
                        rowClassName += " lineAbove";
                    }
                    return (
                        <tr>
                            {eraBox}
                            <td className={`${rowClassName} leftAlign`}>
                                <input type="checkbox" id={x.id} checked={checked.has(x.id)} onChange={checkedChanged} />
                                <label htmlFor={x.id}>{x.name}</label>
                            </td>
                            {finalResources.map(y => <td className={`centerAlign${rowClassName}${y.className}`}>{Beautify(0)}</td>)}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default Map;