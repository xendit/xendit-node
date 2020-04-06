const { promWithJsErr, Validate, fetchWithHTTPErr, Auth } = require('../utils');

const RETAIL_OUTLET_PATH = '/fixed_payment_code';

function RetailOutlet(options) {
  let aggOpts = options;
  if (
    RetailOutlet._injectedOpts &&
    Object.keys(RetailOutlet._injectedOpts).length > 0
  ) {
    aggOpts = Object.assign({}, options, RetailOutlet._injectedOpts);
  }

  this.opts = aggOpts;
  this.API_ENDPOINT = this.opts.xenditURL + RETAIL_OUTLET_PATH;
}

RetailOutlet._injectedOpts = {};
RetailOutlet._constructorWithInjectedXenditOpts = function(options) {
  RetailOutlet._injectedOpts = options;
  return RetailOutlet;
};

RetailOutlet.prototype.createFixedPaymentCode = function(data) {
  return promWithJsErr((resolve, reject) => {
    Validate.rejectOnMissingFields(
      ['externalID', 'retailOutletName', 'name', 'expectedAmt'],
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
        retail_outlet_name: data.retailOutletName,
        name: data.name,
        expected_amount: data.expectedAmt,
        payment_code: data.paymentCode,
        expiration_date: data.expirationDate
          ? data.expirationDate.toISOString()
          : undefined,
        is_single_use: data.isSingleUse,
      }),
    })
      .then(resolve)
      .catch(reject);
  });
};

RetailOutlet.prototype.updateFixedPaymentCode = function(data) {
  return promWithJsErr((resolve, reject) => {
    Validate.rejectOnMissingFields(['id'], data, reject);

    fetchWithHTTPErr(`${this.API_ENDPOINT}/${data.id}`, {
      method: 'PATCH',
      headers: {
        Authorization: Auth.basicAuthHeader(this.opts.secretKey),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        expected_amount: data.expectedAmt,
        expiration_date: data.expirationDate
          ? data.expirationDate.toISOString()
          : undefined,
      }),
    })
      .then(resolve)
      .catch(reject);
  });
};

RetailOutlet.prototype.getFixedPaymentCode = function(data) {
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

module.exports = RetailOutlet;
