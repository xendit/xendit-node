/* tslint:disable */
/* eslint-disable */
/**
 * NOTE: This file is auto generated by Xendit.
 * Do not edit the class manually.
 * Improvements? Share your ideas at https://github.com/xendit/xendit-node
 */

import { exists, mapValues } from '../../runtime';
import type { CardVerificationResultsThreeDSecure } from './CardVerificationResultsThreeDSecure';
import {
    CardVerificationResultsThreeDSecureFromJSON,
    CardVerificationResultsThreeDSecureFromJSONTyped,
    CardVerificationResultsThreeDSecureToJSON,
} from './CardVerificationResultsThreeDSecure';

/**
 * 
 * @export
 * @interface CardVerificationResults
 */
export interface CardVerificationResults {
    /**
     * 
     * @type {CardVerificationResultsThreeDSecure}
     * @memberof CardVerificationResults
     */
    threeDSecure?: CardVerificationResultsThreeDSecure;
    /**
     * 
     * @type {string}
     * @memberof CardVerificationResults
     */
    cvvResult?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CardVerificationResults
     */
    addressVerificationResult?: string | null;
}

/**
 * Check if a given object implements the CardVerificationResults interface.
 */
export function instanceOfCardVerificationResults(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function CardVerificationResultsFromJSON(json: any): CardVerificationResults {
    return CardVerificationResultsFromJSONTyped(json, false);
}

export function CardVerificationResultsFromJSONTyped(json: any, ignoreDiscriminator: boolean): CardVerificationResults {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'threeDSecure': !exists(json, 'three_d_secure') ? undefined : CardVerificationResultsThreeDSecureFromJSON(json['three_d_secure']),
        'cvvResult': !exists(json, 'cvv_result') ? undefined : json['cvv_result'],
        'addressVerificationResult': !exists(json, 'address_verification_result') ? undefined : json['address_verification_result'],
    };
}

export function CardVerificationResultsToJSON(value?: CardVerificationResults | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'three_d_secure': CardVerificationResultsThreeDSecureToJSON(value.threeDSecure),
        'cvv_result': value.cvvResult,
        'address_verification_result': value.addressVerificationResult,
    };
}

