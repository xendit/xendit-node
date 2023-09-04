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
 * @interface CreateRefund400Response
 */
export interface CreateRefund400Response {
    /**
     * 
     * @type {string}
     * @memberof CreateRefund400Response
     */
    errorCode?: CreateRefund400ResponseErrorCodeEnum;
    /**
     * 
     * @type {string}
     * @memberof CreateRefund400Response
     */
    message?: string;
}


/**
 * @export
 */
export const CreateRefund400ResponseErrorCodeEnum = {
    ApiValidationError: 'API_VALIDATION_ERROR',
    IneligibleTransaction: 'INELIGIBLE_TRANSACTION',
    InsufficientBalance: 'INSUFFICIENT_BALANCE',
    MaximumRefundAmountReached: 'MAXIMUM_REFUND_AMOUNT_REACHED',
    PartialRefundNotSupported: 'PARTIAL_REFUND_NOT_SUPPORTED',
    RefundNotSupported: 'REFUND_NOT_SUPPORTED',
    TransactionNotFound: 'TRANSACTION_NOT_FOUND'
} as const;
export type CreateRefund400ResponseErrorCodeEnum = typeof CreateRefund400ResponseErrorCodeEnum[keyof typeof CreateRefund400ResponseErrorCodeEnum];


/**
 * Check if a given object implements the CreateRefund400Response interface.
 */
export function instanceOfCreateRefund400Response(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function CreateRefund400ResponseFromJSON(json: any): CreateRefund400Response {
    return CreateRefund400ResponseFromJSONTyped(json, false);
}

export function CreateRefund400ResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): CreateRefund400Response {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'errorCode': !exists(json, 'error_code') ? undefined : json['error_code'],
        'message': !exists(json, 'message') ? undefined : json['message'],
    };
}

export function CreateRefund400ResponseToJSON(value?: CreateRefund400Response | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'error_code': value.errorCode,
        'message': value.message,
    };
}

