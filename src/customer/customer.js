const { promWithJsErr, fetchWithHTTPErr, Auth, Validate } = require('../utils');

const CUSTOMER_PATH = '';

function Customer(options) {
  let aggOpts = options;
  if (
    Customer._injectedOpts &&
    Object.keys(Customer._injectedOpts).length > 0
  ) {
    aggOpts = Object.assign({}, options, Customer._injectedOpts);
  }

  this.opts = aggOpts;
  this.API_ENDPOINT = this.opts.xenditURL + CUSTOMER_PATH;
}

Customer._injectedOpts = {};
Customer._constructorWithInjectedXenditOpts = function(options) {
  Customer._injectedOpts = options;
  return Customer;
};

Customer.prototype.createCustomer = function(data) {
  return promWithJsErr((resolve, reject) => {
    const compulsoryFields = populateCompulsaryFields(data, apiVersion);
    Validate.rejectOnMissingFields(compulsoryFields, data, reject);

    fetchWithHTTPErr(`${this.API_ENDPOINT}/customers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: Auth.basicAuthHeader(this.opts.secretKey),
        'API-VERSION': data.apiVersion ? data.apiVersion : '',
      },
      body: transformCustomerObjectBody(data, apiVersion),
    })
      .then(resolve)
      .catch(reject);
  });
};

Customer.prototype.getCustomer = function(data) {
  return promWithJsErr((resolve, reject) => {
    Validate.rejectOnMissingFields(['id'], data, reject);

    fetchWithHTTPErr(`${this.API_ENDPOINT}/customers/${data.id}`, {
      method: 'GET',
      headers: {
        Authorization: Auth.basicAuthHeader(this.opts.secretKey),
        'API-VERSION': data.apiVersion ? data.apiVersion : '',
      },
    })
      .then(resolve)
      .catch(reject);
  });
};

Customer.prototype.getCustomerByReferenceID = function(data) {
  return promWithJsErr((resolve, reject) => {
    Validate.rejectOnMissingFields(['referenceID'], data, reject);

    fetchWithHTTPErr(
      `${this.API_ENDPOINT}/customers?reference_id=${data.referenceID}`,
      {
        method: 'GET',
        headers: {
          Authorization: Auth.basicAuthHeader(this.opts.secretKey),
          'API-VERSION': data.apiVersion ? data.apiVersion : '',
        },
      },
    )
      .then(resolve)
      .catch(reject);
  });
};

Customer.prototype.updateCustomer = function(data) {
  return promWithJsErr((resolve, reject) => {
    fetchWithHTTPErr(`${this.API_ENDPOINT}/customers/${data.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: Auth.basicAuthHeader(this.opts.secretKey),
        'API-VERSION': data.apiVersion ? data.apiVersion : '',
      },
      body: JSON.stringify({
        reference_id: data.referenceID,
        mobile_number: data.mobileNumber,
        given_names: data.givenNames,
        middle_name: data.middleName,
        surname: data.surname,
        description: data.description,
        phone_number: data.phoneNumber,
        nationality: data.nationality,
        addresses: data.addresses
          ? data.addresses.map(address => ({
              country: address.country,
              street_line1: address.streetLine1,
              street_line2: address.streetLine2,
              city: address.city,
              province: address.province,
              state: address.state,
              postal_code: address.postalCode,
            }))
          : [],
        date_of_birth: data.dateOfBirth,
        metadata: data.metadata,
      }),
    })
      .then(resolve)
      .catch(reject);
  });
};

function transformCustomerObjectBody(data, apiVersion) {
  switch (apiVersion) {
    case '2020-10-31':
      return JSON.stringify({
        reference_id: data.referenceID,
        type: data.type,
        individual_detail: data.individualDetail,
        business_detail: data.businessDetail,
        mobile_number: data.mobileNumber,
        phone_number: data.phoneNumber,
        hashed_phone_number: data.hashedPhoneNumber,
        email: data.email,
        addresses: data.addresses
          ? data.addresses.map(address => ({
              country: address.country,
              street_line1: address.streetLine1,
              street_line2: address.streetLine2,
              city: address.city,
              province: address.province,
              state: address.state,
              postal_code: address.postalCode,
            }))
          : [],
        identity_accounts: data.identityAccounts
          ? data.identity_accounts.map(identity_account => ({
              type: identity_account.type,
              company: identity_account.company,
              description: identity_account.description,
              country: identity_account.country,
              properties: identity_account.properties,
            }))
          : [],
        kyc_documents: data.kycDocuments,
        description: data.description,
        date_of_registration: data.dateOfRegistration,
        domicile_of_registration: data.domicileOfRegistration,
        entity: data.entity,
        client: data.client,
        client_name: data.clientName,
        metadata: data.metadata,
      });
    case '2020-05-19':
    default:
      return JSON.stringify({
        reference_id: data.referenceID,
        mobile_number: data.mobileNumber,
        email: data.email,
        given_names: data.givenNames,
        middle_name: data.middleName,
        surname: data.surname,
        description: data.description,
        phone_number: data.phoneNumber,
        nationality: data.nationality,
        addresses: data.addresses
          ? data.addresses.map(address => ({
              country: address.country,
              street_line1: address.streetLine1,
              street_line2: address.streetLine2,
              city: address.city,
              province: address.province,
              state: address.state,
              postal_code: address.postalCode,
            }))
          : [],
        date_of_birth: data.dateOfBirth,
        metadata: data.metadata,
      });
  }
}

function populateCompulsaryFields(data, apiVersion) {
  let compulsoryFields;
  switch (apiVersion) {
    case '2020-10-31':
      compulsoryFields = ['referenceID', 'type'];

      return compulsoryFields;
    case '2020-05-19':
    default:
      compulsoryFields = ['referenceID', 'givenNames'];
      if (!data.mobileNumber) {
        compulsoryFields.push('email');
      }
      if (!data.email) {
        compulsoryFields.push('mobileNumber');
      }

      return compulsoryFields;
  }
}

module.exports = Customer;
