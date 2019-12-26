const { Validate, Auth, fetchWithHTTPErr, promWithJsErr } = require('../utils');
const DANA_EWALLET_TYPE = 'DANA';

function createPayment(data) {
  return promWithJsErr((resolve, reject) => {
    Validate.rejectOnMissingFields(
      ['externalID', 'amount', 'callbackURL', 'redirectURL'],
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
        amount: data.amount,
        expiration_date: data.expirationDate,
        callback_url: data.callbackURL,
        redirect_url: data.redirectURL,
        ewallet_type: DANA_EWALLET_TYPE,
      }),
    })
      .then(resolve)
      .catch(reject);
  });
}

function getByExtID(data) {
  return promWithJsErr((resolve, reject) => {
    Validate.rejectOnMissingFields(['externalID'], data, reject);
    fetchWithHTTPErr(
      `${this.API_ENDPOINT}/external_id=${data.external_id}&ewallet_type=${DANA_EWALLET_TYPE}`,
      {
        method: 'GET',
        headers: {
          Authorization: Auth.basicAuthHeader(this.opts.secretKey),
        },
      },
    )
      .then(resolve)
      .catch(reject);
  });
}

module.exports = { createPayment, getByExtID };
