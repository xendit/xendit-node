/* tslint:disable */
/* eslint-disable */
/**
 * NOTE: This file is auto generated by Xendit.
 * Do not edit the class manually.
 * Improvements? Share your ideas at https://github.com/xendit/xendit-node
 */


/**
 * 
 * @export
 */
export const PaymentMethodStatus = {
    Active: 'ACTIVE',
    Inactive: 'INACTIVE',
    Pending: 'PENDING',
    Expired: 'EXPIRED',
    Failed: 'FAILED',
    XenditEnumDefaultFallback: "UNKNOWN_ENUM_VALUE"
} as const;
export type PaymentMethodStatus = typeof PaymentMethodStatus[keyof typeof PaymentMethodStatus];


export function PaymentMethodStatusFromJSON(json: any): PaymentMethodStatus {
    return PaymentMethodStatusFromJSONTyped(json, false);
}

export function PaymentMethodStatusFromJSONTyped(json: any, ignoreDiscriminator: boolean): PaymentMethodStatus {
    if (json !== "" || json !== null) {
        const key = Object.keys(PaymentMethodStatus)[Object.values(PaymentMethodStatus).indexOf(json)]
        return PaymentMethodStatus[key] === undefined ?
            PaymentMethodStatus['XenditEnumDefaultFallback'] : PaymentMethodStatus[key]
    }
    return json as PaymentMethodStatus;
}

export function PaymentMethodStatusToJSON(value?: PaymentMethodStatus | null): any {
    return value as any;
}

