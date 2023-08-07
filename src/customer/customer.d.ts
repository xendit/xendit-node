import { XenditOptions } from '../xendit_opts';

interface Address {
  country: string;
  streetLine1?: string;
  streetLine2?: string;
  city?: string;
  province?: string;
  state?: string;
  postalCode?: string;
}

interface IdentityAccount {
  type: string;
  company?: string;
  description?: string;
  country?: string;
  properties?: object;
}

interface BusinessDetail {
  businessName: string;
  businessType?: string;
  natureOfBusiness?: string;
  businessDomicile?: string;
  dateOfRegistration?: string;
  tradingName?: string;
}

interface Employment {
  employerName?: string;
  natureOfBusiness?: string;
  roleDescription?: string;
}

interface IndividualDetail {
  givenNames: string;
  givenNamesNonRoman?: string;
  surname?: string;
  surnameNonRoman?: string;
  nationality?: string;
  placeOfBirth?: string;
  dateOfBirth?: Date;
  gender?: string;
  employment?: Employment;
}

interface KYCDocument {
  country: string;
  type: string;
  subType?: string;
  documentName?: string;
  documentNumber?: string;
  expiresAt?: Date;
  holderName?: string;
  documentImages?: string[];
}

export = class Customer {
  constructor({});
  static _constructorWithInjectedXenditOpts: (
    opts: XenditOptions,
  ) => typeof Customer;
  createCustomer(data: {
    referenceID: string;
    mobileNumber?: string;
    email?: string;
    givenNames?: string;
    middleName?: string;
    surname?: string;
    description?: string;
    phoneNumber?: string;
    nationality?: string;
    addresses?: Address[];
    dateOfBirth?: string;
    metadata?: object;
    apiVersion?: string;
    type?: string;
    individualDetail?: IndividualDetail;
    businessDetail?: BusinessDetail;
    phoneNumber?: string;
    hashedPhoneNumber?: string;
    identityAccounts?: IdentityAccount[];
    kycDocuments?: KYCDocument[];
    description?: string;
    dateOfRegistration?: Date;
    domicileOfRegistration?: string;
    entity?: string;
    client?: string;
    clientName?: string;
    metadata?: object;
  }): Promise<object>;
  getCustomer(data: { id: string; apiVersion?: string }): Promise<object>;
  getCustomerByReferenceID(data: {
    referenceID: string;
    apiVersion?: string;
  }): Promise<object>;
  updateCustomer(data: {
    id: string;
    referenceID?: string;
    givenNames?: string;
    mobileNumber?: string;
    addresses?: Address[];
    description?: string;
    middleName?: string;
    surname?: string;
    phoneNumber?: string;
    nationality?: string;
    dateOfBirth?: string;
    metadata?: object;
    apiVersion?: string;
    type?: string;
    individualDetail?: IndividualDetail;
    businessDetail?: BusinessDetail;
    phoneNumber?: string;
    hashedPhoneNumber?: string;
    identityAccounts?: IdentityAccount[];
    kycDocuments?: KYCDocument[];
    description?: string;
    dateOfRegistration?: Date;
    domicileOfRegistration?: string;
    entity?: string;
    client?: string;
    clientName?: string;
  }): Promise<object>;
};
