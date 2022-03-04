const {
  Auth,
  fetchWithHTTPErr,
  queryStringWithoutUndefined,
} = require('../utils');

const BALANCE_PATH = '/balance';

class Balance {
  static _injectedOpts = {};

  static _constructorWithInjectedXenditOpts(options) {
    this._injectedOpts = options;
    return this;
  }

  static AccountType = {
    Cash: 'CASH',
    Holding: 'HOLDING',
    Tax: 'TAX',
  };

  constructor(options) {
    this.opts = { ...options, ...Balance._injectedOpts };
    this.API_ENDPOINT = this.opts.xenditURL + BALANCE_PATH;
  }

  async getBalance(data) {
    const queryStr = data
      ? queryStringWithoutUndefined({ account_type: data.accountType })
      : '';
    const queryStrWithQuestionMark = queryStr ? `?${queryStr}` : '';

    const headers = {
      Authorization: Auth.basicAuthHeader(this.opts.secretKey),
    };

    if (data && data.forUserID) {
      headers['for-user-id'] = data.forUserID;
    }

    return fetchWithHTTPErr(`${this.API_ENDPOINT}${queryStrWithQuestionMark}`, {
      method: 'GET',
      headers,
    });
  }
}

module.exports = Balance;
