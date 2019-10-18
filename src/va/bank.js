const { Auth, fetchWithHTTPErr, promWithJsErr } = require('../utils');

function getVABanks() {
  return promWithJsErr((resolve, reject) => {
    fetchWithHTTPErr(`${this.API_ENDPOINT}/available_virtual_account_banks`, {
      method: 'GET',
      headers: {
        Authorization: Auth.basicAuthHeader(this.opts.secretKey),
      },
    })
      .then(resolve)
      .catch(reject);
  });
}

module.exports = { getVABanks };
