/* tslint:disable */
/* eslint-disable */
/**
 * NOTE: This file is auto generated by Xendit.
 * Do not edit the class manually.
 * Improvements? Share your ideas at https://github.com/xendit/xendit-node
 */

import { exists, mapValues } from '../../runtime';
import type { ChannelAmountLimits } from './ChannelAmountLimits';
import {
    ChannelAmountLimitsFromJSON,
    ChannelAmountLimitsFromJSONTyped,
    ChannelAmountLimitsToJSON,
} from './ChannelAmountLimits';
import type { ChannelProperty } from './ChannelProperty';
import {
    ChannelPropertyFromJSON,
    ChannelPropertyFromJSONTyped,
    ChannelPropertyToJSON,
} from './ChannelProperty';

/**
 * 
 * @export
 * @interface PaymentChannel
 */
export interface PaymentChannel {
    /**
     * The specific Xendit code used to identify the partner channel
     * @type {string}
     * @memberof PaymentChannel
     */
    channelCode?: string;
    /**
     * The payment method type
     * @type {string}
     * @memberof PaymentChannel
     */
    type?: string;
    /**
     * The country where the channel operates  in ISO 3166-2 country code
     * @type {string}
     * @memberof PaymentChannel
     */
    country?: string;
    /**
     * Official parter name of the payment channel
     * @type {string}
     * @memberof PaymentChannel
     */
    channelName?: string;
    /**
     * 
     * @type {Array<ChannelProperty>}
     * @memberof PaymentChannel
     */
    channelProperties?: Array<ChannelProperty>;
    /**
     * If available, this contains a URL to the logo of the partner channel
     * @type {string}
     * @memberof PaymentChannel
     */
    logoUrl?: string;
    /**
     * 
     * @type {Array<ChannelAmountLimits>}
     * @memberof PaymentChannel
     */
    amountLimits?: Array<ChannelAmountLimits>;
}

/**
 * Check if a given object implements the PaymentChannel interface.
 */
export function instanceOfPaymentChannel(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function PaymentChannelFromJSON(json: any): PaymentChannel {
    return PaymentChannelFromJSONTyped(json, false);
}

export function PaymentChannelFromJSONTyped(json: any, ignoreDiscriminator: boolean): PaymentChannel {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'channelCode': !exists(json, 'channel_code') ? undefined : json['channel_code'],
        'type': !exists(json, 'type') ? undefined : json['type'],
        'country': !exists(json, 'country') ? undefined : json['country'],
        'channelName': !exists(json, 'channel_name') ? undefined : json['channel_name'],
        'channelProperties': !exists(json, 'channel_properties') ? undefined : ((json['channel_properties'] as Array<any>).map(ChannelPropertyFromJSON)),
        'logoUrl': !exists(json, 'logo_url') ? undefined : json['logo_url'],
        'amountLimits': !exists(json, 'amount_limits') ? undefined : ((json['amount_limits'] as Array<any>).map(ChannelAmountLimitsFromJSON)),
    };
}

export function PaymentChannelToJSON(value?: PaymentChannel | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'channel_code': value.channelCode,
        'type': value.type,
        'country': value.country,
        'channel_name': value.channelName,
        'channel_properties': value.channelProperties === undefined ? undefined : ((value.channelProperties as Array<any>).map(ChannelPropertyToJSON)),
        'logo_url': value.logoUrl,
        'amount_limits': value.amountLimits === undefined ? undefined : ((value.amountLimits as Array<any>).map(ChannelAmountLimitsToJSON)),
    };
}

