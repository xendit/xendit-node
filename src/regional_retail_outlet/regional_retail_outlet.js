const { promWithJsErr, Validate, fetchWithHTTPErr, Auth } = require('../utils');

const REGIONAL_RETAIL_OUTLET_PATH = '/payment_codes';

function RegionalRetailOutlet(options) {
  let aggOpts = options;
  if (
    RegionalRetailOutlet._injectedOpts &&
    Object.keys(RegionalRetailOutlet._injectedOpts).length > 0
  ) {
    aggOpts = Object.assign({}, options, RegionalRetailOutlet._injectedOpts);
  }

  this.opts = aggOpts;
  this.API_ENDPOINT = this.opts.xenditURL + REGIONAL_RETAIL_OUTLET_PATH;
}

RegionalRetailOutlet._injectedOpts = {};
RegionalRetailOutlet._constructorWithInjectedXenditOpts = function(options) {
  RegionalRetailOutlet._injectedOpts = options;
  return RegionalRetailOutlet;
};

RegionalRetailOutlet.prototype.createPaymentCode = function(data) {
  return promWithJsErr((resolve, reject) => {
    Validate.rejectOnMissingFields(
      [
        'referenceId',
        'channelCode',
        'amount',
        'currency',
        'customerName',
        'market',
      ],
      data,
      reject,
    );

    fetchWithHTTPErr(`${this.API_ENDPOINT}`, {
      method: 'POST',
      headers: {
        Authorization: Auth.basicAuthHeader(this.opts.secretKey),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        reference_id: data.referenceId,
        channel_code: data.channelCode,
        amount: data.amount,
        currency: data.currency,
        customer_name: data.customerName,
        market: data.market,
        payment_code: data.paymentCode,
        description: data.description,
        metadata: data.metadata,
        expires_at: data.expiresAt ? data.expiresAt.toISOString() : undefined,
        is_single_use: data.isSingleUse,
      }),
    })
      .then(resolve)
      .catch(reject);
  });
};

RegionalRetailOutlet.prototype.updatePaymentCode = function(data) {
  return promWithJsErr((resolve, reject) => {
    Validate.rejectOnMissingFields(['id'], data, reject);

    fetchWithHTTPErr(`${this.API_ENDPOINT}/${data.id}`, {
      method: 'PATCH',
      headers: {
        Authorization: Auth.basicAuthHeader(this.opts.secretKey),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: data.amount,
        currency: data.amount,
        customer_name: data.customerName,
      }),
    })
      .then(resolve)
      .catch(reject);
  });
};

RegionalRetailOutlet.prototype.getPaymentCode = function(data) {
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

module.exports = RegionalRetailOutlet;
