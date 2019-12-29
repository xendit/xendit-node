const { Validate, Auth, fetchWithHTTPErr, promWithJsErr } = require('../utils');

const DANA_EWALLET_PATH = '';

function Dana(options) {
  let aggOpts = options;
  if (Dana._injectedOpts && Object.keys(Dana._injectedOpts).length > 0) {
    aggOpts = Object.assign({}, options, Dana._injectedOpts);
  }

  this.opts = aggOpts;
  this.API_ENDPOINT = this.opts.eWalletURL + DANA_EWALLET_PATH;
  this.EWALLET_TYPE = 'DANA';
}

Dana._injectedOpts = {};
Dana._constructorWithInjectedEWalletOpts = function(options) {
  Dana._injectedOpts = options;
  return Dana;
};

Dana.prototype.createPayment = function(data) {
  return promWithJsErr((resolve, reject) => {
    Validate.rejectOnMissingFields(
      ['externalID', 'amount', 'callbackURL', 'redirectURL'],
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
        expiration_date: data.expirationDate,
        callback_url: data.callbackURL,
        redirect_url: data.redirectURL,
        ewallet_type: this.EWALLET_TYPE,
      }),
    })
      .then(resolve)
      .catch(reject);
  });
};

Dana.prototype.getPaymentStatusByExtID = function(data) {
  return promWithJsErr((resolve, reject) => {
    Validate.rejectOnMissingFields(['externalID'], data, reject);
    fetchWithHTTPErr(
      `${this.API_ENDPOINT}?external_id=${data.externalID}&ewallet_type=${this.EWALLET_TYPE}`,
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

module.exports = Dana;
