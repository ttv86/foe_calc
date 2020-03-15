import * as React from "react";
import { IProvince, IResource, Beautify, eraIndex, Era } from "./Types";
import { Data, Resources, Provinces } from "./DataCache";
import Table, { IColumn, IRow } from "./Components/Table";

const MapView: React.FunctionComponent<{ limitEraName: Era }> = (props) => {
    const [limitEra, setLimitEra] = React.useState<number>(eraIndex(props.limitEraName));
    const [checked, setChecked] = React.useState<ReadonlySet<string>>(new Set<string>());
    const [columnInfo, setColumnInfo] = React.useState<readonly IColumn<IColumnTag>[]>([]);
    const [rowInfo, setRowInfo] = React.useState<readonly IRow<IRowTag>[]>([]);
    const [totals, setTotals] = React.useState<ReadonlyMap<string, { total: number, left: number }>>(new Map<string, { total: number, left: number }>());

    React.useEffect(() => {
        setChecked(new Set<string>(Data.sectors));
        const newEra = eraIndex(props.limitEraName);
        setLimitEra(newEra);

        Promise.all([Resources, Provinces]).then(
            ([resources, provinces]) => {
                const columns: IColumn<IColumnTag>[] = [
                    { name: "#era", width: 100 },
                    { name: "#name", width: 200 },
                ];

                const rows: IRow<IRowTag>[] = [
                    { name: "#title1" },
                    { name: "#title2" },
                    { name: "#title3" },
                ];

                const sortedProvinces = provinces.filter(x => (eraIndex(x.era) <= newEra));
                sortedProvinces.sort((a, b) => eraIndex(a.era) - eraIndex(b.era));

                let lastEra = "NoAge";
                let odd = true;
                for (const r of resources.filter(x => (eraIndex(x.era) <= newEra) && x.types.indexOf("goodsProduceable") > -1)) {
                    columns.push({ name: r.id, tag: { eraText: r.era !== lastEra ? r.era : "", resource: r, color: odd ? "e" : "f" } });
                    lastEra = r.era;
                    odd = !odd;
                }

                odd = true;
                for (const r of sortedProvinces) {
                    rows.push({ name: r.id.toString(), tag: { eraText: r.era !== lastEra ? r.era : "", province: r, color: odd ? "e" : "f" } });
                    lastEra = r.era;
                    odd = !odd;
                }

                const checked = new Set<string>(Data.sectors);
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

        Data.sectors = [...clone];
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
                                <input checked={checked.has(row.name ?? "")} id={row.name} type="checkbox" onChange={checkedChanged} />{row.tag?.province.name ?? ""}
                            </label>
                        );
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
                        let cost = 0;
                        if (row.tag?.province.sectors) {
                            for (const sector of row.tag?.province.sectors) {
                                cost += sector.negotiation.filter(x => x.name === column.name).reduce((a, b) => a + b.amount, 0)
                            }
                        }

                        return Beautify(cost);
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
            fixedColumns={2}
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
        if (row.tag?.province) {
            const done = set.has(row.tag.province.id.toString());
            for (const sector of row.tag.province.sectors) {
                for (const cost of sector.negotiation) {
                    addAmount(cost.name, cost.amount, done);
                }
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
    readonly province: IProvince;
}

export default MapView;