/* tslint:disable */
/* eslint-disable */
/**
 * NOTE: This file is auto generated by Xendit.
 * Do not edit the class manually.
 * Improvements? Share your ideas at https://github.com/xendit/xendit-node
 */

import { exists, mapValues } from '../../runtime';
import type { PaymentRequest } from './PaymentRequest';
import {
    PaymentRequestFromJSON,
    PaymentRequestFromJSONTyped,
    PaymentRequestToJSON,
} from './PaymentRequest';

/**
 * 
 * @export
 * @interface PaymentRequestListResponse
 */
export interface PaymentRequestListResponse {
    /**
     * 
     * @type {Array<PaymentRequest>}
     * @memberof PaymentRequestListResponse
     */
    data: Array<PaymentRequest>;
    /**
     * 
     * @type {boolean}
     * @memberof PaymentRequestListResponse
     */
    hasMore: boolean;
}

/**
 * Check if a given object implements the PaymentRequestListResponse interface.
 */
export function instanceOfPaymentRequestListResponse(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "data" in value;
    isInstance = isInstance && "hasMore" in value;

    return isInstance;
}

export function PaymentRequestListResponseFromJSON(json: any): PaymentRequestListResponse {
    return PaymentRequestListResponseFromJSONTyped(json, false);
}

export function PaymentRequestListResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): PaymentRequestListResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'data': ((json['data'] as Array<any>).map(PaymentRequestFromJSON)),
        'hasMore': json['has_more'],
    };
}

export function PaymentRequestListResponseToJSON(value?: PaymentRequestListResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'data': ((value.data as Array<any>).map(PaymentRequestToJSON)),
        'has_more': value.hasMore,
    };
}

