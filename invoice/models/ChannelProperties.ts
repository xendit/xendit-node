/* tslint:disable */
/* eslint-disable */
/**
 * NOTE: This file is auto generated by Xendit.
 * Do not edit the class manually.
 * Improvements? Share your ideas at https://github.com/xendit/xendit-node
 */

import { exists, mapValues } from '../../runtime';
import type { ChannelPropertiesCards } from './ChannelPropertiesCards';
import {
    ChannelPropertiesCardsFromJSON,
    ChannelPropertiesCardsFromJSONTyped,
    ChannelPropertiesCardsToJSON,
} from './ChannelPropertiesCards';

/**
 * An object representing channel-specific properties.
 * @export
 * @interface ChannelProperties
 */
export interface ChannelProperties {
    /**
     * 
     * @type {ChannelPropertiesCards}
     * @memberof ChannelProperties
     */
    cards?: ChannelPropertiesCards;
}

/**
 * Check if a given object implements the ChannelProperties interface.
 */
export function instanceOfChannelProperties(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ChannelPropertiesFromJSON(json: any): ChannelProperties {
    return ChannelPropertiesFromJSONTyped(json, false);
}

export function ChannelPropertiesFromJSONTyped(json: any, ignoreDiscriminator: boolean): ChannelProperties {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'cards': !exists(json, 'cards') ? undefined : ChannelPropertiesCardsFromJSON(json['cards']),
    };
}

export function ChannelPropertiesToJSON(value?: ChannelProperties | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'cards': ChannelPropertiesCardsToJSON(value.cards),
    };
}

