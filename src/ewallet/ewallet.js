const {
  promWithJsErr,
  Auth,
  Validate,
  fetchWithHTTPErr,
  queryStringWithoutUndefined,
} = require('../utils');
const errors = require('../errors');

const EWALLET_PATH = '/ewallets';
const CHARGES_PATH = '/charges';

function EWallet(options) {
  let aggOpts = options;
  if (EWallet._injectedOpts && Object.keys(EWallet._injectedOpts).length > 0) {
    aggOpts = Object.assign({}, options, EWallet._injectedOpts);
  }

  this.opts = aggOpts;
  this.API_ENDPOINT = this.opts.xenditURL + EWALLET_PATH;
  this.API_CHARGES_ENDPOINT = this.opts.xenditURL + EWALLET_PATH + CHARGES_PATH;
}

EWallet._injectedOpts = {};
EWallet._constructorWithInjectedXenditOpts = function(options) {
  EWallet._injectedOpts = options;
  return EWallet;
};
EWallet.Type = {
  OVO: 'OVO',
  Dana: 'DANA',
  LinkAja: 'LINKAJA',
};
EWallet.ChargeType = {
  IdShopeePay: 'ID_SHOPEEPAY',
};

EWallet.prototype.createPayment = function(data) {
  return promWithJsErr((resolve, reject) => {
    let compulsoryFields = ['ewalletType'];

    if (data.ewalletType) {
      switch (data.ewalletType) {
        case EWallet.Type.OVO:
          compulsoryFields = ['externalID', 'amount', 'phone', 'ewalletType'];
          break;
        case EWallet.Type.Dana:
          compulsoryFields = [
            'externalID',
            'amount',
            'callbackURL',
            'redirectURL',
            'ewalletType',
          ];
          break;
        case EWallet.Type.LinkAja:
          compulsoryFields = [
            'externalID',
            'phone',
            'amount',
            'items',
            'callbackURL',
            'redirectURL',
            'ewalletType',
          ];
          break;
        default:
          reject({
            status: 400,
            code: errors.API_VALIDATION_ERROR,
            message: 'Invalid EWallet Type',
          });
      }
    }

    Validate.rejectOnMissingFields(compulsoryFields, data, reject);

    const headers = {
      'Content-Type': 'application/json',
      Authorization: Auth.basicAuthHeader(this.opts.secretKey),
    };
    if (data.xApiVersion) {
      headers['X-API-VERSION'] = data.xApiVersion;
    }

    fetchWithHTTPErr(this.API_ENDPOINT, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        external_id: data.externalID,
        amount: data.amount,
        phone: data.phone,
        expiration_date: data.expirationDate
          ? data.expirationDate.toISOString()
          : undefined,
        callback_url: data.callbackURL,
        redirect_url: data.redirectURL,
        items: data.items,
        ewallet_type: data.ewalletType,
      }),
    })
      .then(resolve)
      .catch(reject);
  });
};

EWallet.prototype.getPayment = function(data) {
  return promWithJsErr((resolve, reject) => {
    Validate.rejectOnMissingFields(['externalID', 'ewalletType'], data, reject);

    const queryStr = data
      ? queryStringWithoutUndefined({
          external_id: data.externalID,
          ewallet_type: data.ewalletType,
        })
      : '';

    fetchWithHTTPErr(`${this.API_ENDPOINT}?${queryStr}`, {
      method: 'GET',
      headers: {
        Authorization: Auth.basicAuthHeader(this.opts.secretKey),
      },
    })
      .then(resolve)
      .catch(reject);
  });
};

EWallet.prototype.createCharges = function(data) {
  return promWithJsErr((resolve, reject) => {
    let compulsoryFields = ['channelCode'];

    if (data.channelCode) {
      switch (data.channelCode) {
        case EWallet.ChargeType.IdShopeePay:
          compulsoryFields = [
            'referenceID',
            'currency',
            'amount',
            'checkoutMethod',
            'channelCode',
          ];
          break;
        default:
          reject({
            status: 400,
            code: errors.API_VALIDATION_ERROR,
            message: 'Invalid EWallet Type',
          });
      }
    }

    Validate.rejectOnMissingFields(compulsoryFields, data, reject);

    const headers = {
      'Content-Type': 'application/json',
      Authorization: Auth.basicAuthHeader(this.opts.secretKey),
    };
    if (data.callbackURL) {
      headers['callback-url'] = data.callbackURL;
    }

    fetchWithHTTPErr(this.API_CHARGES_ENDPOINT, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        reference_id: data.referenceID,
        currency: data.currency,
        amount: data.amount,
        checkout_method: data.checkoutMethod,
        channel_code: data.channelCode,
        channel_properties: data.channelProperties,
        customer_id: data.customerID,
        basket: data.basket,
        metadata: data.metadata,
      }),
    })
      .then(resolve)
      .catch(reject);
  });
};

EWallet.prototype.getCharges = function(data) {
  return promWithJsErr((resolve, reject) => {
    Validate.rejectOnMissingFields(['chargeID'], data, reject);

    const chargeID = data.chargeID;

    fetchWithHTTPErr(`${this.API_CHARGES_ENDPOINT}/${chargeID}`, {
      method: 'GET',
      headers: {
        Authorization: Auth.basicAuthHeader(this.opts.secretKey),
      },
    })
      .then(resolve)
      .catch(reject);
  });
};

module.exports = EWallet;
