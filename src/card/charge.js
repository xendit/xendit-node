const { Validate, Auth, fetchWithHTTPErr, promWithJsErr } = require('../utils');

function createCharge(data) {
  return promWithJsErr((resolve, reject) => {
    const compulsoryFields = ['tokenID', 'externalID', 'amount'];
    Validate.rejectOnMissingFields(compulsoryFields, data, reject);

    let headers = {
      Authorization: Auth.basicAuthHeader(this.opts.secretKey),
      'Content-Type': 'application/json',
    };

    if (data && data.forUserID) {
      headers['for-user-id'] = data.forUserID;
    }

    fetchWithHTTPErr(`${this.API_ENDPOINT}/credit_card_charges`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        token_id: data.tokenID,
        external_id: data.externalID,
        amount: data.amount,
        authentication_id: data.authID,
        card_cvn: data.cardCVN,
        capture: data.capture,
        descriptor: data.descriptor,
        currency: data.currency,
        mid_label: data.midLabel,
        billing_details: data.billingDetails,
        promotion: data.promotion,
        installment: data.installment,
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

    let headers = {
      Authorization: Auth.basicAuthHeader(this.opts.secretKey),
      'Content-Type': 'application/json',
    };

    if (data && data.forUserID) {
      headers['for-user-id'] = data.forUserID;
    }

    fetchWithHTTPErr(
      `${this.API_ENDPOINT}/credit_card_charges/${data.chargeID}/capture`,
      {
        method: 'POST',
        headers,
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

    let headers = {
      Authorization: Auth.basicAuthHeader(this.opts.secretKey),
      'Content-Type': 'application/json',
    };

    if (data && data.forUserID) {
      headers['for-user-id'] = data.forUserID;
    }

    fetchWithHTTPErr(
      `${this.API_ENDPOINT}/credit_card_charges/${data.chargeID}`,
      {
        method: 'GET',
        headers,
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
