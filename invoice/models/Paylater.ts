/* tslint:disable */
/* eslint-disable */
/**
 * NOTE: This file is auto generated by Xendit.
 * Do not edit the class manually.
 * Improvements? Share your ideas at https://github.com/xendit/xendit-node
 */

import { exists, mapValues } from '../../runtime';
import type { PaylaterType } from './PaylaterType';
import {
    PaylaterTypeFromJSON,
    PaylaterTypeFromJSONTyped,
    PaylaterTypeToJSON,
} from './PaylaterType';

/**
 * An object representing paylater details for invoices.
 * @export
 * @interface Paylater
 */
export interface Paylater {
    /**
     * 
     * @type {PaylaterType}
     * @memberof Paylater
     */
    paylaterType: PaylaterType;
    /**
     * Indicates whether this paylater option should be excluded.
     * @type {boolean}
     * @memberof Paylater
     */
    shouldExclude?: boolean;
}

/**
 * Check if a given object implements the Paylater interface.
 */
export function instanceOfPaylater(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "paylaterType" in value;

    return isInstance;
}

export function PaylaterFromJSON(json: any): Paylater {
    return PaylaterFromJSONTyped(json, false);
}

export function PaylaterFromJSONTyped(json: any, ignoreDiscriminator: boolean): Paylater {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'paylaterType': PaylaterTypeFromJSON(json['paylater_type']),
        'shouldExclude': !exists(json, 'should_exclude') ? undefined : json['should_exclude'],
    };
}

export function PaylaterToJSON(value?: Paylater | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'paylater_type': PaylaterTypeToJSON(value.paylaterType),
        'should_exclude': value.shouldExclude,
    };
}

