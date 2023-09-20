/* tslint:disable */
/* eslint-disable */
/**
 * NOTE: This file is auto generated by Xendit.
 * Do not edit the class manually.
 * Improvements? Share your ideas at https://github.com/xendit/xendit-node
 */

import { exists, mapValues } from '../../runtime';
/**
 * An error object used to indicate that the requested resource, in this case, an invoice, was not found.
 * @export
 * @interface InvoiceError404ResponseDefinition
 */
export interface InvoiceError404ResponseDefinition {
    /**
     * The specific error code indicating that the requested invoice was not found.
     * @type {string}
     * @memberof InvoiceError404ResponseDefinition
     */
    errorCode: InvoiceError404ResponseDefinitionErrorCodeEnum;
    /**
     * A human-readable error message providing additional context about the resource not being found.
     * @type {string}
     * @memberof InvoiceError404ResponseDefinition
     */
    message: string;
}


/**
 * @export
 */
export const InvoiceError404ResponseDefinitionErrorCodeEnum = {
    InvoiceNotFoundError: 'INVOICE_NOT_FOUND_ERROR'
} as const;
export type InvoiceError404ResponseDefinitionErrorCodeEnum = typeof InvoiceError404ResponseDefinitionErrorCodeEnum[keyof typeof InvoiceError404ResponseDefinitionErrorCodeEnum];


/**
 * Check if a given object implements the InvoiceError404ResponseDefinition interface.
 */
export function instanceOfInvoiceError404ResponseDefinition(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "errorCode" in value;
    isInstance = isInstance && "message" in value;

    return isInstance;
}

export function InvoiceError404ResponseDefinitionFromJSON(json: any): InvoiceError404ResponseDefinition {
    return InvoiceError404ResponseDefinitionFromJSONTyped(json, false);
}

export function InvoiceError404ResponseDefinitionFromJSONTyped(json: any, ignoreDiscriminator: boolean): InvoiceError404ResponseDefinition {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'errorCode': json['error_code'],
        'message': json['message'],
    };
}

export function InvoiceError404ResponseDefinitionToJSON(value?: InvoiceError404ResponseDefinition | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'error_code': value.errorCode,
        'message': value.message,
    };
}
