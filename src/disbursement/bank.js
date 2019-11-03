const { Auth, promWithJsErr, fetchWithHTTPErr } = require('../utils');

function getBanks() {
  return promWithJsErr((resolve, reject) => {
    fetchWithHTTPErr(`${this.API_ENDPOINT}/available_disbursements_banks`, {
      method: 'GET',
      headers: {
        Authorization: Auth.basicAuthHeader(this.opts.secretKey),
      },
    })
      .then(resolve)
      .catch(reject);
  });
}

module.exports = { getBanks };
