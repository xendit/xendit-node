const {
  promWithJsErr,
  Auth,
  Validate,
  fetchWithHTTPErr,
  queryStringWithoutUndefined,
} = require('../utils');
const errors = require('../errors');

const EWALLET_PATH = '/ewallets';

function EWallet(options) {
  let aggOpts = options;
  if (EWallet._injectedOpts && Object.keys(EWallet._injectedOpts).length > 0) {
    aggOpts = Object.assign({}, options, EWallet._injectedOpts);
  }

  this.opts = aggOpts;
  this.API_ENDPOINT = this.opts.xenditURL + EWALLET_PATH;
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

EWallet.prototype.createEWalletCharge = function(data) {
  return promWithJsErr((resolve, reject) => {
    let compulsoryFields = [
      'referenceID',
      'currency',
      'amount',
      'checkoutMethod',
    ];
    Validate.rejectOnMissingFields(compulsoryFields, data, reject);

    let headers = {
      Authorization: Auth.basicAuthHeader(this.opts.secretKey),
      'Content-Type': 'application/json',
    };

    if (data.forUserID) {
      headers['for-user-id'] = data.forUserID;
    }

    if (data.withFeeRule) {
      headers['with-fee-rule'] = data.withFeeRule;
    }

    fetchWithHTTPErr(`${this.API_ENDPOINT}/charges`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        reference_id: data.referenceID,
        currency: data.currency,
        amount: data.amount,
        checkout_method: data.checkoutMethod,
        channel_code: data.channelCode,
        channel_properties: data.channelProperties
          ? {
              mobile_number: data.channelProperties.mobileNumber,
              success_redirect_url: data.channelProperties.successRedirectURL,
              failure_redirect_url: data.channelProperties.failureRedirectURL,
              cancel_redirect_url: data.channelProperties.cancelRedirectURL,
              redeem_points: data.channelProperties.redeemPoints,
            }
          : data.channelProperties,
        payment_method_id: data.paymentMethodId,
        customer_id: data.customerID,
        basket: data.basket
          ? data.basket.map(product => ({
              reference_id: product.referenceID,
              name: product.name,
              category: product.category,
              currency: product.currency,
              price: product.price,
              quantity: product.quantity,
              type: product.type,
              url: product.url,
              description: product.description,
              sub_category: product.subCategory,
              metadata: product.metadata,
            }))
          : null,
        metadata: data.metadata,
      }),
    })
      .then(resolve)
      .catch(reject);
  });
};

EWallet.prototype.getEWalletChargeStatus = function(data) {
  return promWithJsErr((resolve, reject) => {
    Validate.rejectOnMissingFields(['chargeID'], data, reject);

    let headers = {
      Authorization: Auth.basicAuthHeader(this.opts.secretKey),
    };

    if (data.forUserID) {
      headers['for-user-id'] = data.forUserID;
    }

    fetchWithHTTPErr(`${this.API_ENDPOINT}/charges/${data.chargeID}`, {
      method: 'GET',
      headers: headers,
    })
      .then(resolve)
      .catch(reject);
  });
};

EWallet.prototype.voidEWalletCharge = function(data) {
  return promWithJsErr((resolve, reject) => {
    Validate.rejectOnMissingFields(['chargeID'], data, reject);

    let headers = {
      Authorization: Auth.basicAuthHeader(this.opts.secretKey),
      'Content-Type': 'application/json',
    };

    if (data.forUserID) {
      headers['for-user-id'] = data.forUserID;
    }

    fetchWithHTTPErr(`${this.API_ENDPOINT}/charges/${data.chargeID}/void`, {
      method: 'POST',
      headers: headers,
    })
      .then(resolve)
      .catch(reject);
  });
};

module.exports = EWallet;
