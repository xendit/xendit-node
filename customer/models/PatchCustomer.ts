/* tslint:disable */
/* eslint-disable */
/**
 * NOTE: This file is auto generated by Xendit.
 * Do not edit the class manually.
 * Improvements? Share your ideas at https://github.com/xendit/xendit-node
 */

import { exists, mapValues } from '../../runtime';
import type { AddressRequest } from './AddressRequest';
import {
    AddressRequestFromJSON,
    AddressRequestFromJSONTyped,
    AddressRequestToJSON,
} from './AddressRequest';
import type { BusinessDetail } from './BusinessDetail';
import {
    BusinessDetailFromJSON,
    BusinessDetailFromJSONTyped,
    BusinessDetailToJSON,
} from './BusinessDetail';
import type { EndCustomerStatus } from './EndCustomerStatus';
import {
    EndCustomerStatusFromJSON,
    EndCustomerStatusFromJSONTyped,
    EndCustomerStatusToJSON,
} from './EndCustomerStatus';
import type { IdentityAccountRequest } from './IdentityAccountRequest';
import {
    IdentityAccountRequestFromJSON,
    IdentityAccountRequestFromJSONTyped,
    IdentityAccountRequestToJSON,
} from './IdentityAccountRequest';
import type { IndividualDetail } from './IndividualDetail';
import {
    IndividualDetailFromJSON,
    IndividualDetailFromJSONTyped,
    IndividualDetailToJSON,
} from './IndividualDetail';
import type { KYCDocumentRequest } from './KYCDocumentRequest';
import {
    KYCDocumentRequestFromJSON,
    KYCDocumentRequestFromJSONTyped,
    KYCDocumentRequestToJSON,
} from './KYCDocumentRequest';

/**
 * 
 * @export
 * @interface PatchCustomer
 */
export interface PatchCustomer {
    /**
     * Entity's name for this client
     * @type {string}
     * @memberof PatchCustomer
     */
    clientName?: string | null;
    /**
     * Merchant's reference of this end customer, eg Merchant's user's id. Must be unique.
     * @type {string}
     * @memberof PatchCustomer
     */
    referenceId?: string | null;
    /**
     * 
     * @type {IndividualDetail}
     * @memberof PatchCustomer
     */
    individualDetail?: IndividualDetail | null;
    /**
     * 
     * @type {BusinessDetail}
     * @memberof PatchCustomer
     */
    businessDetail?: BusinessDetail | null;
    /**
     * 
     * @type {string}
     * @memberof PatchCustomer
     */
    description?: string | null;
    /**
     * 
     * @type {string}
     * @memberof PatchCustomer
     */
    email?: string | null;
    /**
     * 
     * @type {string}
     * @memberof PatchCustomer
     */
    mobileNumber?: string | null;
    /**
     * 
     * @type {string}
     * @memberof PatchCustomer
     */
    phoneNumber?: string | null;
    /**
     * 
     * @type {object}
     * @memberof PatchCustomer
     */
    metadata?: object | null;
    /**
     * 
     * @type {Array<AddressRequest>}
     * @memberof PatchCustomer
     */
    addresses?: Array<AddressRequest> | null;
    /**
     * 
     * @type {Array<IdentityAccountRequest>}
     * @memberof PatchCustomer
     */
    identityAccounts?: Array<IdentityAccountRequest> | null;
    /**
     * 
     * @type {Array<KYCDocumentRequest>}
     * @memberof PatchCustomer
     */
    kycDocuments?: Array<KYCDocumentRequest> | null;
    /**
     * 
     * @type {EndCustomerStatus}
     * @memberof PatchCustomer
     */
    status?: EndCustomerStatus | null;
}

/**
 * Check if a given object implements the PatchCustomer interface.
 */
export function instanceOfPatchCustomer(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function PatchCustomerFromJSON(json: any): PatchCustomer {
    return PatchCustomerFromJSONTyped(json, false);
}

export function PatchCustomerFromJSONTyped(json: any, ignoreDiscriminator: boolean): PatchCustomer {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'clientName': !exists(json, 'client_name') ? undefined : json['client_name'],
        'referenceId': !exists(json, 'reference_id') ? undefined : json['reference_id'],
        'individualDetail': !exists(json, 'individual_detail') ? undefined : IndividualDetailFromJSON(json['individual_detail']),
        'businessDetail': !exists(json, 'business_detail') ? undefined : BusinessDetailFromJSON(json['business_detail']),
        'description': !exists(json, 'description') ? undefined : json['description'],
        'email': !exists(json, 'email') ? undefined : json['email'],
        'mobileNumber': !exists(json, 'mobile_number') ? undefined : json['mobile_number'],
        'phoneNumber': !exists(json, 'phone_number') ? undefined : json['phone_number'],
        'metadata': !exists(json, 'metadata') ? undefined : json['metadata'],
        'addresses': !exists(json, 'addresses') ? undefined : (json['addresses'] === null ? null : (json['addresses'] as Array<any>).map(AddressRequestFromJSON)),
        'identityAccounts': !exists(json, 'identity_accounts') ? undefined : (json['identity_accounts'] === null ? null : (json['identity_accounts'] as Array<any>).map(IdentityAccountRequestFromJSON)),
        'kycDocuments': !exists(json, 'kyc_documents') ? undefined : (json['kyc_documents'] === null ? null : (json['kyc_documents'] as Array<any>).map(KYCDocumentRequestFromJSON)),
        'status': !exists(json, 'status') ? undefined : EndCustomerStatusFromJSON(json['status']),
    };
}

export function PatchCustomerToJSON(value?: PatchCustomer | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'client_name': value.clientName,
        'reference_id': value.referenceId,
        'individual_detail': IndividualDetailToJSON(value.individualDetail),
        'business_detail': BusinessDetailToJSON(value.businessDetail),
        'description': value.description,
        'email': value.email,
        'mobile_number': value.mobileNumber,
        'phone_number': value.phoneNumber,
        'metadata': value.metadata,
        'addresses': value.addresses === undefined ? undefined : (value.addresses === null ? null : (value.addresses as Array<any>).map(AddressRequestToJSON)),
        'identity_accounts': value.identityAccounts === undefined ? undefined : (value.identityAccounts === null ? null : (value.identityAccounts as Array<any>).map(IdentityAccountRequestToJSON)),
        'kyc_documents': value.kycDocuments === undefined ? undefined : (value.kycDocuments === null ? null : (value.kycDocuments as Array<any>).map(KYCDocumentRequestToJSON)),
        'status': EndCustomerStatusToJSON(value.status),
    };
}

