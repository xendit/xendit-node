/* tslint:disable */
/* eslint-disable */
/**
 * NOTE: This file is auto generated by Xendit.
 * Do not edit the class manually.
 * Improvements? Share your ideas at https://github.com/xendit/xendit-node
 */

import { exists, mapValues } from '../../runtime';
import type { AddressObject } from './AddressObject';
import {
    AddressObjectFromJSON,
    AddressObjectFromJSONTyped,
    AddressObjectToJSON,
} from './AddressObject';

/**
 * An object representing a customer with various properties, including addresses.
 * @export
 * @interface CustomerObject
 */
export interface CustomerObject {
    /**
     * The unique identifier for the customer.
     * @type {string}
     * @memberof CustomerObject
     */
    id?: string | null;
    /**
     * The customer's phone number.
     * @type {string}
     * @memberof CustomerObject
     */
    phoneNumber?: string | null;
    /**
     * The customer's given names or first names.
     * @type {string}
     * @memberof CustomerObject
     */
    givenNames?: string | null;
    /**
     * The customer's surname or last name.
     * @type {string}
     * @memberof CustomerObject
     */
    surname?: string | null;
    /**
     * The customer's email address.
     * @type {string}
     * @memberof CustomerObject
     */
    email?: string | null;
    /**
     * The customer's mobile phone number.
     * @type {string}
     * @memberof CustomerObject
     */
    mobileNumber?: string | null;
    /**
     * An additional identifier for the customer.
     * @type {string}
     * @memberof CustomerObject
     */
    customerId?: string | null;
    /**
     * An array of addresses associated with the customer.
     * @type {Array<AddressObject>}
     * @memberof CustomerObject
     */
    addresses?: Array<AddressObject> | null;
}

/**
 * Check if a given object implements the CustomerObject interface.
 */
export function instanceOfCustomerObject(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function CustomerObjectFromJSON(json: any): CustomerObject {
    return CustomerObjectFromJSONTyped(json, false);
}

export function CustomerObjectFromJSONTyped(json: any, ignoreDiscriminator: boolean): CustomerObject {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'phoneNumber': !exists(json, 'phone_number') ? undefined : json['phone_number'],
        'givenNames': !exists(json, 'given_names') ? undefined : json['given_names'],
        'surname': !exists(json, 'surname') ? undefined : json['surname'],
        'email': !exists(json, 'email') ? undefined : json['email'],
        'mobileNumber': !exists(json, 'mobile_number') ? undefined : json['mobile_number'],
        'customerId': !exists(json, 'customer_id') ? undefined : json['customer_id'],
        'addresses': !exists(json, 'addresses') ? undefined : (json['addresses'] === null ? null : (json['addresses'] as Array<any>).map(AddressObjectFromJSON)),
    };
}

export function CustomerObjectToJSON(value?: CustomerObject | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'phone_number': value.phoneNumber,
        'given_names': value.givenNames,
        'surname': value.surname,
        'email': value.email,
        'mobile_number': value.mobileNumber,
        'customer_id': value.customerId,
        'addresses': value.addresses === undefined ? undefined : (value.addresses === null ? null : (value.addresses as Array<any>).map(AddressObjectToJSON)),
    };
}

