/* tslint:disable */
/* eslint-disable */
/**
 * NOTE: This file is auto generated by Xendit.
 * Do not edit the class manually.
 * Improvements? Share your ideas at https://github.com/xendit/xendit-node
 */

import { exists, mapValues } from '../../runtime';
import type { VirtualAccountChannelCode } from './VirtualAccountChannelCode';
import {
    VirtualAccountChannelCodeFromJSON,
    VirtualAccountChannelCodeFromJSONTyped,
    VirtualAccountChannelCodeToJSON,
} from './VirtualAccountChannelCode';
import type { VirtualAccountChannelProperties } from './VirtualAccountChannelProperties';
import {
    VirtualAccountChannelPropertiesFromJSON,
    VirtualAccountChannelPropertiesFromJSONTyped,
    VirtualAccountChannelPropertiesToJSON,
} from './VirtualAccountChannelProperties';

/**
 * 
 * @export
 * @interface VirtualAccountParameters
 */
export interface VirtualAccountParameters {
    /**
     * 
     * @type {number}
     * @memberof VirtualAccountParameters
     */
    amount?: number | null;
    /**
     * 
     * @type {number}
     * @memberof VirtualAccountParameters
     */
    minAmount?: number | null;
    /**
     * 
     * @type {number}
     * @memberof VirtualAccountParameters
     */
    maxAmount?: number | null;
    /**
     * 
     * @type {string}
     * @memberof VirtualAccountParameters
     */
    currency?: string;
    /**
     * 
     * @type {VirtualAccountChannelCode}
     * @memberof VirtualAccountParameters
     */
    channelCode: VirtualAccountChannelCode;
    /**
     * 
     * @type {VirtualAccountChannelProperties}
     * @memberof VirtualAccountParameters
     */
    channelProperties: VirtualAccountChannelProperties;
    /**
     * For payments in Vietnam only, alternative display requested for the virtual account
     * @type {Array<string>}
     * @memberof VirtualAccountParameters
     */
    alternativeDisplayTypes?: Array<VirtualAccountParametersAlternativeDisplayTypesEnum>;
}


/**
 * @export
 */
export const VirtualAccountParametersAlternativeDisplayTypesEnum = {
    QrString: 'QR_STRING'
} as const;
export type VirtualAccountParametersAlternativeDisplayTypesEnum = typeof VirtualAccountParametersAlternativeDisplayTypesEnum[keyof typeof VirtualAccountParametersAlternativeDisplayTypesEnum];


/**
 * Check if a given object implements the VirtualAccountParameters interface.
 */
export function instanceOfVirtualAccountParameters(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "channelCode" in value;
    isInstance = isInstance && "channelProperties" in value;

    return isInstance;
}

export function VirtualAccountParametersFromJSON(json: any): VirtualAccountParameters {
    return VirtualAccountParametersFromJSONTyped(json, false);
}

export function VirtualAccountParametersFromJSONTyped(json: any, ignoreDiscriminator: boolean): VirtualAccountParameters {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'amount': !exists(json, 'amount') ? undefined : json['amount'],
        'minAmount': !exists(json, 'min_amount') ? undefined : json['min_amount'],
        'maxAmount': !exists(json, 'max_amount') ? undefined : json['max_amount'],
        'currency': !exists(json, 'currency') ? undefined : json['currency'],
        'channelCode': VirtualAccountChannelCodeFromJSON(json['channel_code']),
        'channelProperties': VirtualAccountChannelPropertiesFromJSON(json['channel_properties']),
        'alternativeDisplayTypes': !exists(json, 'alternative_display_types') ? undefined : json['alternative_display_types'],
    };
}

export function VirtualAccountParametersToJSON(value?: VirtualAccountParameters | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'amount': value.amount,
        'min_amount': value.minAmount,
        'max_amount': value.maxAmount,
        'currency': value.currency,
        'channel_code': VirtualAccountChannelCodeToJSON(value.channelCode),
        'channel_properties': VirtualAccountChannelPropertiesToJSON(value.channelProperties),
        'alternative_display_types': value.alternativeDisplayTypes,
    };
}

