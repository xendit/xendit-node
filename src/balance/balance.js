const {
  promWithJsErr,
  Auth,
  fetchWithHTTPErr,
  queryStringWithoutUndefined,
} = require('../utils');

const BALANCE_PATH = '/balance';

function Balance(options) {
  let aggOpts = options;
  if (Balance._injectedOpts && Object.keys(Balance._injectedOpts).length > 0) {
    aggOpts = Object.assign({}, options, Balance._injectedOpts);
  }

  this.opts = aggOpts;
  this.API_ENDPOINT = this.opts.xenditURL + BALANCE_PATH;
}

Balance._injectedOpts = {};
Balance._constructorWithInjectedXenditOpts = function(options) {
  Balance._injectedOpts = options;
  return Balance;
};

Balance.AccountType = {
  Cash: 'CASH',
  Holding: 'HOLDING',
  Tax: 'TAX',
};

Balance.prototype.getBalance = function(data) {
  return promWithJsErr((resolve, reject) => {
    const queryStr = data
      ? queryStringWithoutUndefined({ account_type: data.accountType })
      : '';
    const queryStrWithQuestionMark = queryStr ? `?${queryStr}` : '';

    let headers = {
      Authorization: Auth.basicAuthHeader(this.opts.secretKey),
    };

    if (data && data.forUserID) {
      headers['for-user-id'] = data.forUserID;
    }

    fetchWithHTTPErr(`${this.API_ENDPOINT}${queryStrWithQuestionMark}`, {
      method: 'GET',
      headers,
    })
      .then(resolve)
      .catch(reject);
  });
};

module.exports = Balance;
