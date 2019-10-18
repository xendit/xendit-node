const { Validate, Auth, fetchWithHTTPErr, promWithJsErr } = require('../utils');

function createRefund(data) {
  return promWithJsErr((resolve, reject) => {
    const compulsoryFields = ['chargeID', 'amount', 'externalID'];
    Validate.rejectOnMissingFields(compulsoryFields, data, reject);

    const headers = {
      Authorization: Auth.basicAuthHeader(this.opts.secretKey),
      'Content-Type': 'application/json',
    };

    if (data.xIdempotencyKey) {
      headers['X-IDEMPOTENCY-KEY'] = data.xIdempotencyKey;
    }

    fetchWithHTTPErr(
      `${this.API_ENDPOINT}/credit_card_charges/${data.chargeID}/refunds`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({
          external_id: data.externalID,
          amount: data.amount,
        }),
      },
    )
      .then(resolve)
      .catch(reject);
  });
}

module.exports = {
  createRefund,
};
