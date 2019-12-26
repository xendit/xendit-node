const { Validate, Auth, fetchWithHTTPErr, promWithJsErr } = require('../utils');
const OVO_EWALLET_TYPE = 'OVO';

function createPayment(data) {
  return promWithJsErr((resolve, reject) => {
    Validate.rejectOnMissingFields(
      ['externalID', 'amount', 'phone'],
      data,
      reject,
    );

    const headers = Auth.basicHeaderWithIdempotencyKey(
      this.opts.secretKey,
      data.xIdempotencyKey,
    );

    fetchWithHTTPErr(`${this.API_ENDPOINT}/ewallets`, {
      method: 'POST',
      headers,
      body: JSON.stringify(_transformEWalletForRequestBody(data)),
    })
      .then(resolve)
      .catch(reject);
  });
}

function _transformEWalletForRequestBody(ewalletPayment) {
  return {
    external_id: ewalletPayment.externalID,
    amount: ewalletPayment.amount,
    phone: ewalletPayment.phone,
    ewallet_type: OVO_EWALLET_TYPE,
  };
}

function getByExtID(data) {
  return promWithJsErr((resolve, reject) => {
    Validate.rejectOnMissingFields(['externalID'], data, reject);
    fetchWithHTTPErr(
      `${this.API_ENDPOINT}/ewallets/external_id=${data.external_id}&ewallet_type=${OVO_EWALLET_TYPE}`,
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
