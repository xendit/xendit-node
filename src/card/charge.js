const { Validate, Auth, fetchWithHTTPErr } = require('../utils');
const errors = require('../errors');

function createCharge(data) {
  return new Promise((resolve, reject) => {
    try {
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
    } catch (e) {
      reject({ status: 418, code: errors.JS_ERROR, message: e.message });
    }
  });
}

function captureCharge(data) {
  return new Promise((resolve, reject) => {
    try {
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
    } catch (e) {
      reject({ status: 418, code: errors.JS_ERROR, message: e.message });
    }
  });
}

function getCharge(data) {
  return new Promise((resolve, reject) => {
    try {
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
    } catch (e) {
      reject({ status: 418, code: errors.JS_ERROR, message: e.message });
    }
  });
}

module.exports = {
  createCharge,
  captureCharge,
  getCharge,
};
