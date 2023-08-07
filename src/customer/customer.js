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
    const apiVersion = data.apiVersion ? data.apiVersion : '';
    const compulsoryFields = populateCompulsaryFields(data, apiVersion);
    Validate.rejectOnMissingFields(compulsoryFields, data, reject);

    fetchWithHTTPErr(`${this.API_ENDPOINT}/customers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: Auth.basicAuthHeader(this.opts.secretKey),
        'API-VERSION': apiVersion,
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
  const apiVersion = data.apiVersion ? data.apiVersion : '';
  return promWithJsErr((resolve, reject) => {
    fetchWithHTTPErr(`${this.API_ENDPOINT}/customers/${data.id}`, {
      method: 'PATCH',
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

function transformCustomerObjectBody(data, apiVersion) {
  switch (apiVersion) {
    case '2020-10-31':
      return JSON.stringify({
        reference_id: data.referenceID,
        type: data.type,
        individual_detail: data.individualDetail
          ? {
              given_names: data.individualDetail.givenNames,
              surname: data.individualDetail.surname,
              nationality: data.individualDetail.nationality,
              place_of_birth: data.individualDetail.placeOfBirth,
              date_of_birth: data.individualDetail.dateOfBirth,
              gender: data.individualDetail.gender,
              employment: data.individualDetail.employment
                ? {
                    employer_name:
                      data.individualDetail.employment.employerName,
                    nature_of_business:
                      data.individualDetail.employment.natureOfBusiness,
                    role_description:
                      data.individualDetail.employment.roleDescription,
                  }
                : undefined,
            }
          : undefined,
        business_detail: data.businessDetail
          ? {
              business_name: data.businessDetail.businessName,
              trading_name: data.businessDetail.tradingName,
              business_type: data.businessDetail.businessType,
              nature_of_business: data.businessDetail.natureOfBusiness,
              business_domicile: data.businessDetail.businessDomicile,
              date_of_registration: data.businessDetail.dateOfRegistration,
            }
          : undefined,
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
          : undefined,
        identity_accounts: data.identityAccounts
          ? data.identityAccounts.map(identity_account => ({
              type: identity_account.type,
              company: identity_account.company,
              description: identity_account.description,
              country: identity_account.country,
              properties: identity_account.properties,
            }))
          : undefined,
        kyc_documents: data.kycDocuments
          ? data.kycDocuments.map(kycDocument => ({
              country: kycDocument.country,
              type: kycDocument.type,
              sub_type: kycDocument.subType,
              document_name: kycDocument.documentName,
              document_number: kycDocument.documentNumber,
              expires_at: kycDocument.expiresAt,
              holder_name: kycDocument.holderName,
              document_images: kycDocument.documentImages,
            }))
          : undefined,
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
