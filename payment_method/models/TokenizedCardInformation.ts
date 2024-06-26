/* tslint:disable */
/* eslint-disable */
/**
 * NOTE: This file is auto generated by Xendit.
 * Do not edit the class manually.
 * Improvements? Share your ideas at https://github.com/xendit/xendit-node
 */

import { exists, mapValues } from '../../runtime';
/**
 * Tokenized Card Information
 * @export
 * @interface TokenizedCardInformation
 */
export interface TokenizedCardInformation {
    /**
     * 
     * @type {string}
     * @memberof TokenizedCardInformation
     */
    tokenId?: string;
    /**
     * 1st 6 and last 4 digits of the card
     * @type {string}
     * @memberof TokenizedCardInformation
     */
    maskedCardNumber?: string;
    /**
     * Cardholder name is optional but recommended for 3DS 2 / AVS verification
     * @type {string}
     * @memberof TokenizedCardInformation
     */
    cardholderName?: string | null;
    /**
     * Card expiry month in MM format
     * @type {string}
     * @memberof TokenizedCardInformation
     */
    expiryMonth?: string;
    /**
     * Card expiry month in YY format
     * @type {string}
     * @memberof TokenizedCardInformation
     */
    expiryYear?: string;
    /**
     * Xendit-generated identifier for the unique card number. Multiple payment method objects can be created for the same account - e.g. if the user first creates a one-time payment request, and then later on creates a multiple-use payment method using the same account.   The fingerprint helps to identify the unique account being used.
     * @type {string}
     * @memberof TokenizedCardInformation
     */
    fingerprint?: string;
    /**
     * Whether the card is a credit or debit card
     * @type {string}
     * @memberof TokenizedCardInformation
     */
    type?: string;
    /**
     * Card network - VISA, MASTERCARD, JCB, AMEX, DISCOVER, BCA
     * @type {string}
     * @memberof TokenizedCardInformation
     */
    network?: string;
    /**
     * Country where the card was issued ISO 3166-1 Alpha-2
     * @type {string}
     * @memberof TokenizedCardInformation
     */
    country?: string;
    /**
     * Issuer of the card, most often an issuing bank For example, “BCA”, “MANDIRI”
     * @type {string}
     * @memberof TokenizedCardInformation
     */
    issuer?: string;
    /**
     * 
     * @type {string}
     * @memberof TokenizedCardInformation
     */
    cardNumber?: string;
    /**
     * 
     * @type {string}
     * @memberof TokenizedCardInformation
     */
    oneTimeToken?: string;
}

/**
 * Check if a given object implements the TokenizedCardInformation interface.
 */
export function instanceOfTokenizedCardInformation(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function TokenizedCardInformationFromJSON(json: any): TokenizedCardInformation {
    return TokenizedCardInformationFromJSONTyped(json, false);
}

export function TokenizedCardInformationFromJSONTyped(json: any, ignoreDiscriminator: boolean): TokenizedCardInformation {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'tokenId': !exists(json, 'token_id') ? undefined : json['token_id'],
        'maskedCardNumber': !exists(json, 'masked_card_number') ? undefined : json['masked_card_number'],
        'cardholderName': !exists(json, 'cardholder_name') ? undefined : json['cardholder_name'],
        'expiryMonth': !exists(json, 'expiry_month') ? undefined : json['expiry_month'],
        'expiryYear': !exists(json, 'expiry_year') ? undefined : json['expiry_year'],
        'fingerprint': !exists(json, 'fingerprint') ? undefined : json['fingerprint'],
        'type': !exists(json, 'type') ? undefined : json['type'],
        'network': !exists(json, 'network') ? undefined : json['network'],
        'country': !exists(json, 'country') ? undefined : json['country'],
        'issuer': !exists(json, 'issuer') ? undefined : json['issuer'],
        'cardNumber': !exists(json, 'card_number') ? undefined : json['card_number'],
        'oneTimeToken': !exists(json, 'one_time_token') ? undefined : json['one_time_token'],
    };
}

export function TokenizedCardInformationToJSON(value?: TokenizedCardInformation | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'token_id': value.tokenId,
        'masked_card_number': value.maskedCardNumber,
        'cardholder_name': value.cardholderName,
        'expiry_month': value.expiryMonth,
        'expiry_year': value.expiryYear,
        'fingerprint': value.fingerprint,
        'type': value.type,
        'network': value.network,
        'country': value.country,
        'issuer': value.issuer,
        'card_number': value.cardNumber,
        'one_time_token': value.oneTimeToken,
    };
}

