/* tslint:disable */
/* eslint-disable */
/**
 * NOTE: This file is auto generated by Xendit.
 * Do not edit the class manually.
 * Improvements? Share your ideas at https://github.com/xendit/xendit-node
 */


/**
 * Category of channel code, as some channels might require more fields during processing
 * @export
 */
export const ChannelCategory = {
    Bank: 'BANK',
    Ewallet: 'EWALLET',
    Otc: 'OTC',
    XenditEnumDefaultFallback: "UNKNOWN_ENUM_VALUE"
} as const;
export type ChannelCategory = typeof ChannelCategory[keyof typeof ChannelCategory];


export function ChannelCategoryFromJSON(json: any): ChannelCategory {
    return ChannelCategoryFromJSONTyped(json, false);
}

export function ChannelCategoryFromJSONTyped(json: any, ignoreDiscriminator: boolean): ChannelCategory {
    if (json !== "" || json !== null) {
        const key = Object.keys(ChannelCategory)[Object.values(ChannelCategory).indexOf(json)]
        return ChannelCategory[key] === undefined ?
            ChannelCategory['XenditEnumDefaultFallback'] : ChannelCategory[key]
    }
    return json as ChannelCategory;
}

export function ChannelCategoryToJSON(value?: ChannelCategory | null): any {
    return value as any;
}

