const { Validate, Auth, fetchWithHTTPErr, promWithJsErr } = require('../utils');

function createCharge(data) {
  return promWithJsErr((resolve, reject) => {
    const compulsoryFields = ['tokenID', 'externalID', 'amount'];
    Validate.rejectOnMissingFields(compulsoryFields, data, reject);

    fetchWithHTTPErr(`${this.API_ENDPOINT}/credit_card_charges`, {
      method: 'POST',
      headers: {
        Authorization: Auth.basicAuthHeader(this.opts.secretKey),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token_id: data.tokenID,
        external_id: data.externalID,
        amount: data.amount,
        authentication_id: data.authID,
        card_cvn: data.cardCVN,
        capture: data.capture,
        descriptor: data.descriptor,
      }),
    })
      .then(resolve)
      .catch(reject);
  });
}

function captureCharge(data) {
  return promWithJsErr((resolve, reject) => {
    const compulsoryFields = ['chargeID', 'amount'];
    Validate.rejectOnMissingFields(compulsoryFields, data, reject);

    fetchWithHTTPErr(
      `${this.API_ENDPOINT}/credit_card_charges/${data.chargeID}/capture`,
      {
        method: 'POST',
        headers: {
          Authorization: Auth.basicAuthHeader(this.opts.secretKey),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: data.amount }),
      },
    )
      .then(resolve)
      .catch(reject);
  });
}

function getCharge(data) {
  return promWithJsErr((resolve, reject) => {
    const compulsoryFields = ['chargeID'];
    Validate.rejectOnMissingFields(compulsoryFields, data, reject);

    fetchWithHTTPErr(
      `${this.API_ENDPOINT}/credit_card_charges/${data.chargeID}`,
      {
        method: 'GET',
        headers: { Authorization: Auth.basicAuthHeader(this.opts.secretKey) },
      },
    )
      .then(resolve)
      .catch(reject);
  });
}

module.exports = {
  createCharge,
  captureCharge,
  getCharge,
};
