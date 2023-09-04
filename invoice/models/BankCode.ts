/* tslint:disable */
/* eslint-disable */
/**
 * NOTE: This file is auto generated by Xendit.
 * Do not edit the class manually.
 * Improvements? Share your ideas at https://github.com/xendit/xendit-node
 */


/**
 * Representing the available bank channels used for invoice-related transactions.
 * @export
 */
export const BankCode = {
    Bca: 'BCA',
    Bni: 'BNI',
    Bri: 'BRI',
    Mandiri: 'MANDIRI',
    Permata: 'PERMATA',
    Bsi: 'BSI',
    Bjb: 'BJB'
} as const;
export type BankCode = typeof BankCode[keyof typeof BankCode];


export function BankCodeFromJSON(json: any): BankCode {
    return BankCodeFromJSONTyped(json, false);
}

export function BankCodeFromJSONTyped(json: any, ignoreDiscriminator: boolean): BankCode {
    return json as BankCode;
}

export function BankCodeToJSON(value?: BankCode | null): any {
    return value as any;
}

