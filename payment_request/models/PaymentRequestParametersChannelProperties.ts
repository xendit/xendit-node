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
 * @interface PaymentRequestParametersChannelProperties
 */
export interface PaymentRequestParametersChannelProperties {
    /**
     * URL where the end-customer is redirected if the authorization is successful
     * @type {string}
     * @memberof PaymentRequestParametersChannelProperties
     */
    successReturnUrl?: string;
    /**
     * URL where the end-customer is redirected if the authorization failed
     * @type {string}
     * @memberof PaymentRequestParametersChannelProperties
     */
    failureReturnUrl?: string;
    /**
     * URL where the end-customer is redirected if the authorization cancelled
     * @type {string}
     * @memberof PaymentRequestParametersChannelProperties
     */
    cancelReturnUrl?: string;
    /**
     * URL where the end-customer is redirected if the authorization is pending
     * @type {string}
     * @memberof PaymentRequestParametersChannelProperties
     */
    pendingReturnUrl?: string;
    /**
     * REDEEM_NONE will not use any point, REDEEM_ALL will use all available points before cash balance is used. For OVO and ShopeePay tokenized payment use only.
     * @type {string}
     * @memberof PaymentRequestParametersChannelProperties
     */
    redeemPoints?: string;
    /**
     * Toggle used to require end-customer to input undergo OTP validation before completing a payment. OTP will always be required for transactions greater than 1,000,000 IDR. For BRI tokenized payment use only.
     * @type {boolean}
     * @memberof PaymentRequestParametersChannelProperties
     */
    requireAuth?: boolean;
    /**
     * Tag for a Merchant ID that you want to associate this payment with. For merchants using their own MIDs to specify which MID they want to use 
     * @type {string}
     * @memberof PaymentRequestParametersChannelProperties
     */
    merchantIdTag?: string;
    /**
     * Type of “credential-on-file” / “card-on-file” payment being made. Indicate that this payment uses a previously linked Payment Method for charging.
     * @type {string}
     * @memberof PaymentRequestParametersChannelProperties
     */
    cardonfileType?: string | null;
    /**
     * Three digit code written on the back of the card (usually called CVV/CVN).
     * @type {string}
     * @memberof PaymentRequestParametersChannelProperties
     */
    cvv?: string;
}

/**
 * Check if a given object implements the PaymentRequestParametersChannelProperties interface.
 */
export function instanceOfPaymentRequestParametersChannelProperties(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function PaymentRequestParametersChannelPropertiesFromJSON(json: any): PaymentRequestParametersChannelProperties {
    return PaymentRequestParametersChannelPropertiesFromJSONTyped(json, false);
}

export function PaymentRequestParametersChannelPropertiesFromJSONTyped(json: any, ignoreDiscriminator: boolean): PaymentRequestParametersChannelProperties {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'successReturnUrl': !exists(json, 'success_return_url') ? undefined : json['success_return_url'],
        'failureReturnUrl': !exists(json, 'failure_return_url') ? undefined : json['failure_return_url'],
        'cancelReturnUrl': !exists(json, 'cancel_return_url') ? undefined : json['cancel_return_url'],
        'pendingReturnUrl': !exists(json, 'pending_return_url') ? undefined : json['pending_return_url'],
        'redeemPoints': !exists(json, 'redeem_points') ? undefined : json['redeem_points'],
        'requireAuth': !exists(json, 'require_auth') ? undefined : json['require_auth'],
        'merchantIdTag': !exists(json, 'merchant_id_tag') ? undefined : json['merchant_id_tag'],
        'cardonfileType': !exists(json, 'cardonfile_type') ? undefined : json['cardonfile_type'],
        'cvv': !exists(json, 'cvv') ? undefined : json['cvv'],
    };
}

export function PaymentRequestParametersChannelPropertiesToJSON(value?: PaymentRequestParametersChannelProperties | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'success_return_url': value.successReturnUrl,
        'failure_return_url': value.failureReturnUrl,
        'cancel_return_url': value.cancelReturnUrl,
        'pending_return_url': value.pendingReturnUrl,
        'redeem_points': value.redeemPoints,
        'require_auth': value.requireAuth,
        'merchant_id_tag': value.merchantIdTag,
        'cardonfile_type': value.cardonfileType,
        'cvv': value.cvv,
    };
}

