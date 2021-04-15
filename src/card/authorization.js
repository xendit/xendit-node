const { Validate, Auth, fetchWithHTTPErr, promWithJsErr } = require('../utils');

function createAuthorization(data) {
  data.capture = false;
  return this.createCharge(data);
}

function reverseAuthorization(data) {
  return promWithJsErr((resolve, reject) => {
    const compulsoryFields = ['chargeID', 'externalID'];
    Validate.rejectOnMissingFields(compulsoryFields, data, reject);

    let headers = {
      Authorization: Auth.basicAuthHeader(this.opts.secretKey),
      'Content-Type': 'application/json',
    };

    if (data && data.forUserID) {
      headers['for-user-id'] = data.forUserID;
    }

    fetchWithHTTPErr(
      // eslint-disable-next-line max-len
      `${this.API_ENDPOINT}/credit_card_charges/${data.chargeID}/auth_reversal`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({ external_id: data.externalID }),
      },
    )
      .then(resolve)
      .catch(reject);
  });
}

module.exports = {
  createAuthorization,
  reverseAuthorization,
};
