/* tslint:disable */
/* eslint-disable */
/**
 * NOTE: This file is auto generated by Xendit.
 * Do not edit the class manually.
 * Improvements? Share your ideas at https://github.com/xendit/xendit-node
 */

import { exists, mapValues } from '../../runtime';
import type { CardChannelProperties } from './CardChannelProperties';
import {
    CardChannelPropertiesFromJSON,
    CardChannelPropertiesFromJSONTyped,
    CardChannelPropertiesToJSON,
} from './CardChannelProperties';
import type { CardVerificationResults } from './CardVerificationResults';
import {
    CardVerificationResultsFromJSON,
    CardVerificationResultsFromJSONTyped,
    CardVerificationResultsToJSON,
} from './CardVerificationResults';
import type { TokenizedCardInformation } from './TokenizedCardInformation';
import {
    TokenizedCardInformationFromJSON,
    TokenizedCardInformationFromJSONTyped,
    TokenizedCardInformationToJSON,
} from './TokenizedCardInformation';

/**
 * Card Payment Method Details
 * @export
 * @interface Card
 */
export interface Card {
    /**
     * 
     * @type {string}
     * @memberof Card
     */
    currency: string | null;
    /**
     * 
     * @type {CardChannelProperties}
     * @memberof Card
     */
    channelProperties: CardChannelProperties | null;
    /**
     * 
     * @type {TokenizedCardInformation}
     * @memberof Card
     */
    cardInformation?: TokenizedCardInformation;
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
    isInstance = isInstance && "currency" in value;
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
        
        'currency': json['currency'],
        'channelProperties': CardChannelPropertiesFromJSON(json['channel_properties']),
        'cardInformation': !exists(json, 'card_information') ? undefined : TokenizedCardInformationFromJSON(json['card_information']),
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
        
        'currency': value.currency,
        'channel_properties': CardChannelPropertiesToJSON(value.channelProperties),
        'card_information': TokenizedCardInformationToJSON(value.cardInformation),
        'card_verification_results': CardVerificationResultsToJSON(value.cardVerificationResults),
    };
}

