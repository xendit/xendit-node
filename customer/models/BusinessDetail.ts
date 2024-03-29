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
 * @interface BusinessDetail
 */
export interface BusinessDetail {
    /**
     * 
     * @type {string}
     * @memberof BusinessDetail
     */
    businessName?: string;
    /**
     * 
     * @type {string}
     * @memberof BusinessDetail
     */
    businessType?: BusinessDetailBusinessTypeEnum;
    /**
     * 
     * @type {string}
     * @memberof BusinessDetail
     */
    dateOfRegistration?: string | null;
    /**
     * 
     * @type {string}
     * @memberof BusinessDetail
     */
    natureOfBusiness?: string | null;
    /**
     * ISO3166-2 country code
     * @type {string}
     * @memberof BusinessDetail
     */
    businessDomicile?: string | null;
}


/**
 * @export
 */
export const BusinessDetailBusinessTypeEnum = {
    Corporation: 'CORPORATION',
    SoleProprietor: 'SOLE_PROPRIETOR',
    Partnership: 'PARTNERSHIP',
    Cooperative: 'COOPERATIVE',
    Trust: 'TRUST',
    NonProfit: 'NON_PROFIT',
    Government: 'GOVERNMENT'
} as const;
export type BusinessDetailBusinessTypeEnum = typeof BusinessDetailBusinessTypeEnum[keyof typeof BusinessDetailBusinessTypeEnum];


/**
 * Check if a given object implements the BusinessDetail interface.
 */
export function instanceOfBusinessDetail(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function BusinessDetailFromJSON(json: any): BusinessDetail {
    return BusinessDetailFromJSONTyped(json, false);
}

export function BusinessDetailFromJSONTyped(json: any, ignoreDiscriminator: boolean): BusinessDetail {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'businessName': !exists(json, 'business_name') ? undefined : json['business_name'],
        'businessType': !exists(json, 'business_type') ? undefined : json['business_type'],
        'dateOfRegistration': !exists(json, 'date_of_registration') ? undefined : json['date_of_registration'],
        'natureOfBusiness': !exists(json, 'nature_of_business') ? undefined : json['nature_of_business'],
        'businessDomicile': !exists(json, 'business_domicile') ? undefined : json['business_domicile'],
    };
}

export function BusinessDetailToJSON(value?: BusinessDetail | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'business_name': value.businessName,
        'business_type': value.businessType,
        'date_of_registration': value.dateOfRegistration,
        'nature_of_business': value.natureOfBusiness,
        'business_domicile': value.businessDomicile,
    };
}

