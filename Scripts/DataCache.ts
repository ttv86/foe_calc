import { IResearch, IResource, IProvince } from "./Types";

export const Resources: Promise<readonly IResource[]> = fetch("Resources.json").then(x => x.json());
export const Research: Promise<readonly IResearch[]> = fetch("Research.json").then(x => x.json());
export const Provinces: Promise<readonly IProvince[]> = fetch("Provinces.json").then(x => x.json());

export class Data {
    public static get owned(): Record<string, number> {
        try {
            return JSON.parse(localStorage.getItem("ownedResources") ?? "{}");
        } catch {
            return {};
        }
    }

    public static set owned(newValue: Record<string, number>) {
        localStorage.setItem("ownedResources", JSON.stringify(newValue));
    }


    public static get research(): readonly string[] {
        try {
            return (localStorage.getItem("research") ?? "").split(",");
        } catch {
            return [];
        }
    }

    public static set research(newValue: readonly string[]) {
        localStorage.setItem("research", newValue.join(","));
    }


    public static get sectors(): readonly string[] {
        try {
            return (localStorage.getItem("sectors") ?? "").split(",");
        } catch {
            return [];
        }
    }

    public static set sectors(newValue: readonly string[]) {
        localStorage.setItem("sectors", newValue.join(","));
    }


    public static get deposits(): readonly string[] {
        try {
            return (localStorage.getItem("deposits") ?? "").split(",");
        } catch {
            return [];
        }
    }

    public static set deposits(newValue: readonly string[]) {
        localStorage.setItem("deposits", newValue.join(","));
    }
}