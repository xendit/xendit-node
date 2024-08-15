/* tslint:disable */
/* eslint-disable */
/**
 * NOTE: This file is auto generated by Xendit.
 * Do not edit the class manually.
 * Improvements? Share your ideas at https://github.com/xendit/xendit-node
 */

import { exists, mapValues } from '../../runtime';
import type { PaymentCallbackData } from './PaymentCallbackData';
import {
    PaymentCallbackDataFromJSON,
    PaymentCallbackDataFromJSONTyped,
    PaymentCallbackDataToJSON,
} from './PaymentCallbackData';

/**
 * Callback for successful or failed payments made via the Payments API
 * @export
 * @interface PaymentCallback
 */
export interface PaymentCallback {
    /**
     * Identifies the event that triggered a notification to the merchant
     * @type {string}
     * @memberof PaymentCallback
     */
    event: string;
    /**
     * business_id
     * @type {string}
     * @memberof PaymentCallback
     */
    businessId: string;
    /**
     * 
     * @type {string}
     * @memberof PaymentCallback
     */
    created: string;
    /**
     * 
     * @type {PaymentCallbackData}
     * @memberof PaymentCallback
     */
    data?: PaymentCallbackData;
}

/**
 * Check if a given object implements the PaymentCallback interface.
 */
export function instanceOfPaymentCallback(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "event" in value;
    isInstance = isInstance && "businessId" in value;
    isInstance = isInstance && "created" in value;

    return isInstance;
}

export function PaymentCallbackFromJSON(json: any): PaymentCallback {
    return PaymentCallbackFromJSONTyped(json, false);
}

export function PaymentCallbackFromJSONTyped(json: any, ignoreDiscriminator: boolean): PaymentCallback {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'event': json['event'],
        'businessId': json['business_id'],
        'created': json['created'],
        'data': !exists(json, 'data') ? undefined : PaymentCallbackDataFromJSON(json['data']),
    };
}

export function PaymentCallbackToJSON(value?: PaymentCallback | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'event': value.event,
        'business_id': value.businessId,
        'created': value.created,
        'data': PaymentCallbackDataToJSON(value.data),
    };
}
