const { promWithJsErr, Validate, fetchWithHTTPErr, Auth } = require('../utils');

const PAYOUT_PATH = '/payouts';

function Payout(options) {
  let aggOpts = options;
  if (Payout._injectedOpts && Object.keys(Payout._injectedOpts).length > 0) {
    aggOpts = Object.assign({}, options, Payout._injectedOpts);
  }

  this.opts = aggOpts;
  this.API_ENDPOINT = this.opts.xenditURL + PAYOUT_PATH;
}

Payout._injectedOpts = {};
Payout._constructorWithInjectedXenditOpts = function(options) {
  Payout._injectedOpts = options;
  return Payout;
};

Payout.prototype.createPayout = function(data) {
  return promWithJsErr((resolve, reject) => {
    Validate.rejectOnMissingFields(
      ['externalID', 'amount', 'email'],
      data,
      reject,
    );

    fetchWithHTTPErr(`${this.API_ENDPOINT}/`, {
      method: 'POST',
      headers: {
        Authorization: Auth.basicAuthHeader(this.opts.secretKey),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        external_id: data.externalID,
        amount: data.amount,
        email: data.email,
      }),
    })
      .then(resolve)
      .catch(reject);
  });
};

Payout.prototype.getPayout = function(data) {
  return promWithJsErr((resolve, reject) => {
    Validate.rejectOnMissingFields(['id'], data, reject);

    fetchWithHTTPErr(`${this.API_ENDPOINT}/${data.id}`, {
      method: 'GET',
      headers: {
        Authorization: Auth.basicAuthHeader(this.opts.secretKey),
      },
    })
      .then(resolve)
      .catch(reject);
  });
};

Payout.prototype.voidPayout = function(data) {
  return promWithJsErr((resolve, reject) => {
    Validate.rejectOnMissingFields(['id'], data, reject);

    fetchWithHTTPErr(`${this.API_ENDPOINT}/${data.id}/void`, {
      method: 'POST',
      headers: {
        Authorization: Auth.basicAuthHeader(this.opts.secretKey),
      },
    })
      .then(resolve)
      .catch(reject);
  });
};

module.exports = Payout;
