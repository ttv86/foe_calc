export type Era = "AllAge" | "NoAge" | "StoneAge" | "BronzeAge" | "IronAge" | "EarlyMiddleAge" | "HighMiddleAge" | "LateMiddleAge" | "ColonialAge" |
    "IndustrialAge" | "ProgressiveEra" | "ModernEra" | "PostModernEra" | "ContemporaryEra" | "TomorrowEra" | "FutureEra" |
    "ArcticFuture" | "OceanicFuture" | "VirtualFuture" | "SpaceAgeMars" | "SpaceAgeAsteroidBelt";

export type ItemType = "money" | "supplies" | "alabaster" | "cypress" | "sandstone" | "wine" | "dye" | "limestone" | "ebony" | "cloth" | "lead" | "gems" | "granite" |
    "marble" | "honey" | "bronze" | "gold" | "ropes" | "salt" | "herbs" | "brick" | "glass" | "gunpowder" | "silk" | "brass" | "talc" | "basalt" | "tar" |
    "coffee" | "porcelain" | "paper" | "wire" | "textiles" | "coke" | "rubber" | "fertilizer" | "whaleoil" | "explosives" | "machineparts" | "petroleum" |
    "tinplate" | "asbestos" | "ferroconcrete" | "convenience_food" | "flavorants" | "packaging" | "luxury_materials" | "steel" | "semiconductors" |
    "renewable_resources" | "filters" | "dna_data" | "plastics" | "electromagnets" | "gas" | "robots" | "bionics" | "papercrete" | "translucent_concrete" |
    "preservatives" | "smart_materials" | "nutrition_research" | "purified_water" | "nanoparticles" | "superconductors" | "algae" | "biogeochemical_data" |
    "ai_data" | "paper_batteries" | "bioplastics" | "nanowire" | "transester_gas" | "promethium" | "artificial_scales" | "corals" | "biolight" | "pearls" |
    "plankton" | "orichalcum" | "data_crystals" | "cryptocash" | "tea_silk" | "golden_rice" | "nanites" | "mars_ore" | "superalloys" | "lubricants" |
    "biotech_crops" | "mars_microbes" | "fusion_reactors";

export function Beautify(value: number | null | undefined): string {
    if (typeof value !== "number") {
        return "";
    }

    if (value < 1e3) {
        return value.toString();
    } else if (value < 1e6) {
        return `${Math.floor(value / 1e3)}K`;
    } else if (value < 1e9) {
        return `${Math.floor(value / 1e6)}M`;
    } else {
        return `${Math.floor(value / 1e9)}G`;
    }
}

export function groupEras(eras: readonly Era[]): readonly IEraGroup[] {
    const result: IEraGroup[] = [];
    let last: Era | null = null;
    let lastCount = 0;
    for (const item of eras) {
        if (last !== item) {
            if (last && (lastCount > 0)) {
                result.push({ era: last, title: last, count: lastCount });
            }

            last = item;
            lastCount = 1;
        } else {
            lastCount++;
        }
    }

    if (last && (lastCount > 0)) {
        result.push({ era: last, title: last, count: lastCount });
    }

    return result;
}

export function eraIndex(era: Era): number {
    switch (era) {
        default:
        case "NoAge": return 0;
        case "AllAge": return 0;
        case "StoneAge": return 1;
        case "BronzeAge": return 2;
        case "IronAge": return 3;
        case "EarlyMiddleAge": return 4;
        case "HighMiddleAge": return 5;
        case "LateMiddleAge": return 6;
        case "ColonialAge": return 7;
        case "IndustrialAge": return 8;
        case "ProgressiveEra": return 9;
        case "ModernEra": return 10;
        case "PostModernEra": return 11;
        case "ContemporaryEra": return 12;
        case "TomorrowEra": return 13;
        case "FutureEra": return 14;
        case "ArcticFuture": return 15;
        case "OceanicFuture": return 16;
        case "VirtualFuture": return 17;
        case "SpaceAgeMars": return 18;
        case "SpaceAgeAsteroidBelt": return 19;
    }
}

interface IEraGroup {
    readonly era: Era;
    readonly title: string;
    readonly count: number;
}

export interface IResearch {
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

export interface IResource {
    readonly id: ItemType;
    readonly name: string;
    readonly era: Era;
    readonly types: readonly string[];
}

export interface IProvince {
    readonly id: number;
    readonly name: string;
    readonly era: Era;
    readonly sectors: readonly ISector[];
}

interface ISector {
    readonly rewardType: ItemType;
    readonly rewardAmount: number;
    readonly negotiation: readonly ICost[];
}

interface ICost {
    readonly name: ItemType;
    readonly amount: number;
}