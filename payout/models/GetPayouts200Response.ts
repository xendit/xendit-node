/* tslint:disable */
/* eslint-disable */
/**
 * NOTE: This file is auto generated by Xendit.
 * Do not edit the class manually.
 * Improvements? Share your ideas at https://github.com/xendit/xendit-node
 */

import { exists, mapValues } from '../../runtime';
import type { GetPayouts200ResponseDataInner } from './GetPayouts200ResponseDataInner';
import {
    GetPayouts200ResponseDataInnerFromJSON,
    GetPayouts200ResponseDataInnerFromJSONTyped,
    GetPayouts200ResponseDataInnerToJSON,
} from './GetPayouts200ResponseDataInner';
import type { GetPayouts200ResponseLinks } from './GetPayouts200ResponseLinks';
import {
    GetPayouts200ResponseLinksFromJSON,
    GetPayouts200ResponseLinksFromJSONTyped,
    GetPayouts200ResponseLinksToJSON,
} from './GetPayouts200ResponseLinks';

/**
 * 
 * @export
 * @interface GetPayouts200Response
 */
export interface GetPayouts200Response {
    /**
     * 
     * @type {Array<GetPayouts200ResponseDataInner>}
     * @memberof GetPayouts200Response
     */
    data?: Array<GetPayouts200ResponseDataInner>;
    /**
     * 
     * @type {boolean}
     * @memberof GetPayouts200Response
     */
    hasMore?: boolean;
    /**
     * 
     * @type {GetPayouts200ResponseLinks}
     * @memberof GetPayouts200Response
     */
    links?: GetPayouts200ResponseLinks;
}

/**
 * Check if a given object implements the GetPayouts200Response interface.
 */
export function instanceOfGetPayouts200Response(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function GetPayouts200ResponseFromJSON(json: any): GetPayouts200Response {
    return GetPayouts200ResponseFromJSONTyped(json, false);
}

export function GetPayouts200ResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): GetPayouts200Response {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'data': !exists(json, 'data') ? undefined : ((json['data'] as Array<any>).map(GetPayouts200ResponseDataInnerFromJSON)),
        'hasMore': !exists(json, 'has_more') ? undefined : json['has_more'],
        'links': !exists(json, 'links') ? undefined : GetPayouts200ResponseLinksFromJSON(json['links']),
    };
}

export function GetPayouts200ResponseToJSON(value?: GetPayouts200Response | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'data': value.data === undefined ? undefined : ((value.data as Array<any>).map(GetPayouts200ResponseDataInnerToJSON)),
        'has_more': value.hasMore,
        'links': GetPayouts200ResponseLinksToJSON(value.links),
    };
}

