const { Validate, Auth, fetchWithHTTPErr, promWithJsErr } = require('../utils');

function createRefund(data) {
  return promWithJsErr((resolve, reject) => {
    const compulsoryFields = ['chargeID', 'amount', 'externalID'];
    Validate.rejectOnMissingFields(compulsoryFields, data, reject);

    const headers = Auth.basicHeaderWithIdempotencyKey(
      this.opts.secretKey,
      data.xIdempotencyKey,
    );

    if (data && data.forUserID) {
      headers['for-user-id'] = data.forUserID;
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
