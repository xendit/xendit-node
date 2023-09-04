/* tslint:disable */
/* eslint-disable */
/**
 * NOTE: This file is auto generated by Xendit.
 * Do not edit the class manually.
 * Improvements? Share your ideas at https://github.com/xendit/xendit-node
 */

import { exists, mapValues } from '../../runtime';
/**
 * 
 * @export
 * @interface PaymentRequestAuthParameters
 */
export interface PaymentRequestAuthParameters {
    /**
     * 
     * @type {string}
     * @memberof PaymentRequestAuthParameters
     */
    authCode: string;
}

/**
 * Check if a given object implements the PaymentRequestAuthParameters interface.
 */
export function instanceOfPaymentRequestAuthParameters(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "authCode" in value;

    return isInstance;
}

export function PaymentRequestAuthParametersFromJSON(json: any): PaymentRequestAuthParameters {
    return PaymentRequestAuthParametersFromJSONTyped(json, false);
}

export function PaymentRequestAuthParametersFromJSONTyped(json: any, ignoreDiscriminator: boolean): PaymentRequestAuthParameters {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'authCode': json['auth_code'],
    };
}

export function PaymentRequestAuthParametersToJSON(value?: PaymentRequestAuthParameters | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'auth_code': value.authCode,
    };
}

