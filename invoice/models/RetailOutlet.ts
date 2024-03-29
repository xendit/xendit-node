/* tslint:disable */
/* eslint-disable */
/**
 * NOTE: This file is auto generated by Xendit.
 * Do not edit the class manually.
 * Improvements? Share your ideas at https://github.com/xendit/xendit-node
 */

import { exists, mapValues } from '../../runtime';
import type { RetailOutletName } from './RetailOutletName';
import {
    RetailOutletNameFromJSON,
    RetailOutletNameFromJSONTyped,
    RetailOutletNameToJSON,
} from './RetailOutletName';

/**
 * An object representing retail outlet details for invoices.
 * @export
 * @interface RetailOutlet
 */
export interface RetailOutlet {
    /**
     * 
     * @type {RetailOutletName}
     * @memberof RetailOutlet
     */
    retailOutletName: RetailOutletName;
    /**
     * The payment code.
     * @type {string}
     * @memberof RetailOutlet
     */
    paymentCode?: string;
    /**
     * The transfer amount.
     * @type {number}
     * @memberof RetailOutlet
     */
    transferAmount?: number;
    /**
     * The name of the merchant.
     * @type {string}
     * @memberof RetailOutlet
     */
    merchantName?: string;
}

/**
 * Check if a given object implements the RetailOutlet interface.
 */
export function instanceOfRetailOutlet(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "retailOutletName" in value;

    return isInstance;
}

export function RetailOutletFromJSON(json: any): RetailOutlet {
    return RetailOutletFromJSONTyped(json, false);
}

export function RetailOutletFromJSONTyped(json: any, ignoreDiscriminator: boolean): RetailOutlet {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'retailOutletName': RetailOutletNameFromJSON(json['retail_outlet_name']),
        'paymentCode': !exists(json, 'payment_code') ? undefined : json['payment_code'],
        'transferAmount': !exists(json, 'transfer_amount') ? undefined : json['transfer_amount'],
        'merchantName': !exists(json, 'merchant_name') ? undefined : json['merchant_name'],
    };
}

export function RetailOutletToJSON(value?: RetailOutlet | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'retail_outlet_name': RetailOutletNameToJSON(value.retailOutletName),
        'payment_code': value.paymentCode,
        'transfer_amount': value.transferAmount,
        'merchant_name': value.merchantName,
    };
}

