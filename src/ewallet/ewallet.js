const {
  promWithJsErr,
  Auth,
  Validate,
  fetchWithHTTPErr,
  queryStringWithoutUndefined,
} = require('../utils');

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
EWallet.EWalletType = {
  OVO: 'OVO',
  Dana: 'DANA',
  LinkAja: 'LINKAJA',
};

EWallet.prototype.createPayment = function(data) {
  return promWithJsErr((resolve, reject) => {
    let compulsoryFields = ['ewalletType'];

    if (data.ewalletType) {
      switch (data.ewalletType) {
        case 'OVO':
          compulsoryFields = ['externalID', 'amount', 'ewalletType'];
          break;
        case 'DANA':
          compulsoryFields = [
            'externalID',
            'amount',
            'callbackURL',
            'redirectURL',
            'ewalletType',
          ];
          break;
        case 'LINKAJA':
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
      }
    }

    Validate.rejectOnMissingFields(compulsoryFields, data, reject);

    fetchWithHTTPErr(this.API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: Auth.basicAuthHeader(this.opts.secretKey),
      },
      body: JSON.stringify({
        external_id: data.externalID,
        amount: data.amount,
        phone: data.phone,
        expiration_date: data.expirationDate,
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

module.exports = EWallet;
