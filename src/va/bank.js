const { Auth, fetchWithHTTPErr, promWithJsErr } = require('../utils');

function getVABanks(data = {}) {
  return promWithJsErr((resolve, reject) => {
    let headers = {
      Authorization: Auth.basicAuthHeader(this.opts.secretKey),
    };

    if (data && data.forUserID) {
      headers['for-user-id'] = data.forUserID;
    }

    fetchWithHTTPErr(`${this.API_ENDPOINT}/available_virtual_account_banks`, {
      method: 'GET',
      headers,
    })
      .then(resolve)
      .catch(reject);
  });
}

module.exports = { getVABanks };
