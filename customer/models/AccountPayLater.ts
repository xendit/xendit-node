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
 * @interface AccountPayLater
 */
export interface AccountPayLater {
    /**
     * Alphanumeric string identifying this account. Usually an email address or phone number.
     * @type {string}
     * @memberof AccountPayLater
     */
    accountId?: string;
    /**
     * Name of account holder as per the cardless credit account.
     * @type {string}
     * @memberof AccountPayLater
     */
    accountHolderName?: string | null;
    /**
     * 
     * @type {string}
     * @memberof AccountPayLater
     */
    currency?: string;
}

/**
 * Check if a given object implements the AccountPayLater interface.
 */
export function instanceOfAccountPayLater(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function AccountPayLaterFromJSON(json: any): AccountPayLater {
    return AccountPayLaterFromJSONTyped(json, false);
}

export function AccountPayLaterFromJSONTyped(json: any, ignoreDiscriminator: boolean): AccountPayLater {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'accountId': !exists(json, 'account_id') ? undefined : json['account_id'],
        'accountHolderName': !exists(json, 'account_holder_name') ? undefined : json['account_holder_name'],
        'currency': !exists(json, 'currency') ? undefined : json['currency'],
    };
}

export function AccountPayLaterToJSON(value?: AccountPayLater | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'account_id': value.accountId,
        'account_holder_name': value.accountHolderName,
        'currency': value.currency,
    };
}
