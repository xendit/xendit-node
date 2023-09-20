/* tslint:disable */
/* eslint-disable */
/**
 * NOTE: This file is auto generated by Xendit.
 * Do not edit the class manually.
 * Improvements? Share your ideas at https://github.com/xendit/xendit-node
 */


/**
 * Representing the status of an invoice.
 * @export
 */
export const InvoiceStatus = {
    Pending: 'PENDING',
    Paid: 'PAID',
    Settled: 'SETTLED',
    Expired: 'EXPIRED'
} as const;
export type InvoiceStatus = typeof InvoiceStatus[keyof typeof InvoiceStatus];


export function InvoiceStatusFromJSON(json: any): InvoiceStatus {
    return InvoiceStatusFromJSONTyped(json, false);
}

export function InvoiceStatusFromJSONTyped(json: any, ignoreDiscriminator: boolean): InvoiceStatus {
    return json as InvoiceStatus;
}

export function InvoiceStatusToJSON(value?: InvoiceStatus | null): any {
    return value as any;
}

