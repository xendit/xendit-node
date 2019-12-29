const { Validate, Auth, fetchWithHTTPErr, promWithJsErr } = require('../utils');
const OVO = require('./ovo');
const Dana = require('./dana');
const LinkAja = require('./linkaja');

const EWALLET_PATH = '/ewallets';

function EWallet(options) {
  let aggOpts = options;
  if (EWallet._injectedOpts && Object.keys(EWallet._injectedOpts).length > 0) {
    aggOpts = Object.assign({}, options, EWallet._injectedOpts);
  }

  this.opts = aggOpts;
  this.opts.eWalletURL = this.opts.xenditURL + EWALLET_PATH;
  this.API_ENDPOINT = this.opts.xenditURL + EWALLET_PATH;

  let ovo = OVO._constructorWithInjectedEWalletOpts(this.opts);
  let dana = Dana._constructorWithInjectedEWalletOpts(this.opts);
  let linkaja = LinkAja._constructorWithInjectedEWalletOpts(this.opts);

  this.ovo = new ovo({});
  this.dana = new dana({});
  this.linkaja = new linkaja({});
}

EWallet._injectedOpts = {};
EWallet._constructorWithInjectedXenditOpts = function(options) {
  EWallet._injectedOpts = options;
  return EWallet;
};

EWallet.prototype.createPayment = function(data) {
  return promWithJsErr((resolve, reject) => {
    Validate.rejectOnMissingFields(
      ['externalID', 'amount', 'ewalletType'],
      data,
      reject,
    );

    fetchWithHTTPErr(`${this.API_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: Auth.basicAuthHeader(this.opts.secretKey),
      },
      body: JSON.stringify({
        external_id: data.externalID,
        amount: data.amount,
        phone: data.phone,
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
    fetchWithHTTPErr(
      `${this.API_ENDPOINT}?external_id=${data.externalID}&ewallet_type=${data.ewalletType}`,
      {
        method: 'GET',
        headers: {
          Authorization: Auth.basicAuthHeader(this.opts.secretKey),
        },
      },
    )
      .then(resolve)
      .catch(reject);
  });
};

module.exports = EWallet;
