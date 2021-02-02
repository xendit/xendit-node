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

export = class Customer {
  constructor({});
  static _constructorWithInjectedXenditOpts: (
    opts: XenditOptions,
  ) => typeof Customer;
  createCustomer(data: {
    referenceID: string;
    mobileNumber?: string;
    email?: string;
    givenNames: string;
    middleName?: string;
    surname?: string;
    description?: string;
    phoneNumber?: string;
    nationality?: string;
    addresses?: Address[];
    dateOfBirth?: string;
    metadata?: object;
  }): Promise<object>;
  getCustomer(data: { id: string }): Promise<object>;
  getCustomerByReferenceID(data: { referenceID: string }): Promise<object>;
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
  }): Promise<object>;
};
