const { Validate, Auth, fetchWithHTTPErr } = require('../utils');
const errors = require('../errors');

function createAuthorization(data) {
  data.capture = false;
  return this.createCharge(data);
}

function reverseAuthorization(data) {
  return new Promise((resolve, reject) => {
    try {
      const compulsoryFields = ['chargeID', 'externalID'];
      Validate.rejectOnMissingFields(compulsoryFields, data, reject);

      fetchWithHTTPErr(
        // eslint-disable-next-line max-len
        `${this.API_ENDPOINT}/credit_card_charges/${data.chargeID}/auth_reversal`,
        {
          method: 'POST',
          headers: {
            Authorization: Auth.basicAuthHeader(this.opts.secretKey),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ external_id: data.externalID }),
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
  createAuthorization,
  reverseAuthorization,
};
