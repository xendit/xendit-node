const { Validate, Auth, fetchWithHTTPErr, promWithJsErr } = require('../utils');

function createAuthentication(data) {
  return promWithJsErr((resolve, reject) => {
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
  });
}

module.exports = {
  createAuthentication,
};
