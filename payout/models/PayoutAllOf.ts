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
 * @interface PayoutAllOf
 */
export interface PayoutAllOf {
    /**
     * Xendit-generated unique identifier for each payout
     * @type {string}
     * @memberof PayoutAllOf
     */
    id: string;
    /**
     * The time payout was created on Xendit's system, in ISO 8601 format
     * @type {Date}
     * @memberof PayoutAllOf
     */
    created: Date;
    /**
     * The time payout was last updated on Xendit's system, in ISO 8601 format
     * @type {Date}
     * @memberof PayoutAllOf
     */
    updated: Date;
    /**
     * Xendit Business ID
     * @type {string}
     * @memberof PayoutAllOf
     */
    businessId: string;
    /**
     * Status of payout
     * @type {string}
     * @memberof PayoutAllOf
     */
    status: PayoutAllOfStatusEnum;
    /**
     * If the Payout failed, we include a failure code for more details on the failure.
     * @type {string}
     * @memberof PayoutAllOf
     */
    failureCode?: PayoutAllOfFailureCodeEnum;
    /**
     * Our estimated time on to when your payout is reflected to the destination account
     * @type {Date}
     * @memberof PayoutAllOf
     */
    estimatedArrivalTime?: Date;
}


/**
 * @export
 */
export const PayoutAllOfStatusEnum = {
    Succeeded: 'SUCCEEDED',
    Failed: 'FAILED',
    Accepted: 'ACCEPTED',
    Requested: 'REQUESTED',
    Locked: 'LOCKED',
    Cancelled: 'CANCELLED',
    Reversed: 'REVERSED'
} as const;
export type PayoutAllOfStatusEnum = typeof PayoutAllOfStatusEnum[keyof typeof PayoutAllOfStatusEnum];

/**
 * @export
 */
export const PayoutAllOfFailureCodeEnum = {
    InsufficientBalance: 'INSUFFICIENT_BALANCE',
    RejectedByChannel: 'REJECTED_BY_CHANNEL',
    TemporaryTransferError: 'TEMPORARY_TRANSFER_ERROR',
    InvalidDestination: 'INVALID_DESTINATION',
    TransferError: 'TRANSFER_ERROR'
} as const;
export type PayoutAllOfFailureCodeEnum = typeof PayoutAllOfFailureCodeEnum[keyof typeof PayoutAllOfFailureCodeEnum];


/**
 * Check if a given object implements the PayoutAllOf interface.
 */
export function instanceOfPayoutAllOf(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "created" in value;
    isInstance = isInstance && "updated" in value;
    isInstance = isInstance && "businessId" in value;
    isInstance = isInstance && "status" in value;

    return isInstance;
}

export function PayoutAllOfFromJSON(json: any): PayoutAllOf {
    return PayoutAllOfFromJSONTyped(json, false);
}

export function PayoutAllOfFromJSONTyped(json: any, ignoreDiscriminator: boolean): PayoutAllOf {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'created': (new Date(json['created'])),
        'updated': (new Date(json['updated'])),
        'businessId': json['business_id'],
        'status': json['status'],
        'failureCode': !exists(json, 'failure_code') ? undefined : json['failure_code'],
        'estimatedArrivalTime': !exists(json, 'estimated_arrival_time') ? undefined : (new Date(json['estimated_arrival_time'])),
    };
}

export function PayoutAllOfToJSON(value?: PayoutAllOf | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'created': (value.created.toISOString()),
        'updated': (value.updated.toISOString()),
        'business_id': value.businessId,
        'status': value.status,
        'failure_code': value.failureCode,
        'estimated_arrival_time': value.estimatedArrivalTime === undefined ? undefined : (value.estimatedArrivalTime.toISOString()),
    };
}

