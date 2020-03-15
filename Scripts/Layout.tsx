import * as React from "react";
import ResearchTable from "./ResearchTable";
import Map from "./Map";
import Import from "./Import";
import Total from "./Total";
import { Era } from "./Types";

type TabName = "research" | "map" | "total" | "import";

const options = [
<option>NoAge</option>,
<option>AllAge</option>,
<option>StoneAge</option>,
<option>BronzeAge</option>,
<option>IronAge</option>,
<option>EarlyMiddleAge</option>,
<option>HighMiddleAge</option>,
<option>LateMiddleAge</option>,
<option>ColonialAge</option>,
<option>IndustrialAge</option>,
<option>ProgressiveEra</option>,
<option>ModernEra</option>,
<option>PostModernEra</option>,
<option>ContemporaryEra</option>,
<option>TomorrowEra</option>,
<option>FutureEra</option>,
<option>ArcticFuture</option>,
<option>OceanicFuture</option>,
<option>VirtualFuture</option>,
<option>SpaceAgeMars</option>,
<option>SpaceAgeAsteroidBelt</option>,
];

const Layout: React.FunctionComponent = () => {
    const [tab, tabChanged] = React.useState<TabName>(localStorage.getItem("tab") as TabName ?? "total");
    const [limitEra, setLimitEra] = React.useState<Era>(localStorage.getItem("limit") as Era ?? "SpaceAgeAsteroidBelt");

    const setTab = React.useCallback((newTab: TabName) => {
        tabChanged(newTab);
        localStorage.setItem("tab", newTab);
    }, []);

    let content: JSX.Element | null = null;
    switch (tab) {
        case "research":
            content = <ResearchTable limitEraName={limitEra} />;
            break;
        case "map":
            content = <Map limitEraName={limitEra} />;
            break;
        case "total":
            content = <Total limitEraName={limitEra} />;
            break;
        case "import":
            content = <Import />;
            break;
        default:
            content = <div>{`404: ${tab}`}</div>;
    }

    const limitChanged = React.useCallback((ev: React.ChangeEvent<HTMLSelectElement>) => {
        setLimitEra(ev.target.value as Era);
        localStorage.setItem("limit", ev.target.value);
    }, []);

    return (
        <>
            <ul id="Tabs">
                <li onClick={() => setTab("research")}>Research</li>
                <li onClick={() => setTab("map")}>Map</li>
                <li onClick={() => setTab("total")}>Total</li>
                <li onClick={() => setTab("import")}>Import data</li>
                <li style={{ padding: "7px 8px 6px" }}>Limit: <select onChange={limitChanged} value={limitEra}>{options}</select></li>
            </ul>
            <div id="TabContent">{content}</div>
        </>
    );
};

export default Layout;