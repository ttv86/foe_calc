import * as React from "react";

export interface IColumn<T = unknown> {
    readonly name?: string;
    readonly width?: number;
    readonly tag?: T;
}

export interface IRow<T = unknown> {
    readonly name?: string;
    readonly height?: number;
    readonly tag?: T;
}

interface ITableProps {
    readonly style?: React.CSSProperties;
    readonly columns: readonly IColumn[];
    readonly rows: readonly IRow[];
    readonly fixedRows?: number;
    readonly fixedColumns?: number;
    getContent(column: IColumn, row: IRow): (JSX.Element | string);
    getStyle?(column: IColumn, row: IRow): React.CSSProperties;
}

export default class Table extends React.PureComponent<ITableProps> {
    private mainContentRef = React.createRef<HTMLDivElement>();
    private topScrollRef = React.createRef<HTMLDivElement>();
    private leftScrollRef = React.createRef<HTMLDivElement>();

    constructor(props: ITableProps) {
        super(props);
        this.scroll = this.scroll.bind(this);
    }

    public render() {
        let content: JSX.Element;
        const fixedColumns = this.props.fixedColumns ?? 0;
        const fixedRows = this.props.fixedRows ?? 0;
        //const totalWidth = getSize(this.props.columnWidths, data[0].length, 100);
        //const totalHeight = getSize(this.props.rowHeights, data.length, 20);
        if ((fixedColumns ?? 0) > 0) {
            if ((fixedRows ?? 0) > 0) {
                // Fixed columns & rows
                const fixedColumnWidth = getSize(this.props.columns.map(x => x.width ?? 100), fixedColumns);
                const fixedRowHeight = getSize(this.props.rows.map(x => x.height ?? 20), fixedRows);
                content = (
                    <>
                        <div
                            className="q1"
                            style={{ top: "0", left: "0", width: `${fixedColumnWidth}px`, height: `${fixedRowHeight}px` }}
                        >
                            {this.renderTable(0, 0, fixedColumns, fixedRows)}
                        </div>
                        <div
                            className="q2"
                            ref={this.topScrollRef}
                            style={{ top: "0", left: fixedColumnWidth, width: `calc(100% - ${fixedColumnWidth}px)`, height: `${fixedRowHeight}px` }}
                        >
                            {this.renderTable(fixedColumns, 0, void 0, fixedRows, true)}
                        </div>
                        <div
                            className="q3"
                            ref={this.leftScrollRef}
                            style={{ top: fixedRowHeight, left: "0", width: `${fixedColumnWidth}px`, height: `calc(100% - ${fixedRowHeight}px)` }}
                        >
                            {this.renderTable(0, fixedRows, fixedColumns, void 0)}
                        </div>
                        <div
                            className="q4"
                            ref={this.mainContentRef}
                            onScroll={this.scroll}
                            style={{ top: fixedRowHeight, left: fixedColumnWidth, width: `calc(100% - ${fixedColumnWidth}px)`, height: `calc(100% - ${fixedRowHeight}px)` }}
                        >
                            {this.renderTable(fixedColumns, fixedRows)}
                        </div>
                    </>
                );
            } else {
                // Only fixed columns
                //const fixedColumnWidth = getSize(this.props.columnWidths, fixedColumns, 100);
                content = (
                    <>
                        <div
                            className="q3"
                            ref={this.leftScrollRef}
                        >
                            {this.renderTable(0, 0, fixedColumns)}
                        </div>
                        <div
                            className="q4"
                            ref={this.mainContentRef}
                            onScroll={this.scroll}
                        >
                            {this.renderTable(fixedColumns, 0, void 0)}
                        </div>
                    </>
                );
            }
        } else {
            if ((fixedRows ?? 0) > 0) {
                // Only fixed rows
                //const fixedRowHeight = getSize(this.props.rowHeights, fixedRows, 20);
                content = (
                    <>
                        <div
                            className="q2"
                            ref={this.topScrollRef}
                        >
                            {this.renderTable(0, 0, void 0, fixedRows, true)}
                        </div>
                        <div
                            className="q4"
                            ref={this.mainContentRef}
                            onScroll={this.scroll}
                        >
                            {this.renderTable(0, fixedRows)}
                        </div>
                    </>
                );
            } else {
                // No fixed
                content = (
                    <div className="q4">
                        {this.renderTable(0, 0)}
                    </div>
                );
            }
        }

        return <div className="Table" style={this.props.style}>{content}</div>;
    }

    private scroll() {
        if (this.mainContentRef.current) {
            if (this.leftScrollRef.current) {
                this.leftScrollRef.current.scrollTop = this.mainContentRef.current.scrollTop;
            }

            if (this.topScrollRef.current) {
                this.topScrollRef.current.scrollLeft = this.mainContentRef.current.scrollLeft;
            }
        }
    }

    private renderTable(colStart: number, rowStart: number, colCount: number = Number.MAX_VALUE, rowCount: number = Number.MAX_VALUE, extraColumn: boolean = false): JSX.Element {
        const rows: JSX.Element[] = [];
        const widths = this.props.columns.map(x => x.width ?? 100);
        const heights = this.props.rows.map(x => x.height ?? 20);
        const rowEnd = Math.min(heights.length, rowStart + rowCount);
        const colEnd = Math.min(widths.length, colStart + colCount);

        let width = 0;
        for (let y = rowStart; y < rowEnd; y++) {
            const cols: JSX.Element[] = [];
            for (let x = colStart; x < colEnd; x++) {
                if (y === rowStart) {
                    width += widths[x] ?? 100;
                }

                let style: React.CSSProperties = this.props.getStyle?.(this.props.columns[x], this.props.rows[y]) ?? {};

                cols.push(<td style={{ ...style, width: `${widths[x]}px` }}>
                    <div style={{ overflow: "hidden", whiteSpace: "nowrap" }}>
                        {this.props.getContent(this.props.columns[x], this.props.rows[y])}
                    </div>
                </td>);
            }

            if (extraColumn && (y === rowStart)) {
                width += 20;
                cols.push(<td style={{ width: "20px" }}>{"\u00A0"}</td>);
            }

            rows.push(<tr style={{ height: `${heights[y]}px` }}>{cols}</tr>);
        }

        return <table cellPadding={0} cellSpacing={0} style={{ width: `${width}px`, tableLayout: "fixed" }}>{rows}</table>;
    }
}

function getSize(sizes: readonly number[], count: number) {
    let result = 0;
    for (let i = 0; i < count; i++) {
        result += sizes[i];
    }

    return result;
}