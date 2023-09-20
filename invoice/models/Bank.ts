/* tslint:disable */
/* eslint-disable */
/**
 * NOTE: This file is auto generated by Xendit.
 * Do not edit the class manually.
 * Improvements? Share your ideas at https://github.com/xendit/xendit-node
 */

import { exists, mapValues } from '../../runtime';
import type { AlternativeDisplayItem } from './AlternativeDisplayItem';
import {
    AlternativeDisplayItemFromJSON,
    AlternativeDisplayItemFromJSONTyped,
    AlternativeDisplayItemToJSON,
} from './AlternativeDisplayItem';
import type { BankCode } from './BankCode';
import {
    BankCodeFromJSON,
    BankCodeFromJSONTyped,
    BankCodeToJSON,
} from './BankCode';

/**
 * An object representing bank details for invoices.
 * @export
 * @interface Bank
 */
export interface Bank {
    /**
     * 
     * @type {BankCode}
     * @memberof Bank
     */
    bankCode: BankCode;
    /**
     * The collection type for the bank details.
     * @type {string}
     * @memberof Bank
     */
    collectionType: string;
    /**
     * The branch of the bank.
     * @type {string}
     * @memberof Bank
     */
    bankBranch?: string;
    /**
     * The bank account number.
     * @type {string}
     * @memberof Bank
     */
    bankAccountNumber?: string;
    /**
     * The name of the account holder.
     * @type {string}
     * @memberof Bank
     */
    accountHolderName: string;
    /**
     * The transfer amount.
     * @type {number}
     * @memberof Bank
     */
    transferAmount?: number;
    /**
     * 
     * @type {Array<AlternativeDisplayItem>}
     * @memberof Bank
     */
    alternativeDisplays?: Array<AlternativeDisplayItem>;
}

/**
 * Check if a given object implements the Bank interface.
 */
export function instanceOfBank(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "bankCode" in value;
    isInstance = isInstance && "collectionType" in value;
    isInstance = isInstance && "accountHolderName" in value;

    return isInstance;
}

export function BankFromJSON(json: any): Bank {
    return BankFromJSONTyped(json, false);
}

export function BankFromJSONTyped(json: any, ignoreDiscriminator: boolean): Bank {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'bankCode': BankCodeFromJSON(json['bank_code']),
        'collectionType': json['collection_type'],
        'bankBranch': !exists(json, 'bank_branch') ? undefined : json['bank_branch'],
        'bankAccountNumber': !exists(json, 'bank_account_number') ? undefined : json['bank_account_number'],
        'accountHolderName': json['account_holder_name'],
        'transferAmount': !exists(json, 'transfer_amount') ? undefined : json['transfer_amount'],
        'alternativeDisplays': !exists(json, 'alternative_displays') ? undefined : ((json['alternative_displays'] as Array<any>).map(AlternativeDisplayItemFromJSON)),
    };
}

export function BankToJSON(value?: Bank | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'bank_code': BankCodeToJSON(value.bankCode),
        'collection_type': value.collectionType,
        'bank_branch': value.bankBranch,
        'bank_account_number': value.bankAccountNumber,
        'account_holder_name': value.accountHolderName,
        'transfer_amount': value.transferAmount,
        'alternative_displays': value.alternativeDisplays === undefined ? undefined : ((value.alternativeDisplays as Array<any>).map(AlternativeDisplayItemToJSON)),
    };
}
