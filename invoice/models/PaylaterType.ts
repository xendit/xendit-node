/* tslint:disable */
/* eslint-disable */
/**
 * NOTE: This file is auto generated by Xendit.
 * Do not edit the class manually.
 * Improvements? Share your ideas at https://github.com/xendit/xendit-node
 */


/**
 * Representing the available paylater channels used for invoice-related transactions.
 * @export
 */
export const PaylaterType = {
    Kredivo: 'KREDIVO',
    Akulaku: 'AKULAKU',
    Uangme: 'UANGME',
    Billease: 'BILLEASE',
    Cashalo: 'CASHALO',
    Atome: 'ATOME',
    XenditEnumDefaultFallback: "UNKNOWN_ENUM_VALUE"
} as const;
export type PaylaterType = typeof PaylaterType[keyof typeof PaylaterType];


export function PaylaterTypeFromJSON(json: any): PaylaterType {
    return PaylaterTypeFromJSONTyped(json, false);
}

export function PaylaterTypeFromJSONTyped(json: any, ignoreDiscriminator: boolean): PaylaterType {
    if (json !== "" || json !== null) {
        const key = Object.keys(PaylaterType)[Object.values(PaylaterType).indexOf(json)]
        return PaylaterType[key] === undefined ?
            PaylaterType['XenditEnumDefaultFallback'] : PaylaterType[key]
    }
    return json as PaylaterType;
}

export function PaylaterTypeToJSON(value?: PaylaterType | null): any {
    return value as any;
}

