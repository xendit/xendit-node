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
 * @interface DateRangeFilter
 */
export interface DateRangeFilter {
    /**
     * Start time of transaction. If not specified will list all dates.
     * @type {Date}
     * @memberof DateRangeFilter
     */
    gte?: Date;
    /**
     * End time of transaction. If not specified will list all dates.
     * @type {Date}
     * @memberof DateRangeFilter
     */
    lte?: Date;
}

/**
 * Check if a given object implements the DateRangeFilter interface.
 */
export function instanceOfDateRangeFilter(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function DateRangeFilterFromJSON(json: any): DateRangeFilter {
    return DateRangeFilterFromJSONTyped(json, false);
}

export function DateRangeFilterFromJSONTyped(json: any, ignoreDiscriminator: boolean): DateRangeFilter {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'gte': !exists(json, 'gte') ? undefined : (new Date(json['gte'])),
        'lte': !exists(json, 'lte') ? undefined : (new Date(json['lte'])),
    };
}

export function DateRangeFilterToJSON(value?: DateRangeFilter | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'gte': value.gte === undefined ? undefined : (value.gte.toISOString()),
        'lte': value.lte === undefined ? undefined : (value.lte.toISOString()),
    };
}

