const { Auth, fetchWithHTTPErr } = require('../utils');
const errors = require('../errors');

function getVABanks() {
  return new Promise((resolve, reject) => {
    try {
      fetchWithHTTPErr(`${this.API_ENDPOINT}/available_virtual_account_banks`, {
        method: 'GET',
        headers: {
          Authorization: Auth.basicAuthHeader(this.opts.secretKey),
        },
      })
        .then(resolve)
        .catch(reject);
    } catch (e) {
      reject({ status: 418, code: errors.JS_ERROR, message: e.message });
    }
  });
}

module.exports = { getVABanks };
