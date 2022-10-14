export interface ListDogsResponse {
    weight:             Eight;
    height:             Eight;
    id:                 number;
    name:               string;
    bred_for?:          string;
    breed_group?:       BreedGroup;
    life_span:          string;
    temperament?:       string;
    origin?:            string;
    reference_image_id: string;
    image:              Image;
    country_code?:      CountryCode;
    description?:       string;
    history?:           string;
}

export enum BreedGroup {
    Empty = "",
    Herding = "Herding",
    Hound = "Hound",
    Mixed = "Mixed",
    NonSporting = "Non-Sporting",
    Sporting = "Sporting",
    Terrier = "Terrier",
    Toy = "Toy",
    Working = "Working",
}

export enum CountryCode {
    Ag = "AG",
    Au = "AU",
    Us = "US",
}

export interface Eight {
    imperial: string;
    metric:   string;
}

export interface Image {
    id:     string;
    width:  number;
    height: number;
    url:    string;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toListDogsResponse(json: string): ListDogsResponse[] {
        return cast(JSON.parse(json), a(r("ListDogsResponse")));
    }

    public static listDogsResponseToJson(value: ListDogsResponse[]): string {
        return JSON.stringify(uncast(value, a(r("ListDogsResponse"))), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any = ''): never {
    if (key) {
        throw Error(`Invalid value for key "${key}". Expected type ${JSON.stringify(typ)} but got ${JSON.stringify(val)}`);
    }
    throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`, );
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases, val);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue("array", val);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue("Date", val);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue("object", val);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, prop.key);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val);
    }
    if (typ === false) return invalidValue(typ, val);
    while (typeof typ === "object" && typ.ref !== undefined) {
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "ListDogsResponse": o([
        { json: "weight", js: "weight", typ: r("Eight") },
        { json: "height", js: "height", typ: r("Eight") },
        { json: "id", js: "id", typ: 0 },
        { json: "name", js: "name", typ: "" },
        { json: "bred_for", js: "bred_for", typ: u(undefined, "") },
        { json: "breed_group", js: "breed_group", typ: u(undefined, r("BreedGroup")) },
        { json: "life_span", js: "life_span", typ: "" },
        { json: "temperament", js: "temperament", typ: u(undefined, "") },
        { json: "origin", js: "origin", typ: u(undefined, "") },
        { json: "reference_image_id", js: "reference_image_id", typ: "" },
        { json: "image", js: "image", typ: r("Image") },
        { json: "country_code", js: "country_code", typ: u(undefined, r("CountryCode")) },
        { json: "description", js: "description", typ: u(undefined, "") },
        { json: "history", js: "history", typ: u(undefined, "") },
    ], false),
    "Eight": o([
        { json: "imperial", js: "imperial", typ: "" },
        { json: "metric", js: "metric", typ: "" },
    ], false),
    "Image": o([
        { json: "id", js: "id", typ: "" },
        { json: "width", js: "width", typ: 0 },
        { json: "height", js: "height", typ: 0 },
        { json: "url", js: "url", typ: "" },
    ], false),
    "BreedGroup": [
        "",
        "Herding",
        "Hound",
        "Mixed",
        "Non-Sporting",
        "Sporting",
        "Terrier",
        "Toy",
        "Working",
    ],
    "CountryCode": [
        "AG",
        "AU",
        "US",
    ],
};
