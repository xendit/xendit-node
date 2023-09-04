/* tslint:disable */
/* eslint-disable */
/**
 * NOTE: This file is auto generated by Xendit.
 * Do not edit the class manually.
 * Improvements? Share your ideas at https://github.com/xendit/xendit-node
 */

import { exists, mapValues } from '../../runtime';
import type { DigitalPayoutChannelProperties } from './DigitalPayoutChannelProperties';
import {
    DigitalPayoutChannelPropertiesFromJSON,
    DigitalPayoutChannelPropertiesFromJSONTyped,
    DigitalPayoutChannelPropertiesToJSON,
} from './DigitalPayoutChannelProperties';
import type { Payout } from './Payout';
import {
    PayoutFromJSON,
    PayoutFromJSONTyped,
    PayoutToJSON,
} from './Payout';
import type { ReceiptNotification } from './ReceiptNotification';
import {
    ReceiptNotificationFromJSON,
    ReceiptNotificationFromJSONTyped,
    ReceiptNotificationToJSON,
} from './ReceiptNotification';

/**
 * 
 * @export
 * @interface GetPayouts200ResponseDataInner
 */
export interface GetPayouts200ResponseDataInner {
    /**
     * A client defined payout identifier
     * @type {string}
     * @memberof GetPayouts200ResponseDataInner
     */
    referenceId: string;
    /**
     * Channel code of selected destination bank or e-wallet
     * @type {string}
     * @memberof GetPayouts200ResponseDataInner
     */
    channelCode: string;
    /**
     * 
     * @type {DigitalPayoutChannelProperties}
     * @memberof GetPayouts200ResponseDataInner
     */
    channelProperties: DigitalPayoutChannelProperties;
    /**
     * Amount to be sent to the destination account and should be a multiple of the minimum increment for the selected channel
     * @type {number}
     * @memberof GetPayouts200ResponseDataInner
     */
    amount: number;
    /**
     * Description to send with the payout, the recipient may see this e.g., in their bank statement (if supported) or in email receipts we send on your behalf
     * @type {string}
     * @memberof GetPayouts200ResponseDataInner
     */
    description?: string;
    /**
     * Currency of the destination channel using ISO-4217 currency code
     * @type {string}
     * @memberof GetPayouts200ResponseDataInner
     */
    currency: string;
    /**
     * 
     * @type {ReceiptNotification}
     * @memberof GetPayouts200ResponseDataInner
     */
    receiptNotification?: ReceiptNotification;
    /**
     * Object of additional information you may use
     * @type {object}
     * @memberof GetPayouts200ResponseDataInner
     */
    metadata?: object;
    /**
     * Xendit-generated unique identifier for each payout
     * @type {string}
     * @memberof GetPayouts200ResponseDataInner
     */
    id: string;
    /**
     * The time payout was created on Xendit's system, in ISO 8601 format
     * @type {Date}
     * @memberof GetPayouts200ResponseDataInner
     */
    created: Date;
    /**
     * The time payout was last updated on Xendit's system, in ISO 8601 format
     * @type {Date}
     * @memberof GetPayouts200ResponseDataInner
     */
    updated: Date;
    /**
     * Xendit Business ID
     * @type {string}
     * @memberof GetPayouts200ResponseDataInner
     */
    businessId: string;
    /**
     * Status of payout
     * @type {string}
     * @memberof GetPayouts200ResponseDataInner
     */
    status: GetPayouts200ResponseDataInnerStatusEnum;
    /**
     * If the Payout failed, we include a failure code for more details on the failure.
     * @type {string}
     * @memberof GetPayouts200ResponseDataInner
     */
    failureCode?: GetPayouts200ResponseDataInnerFailureCodeEnum;
    /**
     * Our estimated time on to when your payout is reflected to the destination account
     * @type {Date}
     * @memberof GetPayouts200ResponseDataInner
     */
    estimatedArrivalTime?: Date;
}


/**
 * @export
 */
export const GetPayouts200ResponseDataInnerStatusEnum = {
    Succeeded: 'SUCCEEDED',
    Failed: 'FAILED',
    Accepted: 'ACCEPTED',
    Requested: 'REQUESTED',
    Locked: 'LOCKED',
    Cancelled: 'CANCELLED',
    Reversed: 'REVERSED'
} as const;
export type GetPayouts200ResponseDataInnerStatusEnum = typeof GetPayouts200ResponseDataInnerStatusEnum[keyof typeof GetPayouts200ResponseDataInnerStatusEnum];

/**
 * @export
 */
export const GetPayouts200ResponseDataInnerFailureCodeEnum = {
    InsufficientBalance: 'INSUFFICIENT_BALANCE',
    RejectedByChannel: 'REJECTED_BY_CHANNEL',
    TemporaryTransferError: 'TEMPORARY_TRANSFER_ERROR',
    InvalidDestination: 'INVALID_DESTINATION',
    TransferError: 'TRANSFER_ERROR'
} as const;
export type GetPayouts200ResponseDataInnerFailureCodeEnum = typeof GetPayouts200ResponseDataInnerFailureCodeEnum[keyof typeof GetPayouts200ResponseDataInnerFailureCodeEnum];


/**
 * Check if a given object implements the GetPayouts200ResponseDataInner interface.
 */
export function instanceOfGetPayouts200ResponseDataInner(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "referenceId" in value;
    isInstance = isInstance && "channelCode" in value;
    isInstance = isInstance && "channelProperties" in value;
    isInstance = isInstance && "amount" in value;
    isInstance = isInstance && "currency" in value;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "created" in value;
    isInstance = isInstance && "updated" in value;
    isInstance = isInstance && "businessId" in value;
    isInstance = isInstance && "status" in value;

    return isInstance;
}

export function GetPayouts200ResponseDataInnerFromJSON(json: any): GetPayouts200ResponseDataInner {
    return GetPayouts200ResponseDataInnerFromJSONTyped(json, false);
}

export function GetPayouts200ResponseDataInnerFromJSONTyped(json: any, ignoreDiscriminator: boolean): GetPayouts200ResponseDataInner {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'referenceId': json['reference_id'],
        'channelCode': json['channel_code'],
        'channelProperties': DigitalPayoutChannelPropertiesFromJSON(json['channel_properties']),
        'amount': json['amount'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'currency': json['currency'],
        'receiptNotification': !exists(json, 'receipt_notification') ? undefined : ReceiptNotificationFromJSON(json['receipt_notification']),
        'metadata': !exists(json, 'metadata') ? undefined : json['metadata'],
        'id': json['id'],
        'created': (new Date(json['created'])),
        'updated': (new Date(json['updated'])),
        'businessId': json['business_id'],
        'status': json['status'],
        'failureCode': !exists(json, 'failure_code') ? undefined : json['failure_code'],
        'estimatedArrivalTime': !exists(json, 'estimated_arrival_time') ? undefined : (new Date(json['estimated_arrival_time'])),
    };
}

export function GetPayouts200ResponseDataInnerToJSON(value?: GetPayouts200ResponseDataInner | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'reference_id': value.referenceId,
        'channel_code': value.channelCode,
        'channel_properties': DigitalPayoutChannelPropertiesToJSON(value.channelProperties),
        'amount': value.amount,
        'description': value.description,
        'currency': value.currency,
        'receipt_notification': ReceiptNotificationToJSON(value.receiptNotification),
        'metadata': value.metadata,
        'id': value.id,
        'created': (value.created.toISOString()),
        'updated': (value.updated.toISOString()),
        'business_id': value.businessId,
        'status': value.status,
        'failure_code': value.failureCode,
        'estimated_arrival_time': value.estimatedArrivalTime === undefined ? undefined : (value.estimatedArrivalTime.toISOString()),
    };
}

