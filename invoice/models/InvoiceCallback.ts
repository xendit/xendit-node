/* tslint:disable */
/* eslint-disable */
/**
 * NOTE: This file is auto generated by Xendit.
 * Do not edit the class manually.
 * Improvements? Share your ideas at https://github.com/xendit/xendit-node
 */

import { exists, mapValues } from '../../runtime';
import type { InvoiceCallbackItem } from './InvoiceCallbackItem';
import {
    InvoiceCallbackItemFromJSON,
    InvoiceCallbackItemFromJSONTyped,
    InvoiceCallbackItemToJSON,
} from './InvoiceCallbackItem';
import type { InvoiceFee } from './InvoiceFee';
import {
    InvoiceFeeFromJSON,
    InvoiceFeeFromJSONTyped,
    InvoiceFeeToJSON,
} from './InvoiceFee';
import type { PaymentDetails } from './PaymentDetails';
import {
    PaymentDetailsFromJSON,
    PaymentDetailsFromJSONTyped,
    PaymentDetailsToJSON,
} from './PaymentDetails';

/**
 * Invoice Callback Object
 * @export
 * @interface InvoiceCallback
 */
export interface InvoiceCallback {
    /**
     * An invoice ID generated by Xendit
     * @type {string}
     * @memberof InvoiceCallback
     */
    id: string;
    /**
     * ID of your choice (typically the unique identifier of an invoice in your system)
     * @type {string}
     * @memberof InvoiceCallback
     */
    externalId: string;
    /**
     * Xendit Business ID
     * @type {string}
     * @memberof InvoiceCallback
     */
    userId: string;
    /**
     * The status of the invoice.
     * @type {string}
     * @memberof InvoiceCallback
     */
    status: string;
    /**
     * The name of company or website
     * @type {string}
     * @memberof InvoiceCallback
     */
    merchantName: string;
    /**
     * Nominal amount for the invoice
     * @type {number}
     * @memberof InvoiceCallback
     */
    amount: number;
    /**
     * Email of the payer
     * @type {string}
     * @memberof InvoiceCallback
     */
    payerEmail?: string;
    /**
     * Description for the invoice
     * @type {string}
     * @memberof InvoiceCallback
     */
    description?: string;
    /**
     * Total amount paid for the invoice
     * @type {number}
     * @memberof InvoiceCallback
     */
    paidAmount?: number;
    /**
     * The date and time when the invoice was created.
     * @type {string}
     * @memberof InvoiceCallback
     */
    created: string;
    /**
     * The date and time when the invoice was last updated.
     * @type {string}
     * @memberof InvoiceCallback
     */
    updated: string;
    /**
     * The currency of the invoice.
     * @type {string}
     * @memberof InvoiceCallback
     */
    currency: string;
    /**
     * The date and time when the invoice was paid.
     * @type {string}
     * @memberof InvoiceCallback
     */
    paidAt?: string;
    /**
     * The payment method used for the invoice.
     * @type {string}
     * @memberof InvoiceCallback
     */
    paymentMethod?: string;
    /**
     * The payment channel.
     * @type {string}
     * @memberof InvoiceCallback
     */
    paymentChannel?: string;
    /**
     * The payment destination.
     * @type {string}
     * @memberof InvoiceCallback
     */
    paymentDestination?: string;
    /**
     * 
     * @type {PaymentDetails}
     * @memberof InvoiceCallback
     */
    paymentDetails?: PaymentDetails;
    /**
     * The ID of the payment.
     * @type {string}
     * @memberof InvoiceCallback
     */
    paymentId?: string;
    /**
     * The URL to redirect to on successful payment.
     * @type {string}
     * @memberof InvoiceCallback
     */
    successRedirectUrl?: string;
    /**
     * The URL to redirect to on payment failure.
     * @type {string}
     * @memberof InvoiceCallback
     */
    failureRedirectUrl?: string;
    /**
     * The ID associated with a credit card charge (if applicable).
     * @type {string}
     * @memberof InvoiceCallback
     */
    creditCardChargeId?: string;
    /**
     * 
     * @type {Array<InvoiceCallbackItem>}
     * @memberof InvoiceCallback
     */
    items?: Array<InvoiceCallbackItem>;
    /**
     * An array of fees associated with the invoice.
     * @type {Array<InvoiceFee>}
     * @memberof InvoiceCallback
     */
    fees?: Array<InvoiceFee>;
    /**
     * Indicates whether credit card authentication is required.
     * @type {boolean}
     * @memberof InvoiceCallback
     */
    shouldAuthenticateCreditCard?: boolean;
    /**
     * The bank code for the bank details.
     * @type {string}
     * @memberof InvoiceCallback
     */
    bankCode?: string;
    /**
     * The type of eWallet.
     * @type {string}
     * @memberof InvoiceCallback
     */
    ewalletType?: string;
    /**
     * The on-demand link.
     * @type {string}
     * @memberof InvoiceCallback
     */
    onDemandLink?: string;
    /**
     * The ID of the recurring payment.
     * @type {string}
     * @memberof InvoiceCallback
     */
    recurringPaymentId?: string;
}

/**
 * Check if a given object implements the InvoiceCallback interface.
 */
export function instanceOfInvoiceCallback(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "externalId" in value;
    isInstance = isInstance && "userId" in value;
    isInstance = isInstance && "status" in value;
    isInstance = isInstance && "merchantName" in value;
    isInstance = isInstance && "amount" in value;
    isInstance = isInstance && "created" in value;
    isInstance = isInstance && "updated" in value;
    isInstance = isInstance && "currency" in value;

    return isInstance;
}

export function InvoiceCallbackFromJSON(json: any): InvoiceCallback {
    return InvoiceCallbackFromJSONTyped(json, false);
}

export function InvoiceCallbackFromJSONTyped(json: any, ignoreDiscriminator: boolean): InvoiceCallback {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'externalId': json['external_id'],
        'userId': json['user_id'],
        'status': json['status'],
        'merchantName': json['merchant_name'],
        'amount': json['amount'],
        'payerEmail': !exists(json, 'payer_email') ? undefined : json['payer_email'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'paidAmount': !exists(json, 'paid_amount') ? undefined : json['paid_amount'],
        'created': json['created'],
        'updated': json['updated'],
        'currency': json['currency'],
        'paidAt': !exists(json, 'paid_at') ? undefined : json['paid_at'],
        'paymentMethod': !exists(json, 'payment_method') ? undefined : json['payment_method'],
        'paymentChannel': !exists(json, 'payment_channel') ? undefined : json['payment_channel'],
        'paymentDestination': !exists(json, 'payment_destination') ? undefined : json['payment_destination'],
        'paymentDetails': !exists(json, 'payment_details') ? undefined : PaymentDetailsFromJSON(json['payment_details']),
        'paymentId': !exists(json, 'payment_id') ? undefined : json['payment_id'],
        'successRedirectUrl': !exists(json, 'success_redirect_url') ? undefined : json['success_redirect_url'],
        'failureRedirectUrl': !exists(json, 'failure_redirect_url') ? undefined : json['failure_redirect_url'],
        'creditCardChargeId': !exists(json, 'credit_card_charge_id') ? undefined : json['credit_card_charge_id'],
        'items': !exists(json, 'items') ? undefined : ((json['items'] as Array<any>).map(InvoiceCallbackItemFromJSON)),
        'fees': !exists(json, 'fees') ? undefined : ((json['fees'] as Array<any>).map(InvoiceFeeFromJSON)),
        'shouldAuthenticateCreditCard': !exists(json, 'should_authenticate_credit_card') ? undefined : json['should_authenticate_credit_card'],
        'bankCode': !exists(json, 'bank_code') ? undefined : json['bank_code'],
        'ewalletType': !exists(json, 'ewallet_type') ? undefined : json['ewallet_type'],
        'onDemandLink': !exists(json, 'on_demand_link') ? undefined : json['on_demand_link'],
        'recurringPaymentId': !exists(json, 'recurring_payment_id') ? undefined : json['recurring_payment_id'],
    };
}

export function InvoiceCallbackToJSON(value?: InvoiceCallback | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'external_id': value.externalId,
        'user_id': value.userId,
        'status': value.status,
        'merchant_name': value.merchantName,
        'amount': value.amount,
        'payer_email': value.payerEmail,
        'description': value.description,
        'paid_amount': value.paidAmount,
        'created': value.created,
        'updated': value.updated,
        'currency': value.currency,
        'paid_at': value.paidAt,
        'payment_method': value.paymentMethod,
        'payment_channel': value.paymentChannel,
        'payment_destination': value.paymentDestination,
        'payment_details': PaymentDetailsToJSON(value.paymentDetails),
        'payment_id': value.paymentId,
        'success_redirect_url': value.successRedirectUrl,
        'failure_redirect_url': value.failureRedirectUrl,
        'credit_card_charge_id': value.creditCardChargeId,
        'items': value.items === undefined ? undefined : ((value.items as Array<any>).map(InvoiceCallbackItemToJSON)),
        'fees': value.fees === undefined ? undefined : ((value.fees as Array<any>).map(InvoiceFeeToJSON)),
        'should_authenticate_credit_card': value.shouldAuthenticateCreditCard,
        'bank_code': value.bankCode,
        'ewallet_type': value.ewalletType,
        'on_demand_link': value.onDemandLink,
        'recurring_payment_id': value.recurringPaymentId,
    };
}

