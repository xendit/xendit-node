/* tslint:disable */
/* eslint-disable */
/**
 * NOTE: This file is auto generated by Xendit.
 * Do not edit the class manually.
 * Improvements? Share your ideas at https://github.com/xendit/xendit-node
 */

import { exists, mapValues } from '../../runtime';
import type { EWalletAccount } from './EWalletAccount';
import {
    EWalletAccountFromJSON,
    EWalletAccountFromJSONTyped,
    EWalletAccountToJSON,
} from './EWalletAccount';

/**
 * 
 * @export
 * @interface EWalletAllOf
 */
export interface EWalletAllOf {
    /**
     * 
     * @type {EWalletAccount}
     * @memberof EWalletAllOf
     */
    account?: EWalletAccount;
}

/**
 * Check if a given object implements the EWalletAllOf interface.
 */
export function instanceOfEWalletAllOf(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function EWalletAllOfFromJSON(json: any): EWalletAllOf {
    return EWalletAllOfFromJSONTyped(json, false);
}

export function EWalletAllOfFromJSONTyped(json: any, ignoreDiscriminator: boolean): EWalletAllOf {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'account': !exists(json, 'account') ? undefined : EWalletAccountFromJSON(json['account']),
    };
}

export function EWalletAllOfToJSON(value?: EWalletAllOf | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'account': EWalletAccountToJSON(value.account),
    };
}

