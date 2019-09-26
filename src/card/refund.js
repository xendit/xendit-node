const { Validate, Auth, fetchWithHTTPErr } = require('../utils');
const errors = require('../errors');

function createRefund(data) {
  return new Promise((resolve, reject) => {
    try {
      const compulsoryFields = ['chargeID', 'amount', 'externalID'];
      Validate.rejectOnMissingFields(compulsoryFields, data, reject);

      fetchWithHTTPErr(
        `${this.API_ENDPOINT}/credit_card_charges/${data.chargeID}/refunds`,
        {
          method: 'POST',
          headers: {
            Authorization: Auth.basicAuthHeader(this.opts.secretKey),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            external_id: data.externalID,
            amount: data.amount,
          }),
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
  createRefund,
};
