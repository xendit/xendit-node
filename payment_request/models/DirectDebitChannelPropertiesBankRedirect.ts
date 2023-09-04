/* tslint:disable */
/* eslint-disable */
/**
 * NOTE: This file is auto generated by Xendit.
 * Do not edit the class manually.
 * Improvements? Share your ideas at https://github.com/xendit/xendit-node
 */

import { exists, mapValues } from '../../runtime';
/**
 * Direct Debit Bank Account Channel Properties
 * @export
 * @interface DirectDebitChannelPropertiesBankRedirect
 */
export interface DirectDebitChannelPropertiesBankRedirect {
    /**
     * Mobile number of the customer that is registered to channel
     * @type {string}
     * @memberof DirectDebitChannelPropertiesBankRedirect
     */
    mobileNumber?: string;
    /**
     * 
     * @type {string}
     * @memberof DirectDebitChannelPropertiesBankRedirect
     */
    successReturnUrl?: string;
    /**
     * 
     * @type {string}
     * @memberof DirectDebitChannelPropertiesBankRedirect
     */
    failureReturnUrl?: string;
}

/**
 * Check if a given object implements the DirectDebitChannelPropertiesBankRedirect interface.
 */
export function instanceOfDirectDebitChannelPropertiesBankRedirect(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function DirectDebitChannelPropertiesBankRedirectFromJSON(json: any): DirectDebitChannelPropertiesBankRedirect {
    return DirectDebitChannelPropertiesBankRedirectFromJSONTyped(json, false);
}

export function DirectDebitChannelPropertiesBankRedirectFromJSONTyped(json: any, ignoreDiscriminator: boolean): DirectDebitChannelPropertiesBankRedirect {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'mobileNumber': !exists(json, 'mobile_number') ? undefined : json['mobile_number'],
        'successReturnUrl': !exists(json, 'success_return_url') ? undefined : json['success_return_url'],
        'failureReturnUrl': !exists(json, 'failure_return_url') ? undefined : json['failure_return_url'],
    };
}

export function DirectDebitChannelPropertiesBankRedirectToJSON(value?: DirectDebitChannelPropertiesBankRedirect | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'mobile_number': value.mobileNumber,
        'success_return_url': value.successReturnUrl,
        'failure_return_url': value.failureReturnUrl,
    };
}

