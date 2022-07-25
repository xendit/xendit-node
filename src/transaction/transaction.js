const { promWithJsErr, Validate, fetchWithHTTPErr, Auth } = require('../utils');

const queryTypes = require('./query');

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
    })
      .then(resolve)
      .catch(reject);
  });
};

Transaction.prototype.listTransactions = function(data) {
  return promWithJsErr((resolve, reject) => {
    let QUERY_STRING = '?';
    // Generate the Query String by iterating over the data array
    // If the data is an array we have to loop over the values with the same key
    // If the data is a date we convert to an ISO string format for dates
    // Else we simply add the key-value pair
    for (let field of Object.keys(data)) {
      if (Array.isArray(data[field])) {
        for (let v of data[field]) {
          QUERY_STRING += `${queryTypes[field]}=${v}&`;
        }
      } else if (data[field] instanceof Date) {
        QUERY_STRING += `${queryTypes[field]}=${data[field].toISOString()}&`;
      } else {
        QUERY_STRING += `${queryTypes[field]}=${data[field]}&`;
      }
    }
    QUERY_STRING = QUERY_STRING.slice(0, -1);

    fetchWithHTTPErr(`${this.API_ENDPOINT}${QUERY_STRING}`, {
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
