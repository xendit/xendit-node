/* tslint:disable */
/* eslint-disable */
/**
 * NOTE: This file is auto generated by Xendit.
 * Do not edit the class manually.
 * Improvements? Share your ideas at https://github.com/xendit/xendit-node
 */

import { exists, mapValues } from '../../runtime';
/**
 * An object representing internal details for a fee associated with an invoice.
 * @export
 * @interface InvoiceFee
 */
export interface InvoiceFee {
    /**
     * The type of fee.
     * @type {string}
     * @memberof InvoiceFee
     */
    type: string;
    /**
     * The value or amount of the fee.
     * @type {number}
     * @memberof InvoiceFee
     */
    value: number;
}

/**
 * Check if a given object implements the InvoiceFee interface.
 */
export function instanceOfInvoiceFee(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "type" in value;
    isInstance = isInstance && "value" in value;

    return isInstance;
}

export function InvoiceFeeFromJSON(json: any): InvoiceFee {
    return InvoiceFeeFromJSONTyped(json, false);
}

export function InvoiceFeeFromJSONTyped(json: any, ignoreDiscriminator: boolean): InvoiceFee {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'type': json['type'],
        'value': json['value'],
    };
}

export function InvoiceFeeToJSON(value?: InvoiceFee | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'type': value.type,
        'value': value.value,
    };
}

