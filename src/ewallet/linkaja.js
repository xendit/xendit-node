const { Validate, Auth, fetchWithHTTPErr, promWithJsErr } = require('../utils');
const LINKAJA_EWALLET_TYPE = 'LINKAJA';

function createPayment(data) {
  return promWithJsErr((resolve, reject) => {
    Validate.rejectOnMissingFields(
      ['externalID', 'phone', 'amount', 'items', 'callbackURL', 'redirectURL'],
      data,
      reject,
    );

    const headers = Auth.basicHeaderWithIdempotencyKey(
      this.opts.secretKey,
      data.xIdempotencyKey,
    );

    fetchWithHTTPErr(`${this.API_ENDPOINT}`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        external_id: data.externalID,
        phone: data.phone,
        amount: data.amount,
        items: data.items,
        callback_url: data.callbackURL,
        redirect_url: data.redirectURL,
        ewallet_type: LINKAJA_EWALLET_TYPE,
      }),
    })
      .then(resolve)
      .catch(reject);
  });
}

module.exports = { createPayment };
