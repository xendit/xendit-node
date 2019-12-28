const { Validate, Auth, fetchWithHTTPErr, promWithJsErr } = require('../utils');
const LINKAJA_EWALLET_TYPE = 'LINKAJA';

function createPayment(data) {
  return promWithJsErr((resolve, reject) => {
    Validate.rejectOnMissingFields(
      ['externalID', 'phone', 'amount', 'items', 'callbackURL', 'redirectURL'],
      data,
      reject,
    );

    fetchWithHTTPErr(`${this.API_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: Auth.basicAuthHeader(this.opts.secretKey),
      },
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
