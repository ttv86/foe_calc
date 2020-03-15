import * as React from "react";
import { IResearch, IResource, Beautify, eraIndex, Era } from "./Types";
import { Data, Resources, Research } from "./DataCache";
import Table, { IColumn, IRow } from "./Components/Table";

const ResearchTable: React.FunctionComponent<{ limitEraName: Era }> = (props) => {
    const [limitEra, setLimitEra] = React.useState<number>(eraIndex(props.limitEraName));
    const [checked, setChecked] = React.useState<ReadonlySet<string>>(new Set<string>());
    const [columnInfo, setColumnInfo] = React.useState<readonly IColumn<IColumnTag>[]>([]);
    const [rowInfo, setRowInfo] = React.useState<readonly IRow<IRowTag>[]>([]);
    const [totals, setTotals] = React.useState<ReadonlyMap<string, { total: number, left: number }>>(new Map<string, { total: number, left: number }>());

    React.useEffect(() => {
        setChecked(new Set<string>(Data.research));
        const newEra = eraIndex(props.limitEraName);
        setLimitEra(newEra);

        Promise.all([Resources, Research]).then(
            ([resources, research]) => {
                const columns: IColumn<IColumnTag>[] = [
                    { name: "#era", width: 100 },
                    { name: "#name", width: 200 },
                    { name: "#fp", width: 75 },
                ];

                const rows: IRow<IRowTag>[] = [
                    { name: "#title1" },
                    { name: "#title2" },
                    { name: "#title3" },
                ];

                let lastEra = "NoAge";
                let odd = true;
                for (const r of resources.filter(x => (eraIndex(x.era) <= newEra) && (x.types.indexOf("negotiationGame") > -1) && (x.types.indexOf("specialResource") === -1) && (x.era !== "AllAge"))) {
                    columns.push({ name: r.id, tag: { eraText: r.era !== lastEra ? r.era : "", resource: r, color: odd ? "e" : "f" } });
                    lastEra = r.era;
                    odd = !odd;
                }

                odd = true;
                for (const r of research.filter(x => (eraIndex(x.era) <= newEra))) {
                    rows.push({ name: r.id, tag: { eraText: r.era !== lastEra ? r.era : "", research: r, color: odd ? "e" : "f" } });
                    lastEra = r.era;
                    odd = !odd;
                }

                const checked = new Set<string>(Data.research);
                setChecked(checked);
                setColumnInfo(columns);
                setRowInfo(rows);
                setTotals(calculateTotals(checked, rows));
            },
            (error) => alert("Error: " + error.message ?? error.toString()));
    }, [props.limitEraName]);

    const checkedChanged = React.useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
        const clone = new Set(checked);
        if (ev.target.checked) {
            clone.add(ev.target.id);
        } else {
            clone.delete(ev.target.id);
        }

        Data.research = [...clone];
        setChecked(clone);
        setTotals(calculateTotals(clone, rowInfo));
    }, [checked, rowInfo]);

    const cellRenderer = React.useCallback((column: IColumn<IColumnTag>, row: IRow<IRowTag>) => {
        switch (column.name) {
            case "#era":
                switch (row.name) {
                    case "#title1":
                    case "#title3":
                        return "";
                    case "#title2":
                        return "Era";
                    default:
                        return row.tag?.eraText ?? "";
                }

            case "#name":
                switch (row.name) {
                    case "#title1":
                    case "#title3":
                        return "";
                    case "#title2":
                        return "Name";
                    default:
                        return (
                            <label>
                                <input checked={checked.has(row.name ?? "")} id={row.name} type="checkbox" onChange={checkedChanged} />{row.tag?.research.name ?? ""}
                            </label>
                        );
                }

            case "#fp":
                switch (row.name) {
                    case "#title1":
                        return "";
                    case "#title2":
                        return "FP";
                    case "#title3":
                        const fp = totals.get("#fp") ?? { total: 0, left: 0 };
                        return `${Beautify(fp.left)} / ${Beautify(fp.total)}`;
                    default:
                        return Beautify(row.tag?.research.fp);
                }

            default:
                switch (row.name) {
                    case "#title1":
                        return column.tag?.eraText ?? "";
                    case "#title2":
                        return column.tag?.resource.name ?? "";
                    case "#title3":
                        const res = totals.get(column.name ?? "") ?? { total: 0, left: 0 };
                        return `${Beautify(res.left)} / ${Beautify(res.total)}`;
                    default:
                        return Beautify(row.tag?.research.requirements[column.tag?.resource.id ?? ""]);
                }
        }
    }, [checked, totals]);

    const cellStyler = React.useCallback((column: IColumn<IColumnTag>, row: IRow<IRowTag>) => {
        const result: React.CSSProperties = { padding: "0 6px" };
        if (column.name?.startsWith("#") || row.name?.startsWith("#")) {
            result.fontWeight = "bold";
        }

        if (row.tag?.eraText) {
            result.borderTop = "1px solid black";
        }

        if (column.tag?.eraText) {
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

        const color = `#e${row.tag?.color ?? "f"}${column.tag?.color ?? "f"}`;
        result.backgroundColor = color;

        return result;
    }, []);

    return (
        <Table
            style={{ height: "100%" }}
            columns={columnInfo}
            rows={rowInfo}
            fixedColumns={5}
            fixedRows={3}
            getContent={cellRenderer}
            getStyle={cellStyler}
        />
    );
}

function calculateTotals(set: ReadonlySet<string>, rows: readonly IRow<IRowTag>[]): ReadonlyMap<string, { total: number, left: number }> {
    const newTotals = new Map<string, { total: number, left: number }>();
    function addAmount(code: string, amount: number, done: boolean) {
        let existing = newTotals.get(code) ?? { total: 0, left: 0 };
        newTotals.set(code, { total: existing.total + amount, left: existing.left + (done ? 0 : amount) });
    }

    for (const row of rows) {
        if (row.tag?.research) {
            const done = set.has(row.tag.research.id);
            addAmount("#fp", row.tag.research.fp, done);
            for (const res in row.tag.research.requirements) {
                addAmount(res, row.tag.research.requirements[res], done);
            }
        }
    }

    return newTotals;
}

interface IColumnTag {
    readonly eraText: string;
    readonly color: string;
    readonly resource: IResource;
}

interface IRowTag {
    readonly eraText: string;
    readonly color: string;
    readonly research: IResearch;
}

export default ResearchTable;