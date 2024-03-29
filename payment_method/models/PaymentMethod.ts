/* tslint:disable */
/* eslint-disable */
/**
 * NOTE: This file is auto generated by Xendit.
 * Do not edit the class manually.
 * Improvements? Share your ideas at https://github.com/xendit/xendit-node
 */

import { exists, mapValues } from '../../runtime';
import type { BillingInformation } from './BillingInformation';
import {
    BillingInformationFromJSON,
    BillingInformationFromJSONTyped,
    BillingInformationToJSON,
} from './BillingInformation';
import type { Card } from './Card';
import {
    CardFromJSON,
    CardFromJSONTyped,
    CardToJSON,
} from './Card';
import type { DirectDebit } from './DirectDebit';
import {
    DirectDebitFromJSON,
    DirectDebitFromJSONTyped,
    DirectDebitToJSON,
} from './DirectDebit';
import type { EWallet } from './EWallet';
import {
    EWalletFromJSON,
    EWalletFromJSONTyped,
    EWalletToJSON,
} from './EWallet';
import type { OverTheCounter } from './OverTheCounter';
import {
    OverTheCounterFromJSON,
    OverTheCounterFromJSONTyped,
    OverTheCounterToJSON,
} from './OverTheCounter';
import type { PaymentMethodAction } from './PaymentMethodAction';
import {
    PaymentMethodActionFromJSON,
    PaymentMethodActionFromJSONTyped,
    PaymentMethodActionToJSON,
} from './PaymentMethodAction';
import type { PaymentMethodCountry } from './PaymentMethodCountry';
import {
    PaymentMethodCountryFromJSON,
    PaymentMethodCountryFromJSONTyped,
    PaymentMethodCountryToJSON,
} from './PaymentMethodCountry';
import type { PaymentMethodReusability } from './PaymentMethodReusability';
import {
    PaymentMethodReusabilityFromJSON,
    PaymentMethodReusabilityFromJSONTyped,
    PaymentMethodReusabilityToJSON,
} from './PaymentMethodReusability';
import type { PaymentMethodStatus } from './PaymentMethodStatus';
import {
    PaymentMethodStatusFromJSON,
    PaymentMethodStatusFromJSONTyped,
    PaymentMethodStatusToJSON,
} from './PaymentMethodStatus';
import type { PaymentMethodType } from './PaymentMethodType';
import {
    PaymentMethodTypeFromJSON,
    PaymentMethodTypeFromJSONTyped,
    PaymentMethodTypeToJSON,
} from './PaymentMethodType';
import type { QRCode } from './QRCode';
import {
    QRCodeFromJSON,
    QRCodeFromJSONTyped,
    QRCodeToJSON,
} from './QRCode';
import type { VirtualAccount } from './VirtualAccount';
import {
    VirtualAccountFromJSON,
    VirtualAccountFromJSONTyped,
    VirtualAccountToJSON,
} from './VirtualAccount';

/**
 * 
 * @export
 * @interface PaymentMethod
 */
export interface PaymentMethod {
    /**
     * 
     * @type {string}
     * @memberof PaymentMethod
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof PaymentMethod
     */
    businessId?: string;
    /**
     * 
     * @type {PaymentMethodType}
     * @memberof PaymentMethod
     */
    type?: PaymentMethodType;
    /**
     * 
     * @type {PaymentMethodCountry}
     * @memberof PaymentMethod
     */
    country?: PaymentMethodCountry;
    /**
     * 
     * @type {string}
     * @memberof PaymentMethod
     */
    customerId?: string | null;
    /**
     * 
     * @type {object}
     * @memberof PaymentMethod
     */
    customer?: object | null;
    /**
     * 
     * @type {string}
     * @memberof PaymentMethod
     */
    referenceId?: string;
    /**
     * 
     * @type {string}
     * @memberof PaymentMethod
     */
    description?: string | null;
    /**
     * 
     * @type {PaymentMethodStatus}
     * @memberof PaymentMethod
     */
    status?: PaymentMethodStatus;
    /**
     * 
     * @type {PaymentMethodReusability}
     * @memberof PaymentMethod
     */
    reusability?: PaymentMethodReusability;
    /**
     * 
     * @type {Array<PaymentMethodAction>}
     * @memberof PaymentMethod
     */
    actions?: Array<PaymentMethodAction>;
    /**
     * 
     * @type {object}
     * @memberof PaymentMethod
     */
    metadata?: object | null;
    /**
     * 
     * @type {BillingInformation}
     * @memberof PaymentMethod
     */
    billingInformation?: BillingInformation | null;
    /**
     * 
     * @type {string}
     * @memberof PaymentMethod
     */
    failureCode?: string | null;
    /**
     * 
     * @type {Date}
     * @memberof PaymentMethod
     */
    created?: Date;
    /**
     * 
     * @type {Date}
     * @memberof PaymentMethod
     */
    updated?: Date;
    /**
     * 
     * @type {EWallet}
     * @memberof PaymentMethod
     */
    ewallet?: EWallet | null;
    /**
     * 
     * @type {DirectDebit}
     * @memberof PaymentMethod
     */
    directDebit?: DirectDebit | null;
    /**
     * 
     * @type {OverTheCounter}
     * @memberof PaymentMethod
     */
    overTheCounter?: OverTheCounter | null;
    /**
     * 
     * @type {Card}
     * @memberof PaymentMethod
     */
    card?: Card | null;
    /**
     * 
     * @type {QRCode}
     * @memberof PaymentMethod
     */
    qrCode?: QRCode | null;
    /**
     * 
     * @type {VirtualAccount}
     * @memberof PaymentMethod
     */
    virtualAccount?: VirtualAccount | null;
}

/**
 * Check if a given object implements the PaymentMethod interface.
 */
export function instanceOfPaymentMethod(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;

    return isInstance;
}

export function PaymentMethodFromJSON(json: any): PaymentMethod {
    return PaymentMethodFromJSONTyped(json, false);
}

export function PaymentMethodFromJSONTyped(json: any, ignoreDiscriminator: boolean): PaymentMethod {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'businessId': !exists(json, 'business_id') ? undefined : json['business_id'],
        'type': !exists(json, 'type') ? undefined : PaymentMethodTypeFromJSON(json['type']),
        'country': !exists(json, 'country') ? undefined : PaymentMethodCountryFromJSON(json['country']),
        'customerId': !exists(json, 'customer_id') ? undefined : json['customer_id'],
        'customer': !exists(json, 'customer') ? undefined : json['customer'],
        'referenceId': !exists(json, 'reference_id') ? undefined : json['reference_id'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'status': !exists(json, 'status') ? undefined : PaymentMethodStatusFromJSON(json['status']),
        'reusability': !exists(json, 'reusability') ? undefined : PaymentMethodReusabilityFromJSON(json['reusability']),
        'actions': !exists(json, 'actions') ? undefined : ((json['actions'] as Array<any>).map(PaymentMethodActionFromJSON)),
        'metadata': !exists(json, 'metadata') ? undefined : json['metadata'],
        'billingInformation': !exists(json, 'billing_information') ? undefined : BillingInformationFromJSON(json['billing_information']),
        'failureCode': !exists(json, 'failure_code') ? undefined : json['failure_code'],
        'created': !exists(json, 'created') ? undefined : (new Date(json['created'])),
        'updated': !exists(json, 'updated') ? undefined : (new Date(json['updated'])),
        'ewallet': !exists(json, 'ewallet') ? undefined : EWalletFromJSON(json['ewallet']),
        'directDebit': !exists(json, 'direct_debit') ? undefined : DirectDebitFromJSON(json['direct_debit']),
        'overTheCounter': !exists(json, 'over_the_counter') ? undefined : OverTheCounterFromJSON(json['over_the_counter']),
        'card': !exists(json, 'card') ? undefined : CardFromJSON(json['card']),
        'qrCode': !exists(json, 'qr_code') ? undefined : QRCodeFromJSON(json['qr_code']),
        'virtualAccount': !exists(json, 'virtual_account') ? undefined : VirtualAccountFromJSON(json['virtual_account']),
    };
}

export function PaymentMethodToJSON(value?: PaymentMethod | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'business_id': value.businessId,
        'type': PaymentMethodTypeToJSON(value.type),
        'country': PaymentMethodCountryToJSON(value.country),
        'customer_id': value.customerId,
        'customer': value.customer,
        'reference_id': value.referenceId,
        'description': value.description,
        'status': PaymentMethodStatusToJSON(value.status),
        'reusability': PaymentMethodReusabilityToJSON(value.reusability),
        'actions': value.actions === undefined ? undefined : ((value.actions as Array<any>).map(PaymentMethodActionToJSON)),
        'metadata': value.metadata,
        'billing_information': BillingInformationToJSON(value.billingInformation),
        'failure_code': value.failureCode,
        'created': value.created === undefined ? undefined : (value.created.toISOString()),
        'updated': value.updated === undefined ? undefined : (value.updated.toISOString()),
        'ewallet': EWalletToJSON(value.ewallet),
        'direct_debit': DirectDebitToJSON(value.directDebit),
        'over_the_counter': OverTheCounterToJSON(value.overTheCounter),
        'card': CardToJSON(value.card),
        'qr_code': QRCodeToJSON(value.qrCode),
        'virtual_account': VirtualAccountToJSON(value.virtualAccount),
    };
}

