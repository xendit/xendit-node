/* tslint:disable */
/* eslint-disable */
/**
 * NOTE: This file is auto generated by Xendit.
 * Do not edit the class manually.
 * Improvements? Share your ideas at https://github.com/xendit/xendit-node
 */

import { exists, mapValues } from '../../runtime';
import type { OverTheCounterChannelCode } from './OverTheCounterChannelCode';
import {
    OverTheCounterChannelCodeFromJSON,
    OverTheCounterChannelCodeFromJSONTyped,
    OverTheCounterChannelCodeToJSON,
} from './OverTheCounterChannelCode';
import type { OverTheCounterChannelProperties } from './OverTheCounterChannelProperties';
import {
    OverTheCounterChannelPropertiesFromJSON,
    OverTheCounterChannelPropertiesFromJSONTyped,
    OverTheCounterChannelPropertiesToJSON,
} from './OverTheCounterChannelProperties';
import type { PaymentRequestCurrency } from './PaymentRequestCurrency';
import {
    PaymentRequestCurrencyFromJSON,
    PaymentRequestCurrencyFromJSONTyped,
    PaymentRequestCurrencyToJSON,
} from './PaymentRequestCurrency';

/**
 * Over the Counter Payment Method Details
 * @export
 * @interface OverTheCounter
 */
export interface OverTheCounter {
    /**
     * 
     * @type {number}
     * @memberof OverTheCounter
     */
    amount?: number | null;
    /**
     * 
     * @type {PaymentRequestCurrency}
     * @memberof OverTheCounter
     */
    currency?: PaymentRequestCurrency;
    /**
     * 
     * @type {OverTheCounterChannelCode}
     * @memberof OverTheCounter
     */
    channelCode: OverTheCounterChannelCode;
    /**
     * 
     * @type {OverTheCounterChannelProperties}
     * @memberof OverTheCounter
     */
    channelProperties: OverTheCounterChannelProperties;
}

/**
 * Check if a given object implements the OverTheCounter interface.
 */
export function instanceOfOverTheCounter(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "channelCode" in value;
    isInstance = isInstance && "channelProperties" in value;

    return isInstance;
}

export function OverTheCounterFromJSON(json: any): OverTheCounter {
    return OverTheCounterFromJSONTyped(json, false);
}

export function OverTheCounterFromJSONTyped(json: any, ignoreDiscriminator: boolean): OverTheCounter {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'amount': !exists(json, 'amount') ? undefined : json['amount'],
        'currency': !exists(json, 'currency') ? undefined : PaymentRequestCurrencyFromJSON(json['currency']),
        'channelCode': OverTheCounterChannelCodeFromJSON(json['channel_code']),
        'channelProperties': OverTheCounterChannelPropertiesFromJSON(json['channel_properties']),
    };
}

export function OverTheCounterToJSON(value?: OverTheCounter | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'amount': value.amount,
        'currency': PaymentRequestCurrencyToJSON(value.currency),
        'channel_code': OverTheCounterChannelCodeToJSON(value.channelCode),
        'channel_properties': OverTheCounterChannelPropertiesToJSON(value.channelProperties),
    };
}

