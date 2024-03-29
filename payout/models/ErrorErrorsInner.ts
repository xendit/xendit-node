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
 * @interface ErrorErrorsInner
 */
export interface ErrorErrorsInner {
    /**
     * Precise location of the error
     * @type {string}
     * @memberof ErrorErrorsInner
     */
    path: string;
    /**
     * Specific description of the error
     * @type {string}
     * @memberof ErrorErrorsInner
     */
    message: string;
}

/**
 * Check if a given object implements the ErrorErrorsInner interface.
 */
export function instanceOfErrorErrorsInner(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "path" in value;
    isInstance = isInstance && "message" in value;

    return isInstance;
}

export function ErrorErrorsInnerFromJSON(json: any): ErrorErrorsInner {
    return ErrorErrorsInnerFromJSONTyped(json, false);
}

export function ErrorErrorsInnerFromJSONTyped(json: any, ignoreDiscriminator: boolean): ErrorErrorsInner {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'path': json['path'],
        'message': json['message'],
    };
}

export function ErrorErrorsInnerToJSON(value?: ErrorErrorsInner | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'path': value.path,
        'message': value.message,
    };
}

