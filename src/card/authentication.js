const { Validate, Auth, fetchWithHTTPErr } = require('../utils');
const errors = require('../errors');

function createAuthentication(data) {
  return new Promise((resolve, reject) => {
    try {
      const compulsoryFields = ['amount', 'tokenID'];
      Validate.rejectOnMissingFields(compulsoryFields, data, reject);

      fetchWithHTTPErr(
        `${this.API_ENDPOINT}/credit_card_tokens/${data.tokenID}/authentications`, // eslint-disable-line max-len
        {
          method: 'POST',
          headers: {
            Authorization: Auth.basicAuthHeader(this.opts.publicKey),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ amount: data.amount }),
        },
      )
        .then(resolve)
        .catch(reject);
    } catch (e) {
      reject({ status: 418, code: errors.JS_ERROR, message: e.message });
    }
  });
}

module.exports = {
  createAuthentication,
};
