/* tslint:disable */
/* eslint-disable */
/**
 * NOTE: This file is auto generated by Xendit.
 * Do not edit the class manually.
 * Improvements? Share your ideas at https://github.com/xendit/xendit-node
 */


/**
 * Representing the client type or source of an invoice.
 * @export
 */
export const InvoiceClientType = {
    Dashboard: 'DASHBOARD',
    ApiGateway: 'API_GATEWAY',
    Integration: 'INTEGRATION',
    OnDemand: 'ON_DEMAND',
    Recurring: 'RECURRING',
    Mobile: 'MOBILE'
} as const;
export type InvoiceClientType = typeof InvoiceClientType[keyof typeof InvoiceClientType];


export function InvoiceClientTypeFromJSON(json: any): InvoiceClientType {
    return InvoiceClientTypeFromJSONTyped(json, false);
}

export function InvoiceClientTypeFromJSONTyped(json: any, ignoreDiscriminator: boolean): InvoiceClientType {
    return json as InvoiceClientType;
}

export function InvoiceClientTypeToJSON(value?: InvoiceClientType | null): any {
    return value as any;
}

