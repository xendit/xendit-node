/* tslint:disable */
/* eslint-disable */
/**
 * NOTE: This file is auto generated by Xendit.
 * Do not edit the class manually.
 * Improvements? Share your ideas at https://github.com/xendit/xendit-node
 */

import { exists, mapValues } from '../../runtime';
import type { CardChannelCode } from './CardChannelCode';
import {
    CardChannelCodeFromJSON,
    CardChannelCodeFromJSONTyped,
    CardChannelCodeToJSON,
} from './CardChannelCode';
import type { CardChannelProperties } from './CardChannelProperties';
import {
    CardChannelPropertiesFromJSON,
    CardChannelPropertiesFromJSONTyped,
    CardChannelPropertiesToJSON,
} from './CardChannelProperties';
import type { CardInformation } from './CardInformation';
import {
    CardInformationFromJSON,
    CardInformationFromJSONTyped,
    CardInformationToJSON,
} from './CardInformation';
import type { CardVerificationResults } from './CardVerificationResults';
import {
    CardVerificationResultsFromJSON,
    CardVerificationResultsFromJSONTyped,
    CardVerificationResultsToJSON,
} from './CardVerificationResults';
import type { PaymentRequestCurrency } from './PaymentRequestCurrency';
import {
    PaymentRequestCurrencyFromJSON,
    PaymentRequestCurrencyFromJSONTyped,
    PaymentRequestCurrencyToJSON,
} from './PaymentRequestCurrency';

/**
 * 
 * @export
 * @interface Card
 */
export interface Card {
    /**
     * 
     * @type {CardChannelCode}
     * @memberof Card
     */
    channelCode?: CardChannelCode;
    /**
     * 
     * @type {PaymentRequestCurrency}
     * @memberof Card
     */
    currency?: PaymentRequestCurrency;
    /**
     * 
     * @type {CardChannelProperties}
     * @memberof Card
     */
    channelProperties: CardChannelProperties;
    /**
     * 
     * @type {CardInformation}
     * @memberof Card
     */
    cardInformation?: CardInformation;
    /**
     * 
     * @type {CardVerificationResults}
     * @memberof Card
     */
    cardVerificationResults?: CardVerificationResults | null;
}

/**
 * Check if a given object implements the Card interface.
 */
export function instanceOfCard(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "channelProperties" in value;

    return isInstance;
}

export function CardFromJSON(json: any): Card {
    return CardFromJSONTyped(json, false);
}

export function CardFromJSONTyped(json: any, ignoreDiscriminator: boolean): Card {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'channelCode': !exists(json, 'channel_code') ? undefined : CardChannelCodeFromJSON(json['channel_code']),
        'currency': !exists(json, 'currency') ? undefined : PaymentRequestCurrencyFromJSON(json['currency']),
        'channelProperties': CardChannelPropertiesFromJSON(json['channel_properties']),
        'cardInformation': !exists(json, 'card_information') ? undefined : CardInformationFromJSON(json['card_information']),
        'cardVerificationResults': !exists(json, 'card_verification_results') ? undefined : CardVerificationResultsFromJSON(json['card_verification_results']),
    };
}

export function CardToJSON(value?: Card | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'channel_code': CardChannelCodeToJSON(value.channelCode),
        'currency': PaymentRequestCurrencyToJSON(value.currency),
        'channel_properties': CardChannelPropertiesToJSON(value.channelProperties),
        'card_information': CardInformationToJSON(value.cardInformation),
        'card_verification_results': CardVerificationResultsToJSON(value.cardVerificationResults),
    };
}

