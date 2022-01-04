const { promWithJsErr, Validate, fetchWithHTTPErr, Auth } = require('../utils');

const TRANSACTION_PATH = '/transactions';

function Transaction(options) {
  let aggOpts = options;
  if (
    Transaction._injectedOpts &&
    Object.keys(Transaction._injectedOpts).length > 0
  ) {
    aggOpts = Object.assign({}, options, Transaction._injectedOpts);
  }

  this.opts = aggOpts;
  this.API_ENDPOINT = this.opts.xenditURL + TRANSACTION_PATH;
}

Transaction._injectedOpts = {};
Transaction._constructorWithInjectedXenditOpts = function(options) {
  Transaction._injectedOpts = options;
  return Transaction;
};

Transaction.prototype.getTransaction = function(data) {
  return promWithJsErr((resolve, reject) => {
    Validate.rejectOnMissingFields(['id'], data, reject);

    fetchWithHTTPErr(`${this.API_ENDPOINT}/${data.id}`, {
      method: 'GET',
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

Transaction.prototype.getTransactionList = function(data) {
  return promWithJsErr((resolve, reject) => {

    fetchWithHTTPErr(`${this.API_ENDPOINT}/${data.queries}`, {
      method: 'GET',
      headers: {
        Authorization: Auth.basicAuthHeader(this.opts.secretKey),
        'Content-Type': 'application/json',
      },
    })
      .then(resolve)
      .catch(reject);
  });
};

module.exports = Transaction;
