const { Validate, Auth, fetchWithHTTPErr, promWithJsErr } = require('../utils');

function createDirectDebitPayment(data) {
  return promWithJsErr((resolve, reject) => {
    const compulsoryFields = [
      'idempotencyKey',
      'referenceID',
      'paymentMethodID',
      'currency',
      'amount',
      'callbackURL',
    ];
    Validate.rejectOnMissingFields(compulsoryFields, data, reject);

    fetchWithHTTPErr(`${this.API_ENDPOINT}/direct_debits`, {
      method: 'POST',
      headers: {
        Authorization: Auth.basicAuthHeader(this.opts.secretKey),
        'Content-Type': 'application/json',
        'Idempotency-key': data.idempotencyKey,
      },
      body: JSON.stringify({
        reference_id: data.referenceID,
        payment_method_id: data.paymentMethodID,
        currency: data.currency,
        amount: data.amount,
        callback_url: data.callbackURL,
        enable_otp: data.enableOTP,
        description: data.description,
        basket: data.basket
          ? data.basket.map(product => ({
              reference_id: product.referenceID,
              name: product.name,
              market: product.market,
              type: product.type,
              description: product.description,
              category: product.category,
              sub_category: product.subCategory,
              price: product.price,
              url: product.url,
              metadata: product.metadata,
              quantity: product.quantity,
            }))
          : null,
        metadata: data.metadata,
      }),
    })
      .then(resolve)
      .catch(reject);
  });
}

function validateOTPforPayment(data) {
  return promWithJsErr((resolve, reject) => {
    const compulsoryFields = ['directDebitID', 'otpCode'];
    Validate.rejectOnMissingFields(compulsoryFields, data, reject);

    fetchWithHTTPErr(
      `${this.API_ENDPOINT}/direct_debits/${data.directDebitID}/validate_otp/`,
      {
        method: 'POST',
        headers: {
          Authorization: Auth.basicAuthHeader(this.opts.secretKey),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          otp_code: data.otpCode,
        }),
      },
    )
      .then(resolve)
      .catch(reject);
  });
}

function getDirectDebitPaymentStatusByID(data) {
  return promWithJsErr((resolve, reject) => {
    const compulsoryFields = ['directDebitID'];
    Validate.rejectOnMissingFields(compulsoryFields, data, reject);

    fetchWithHTTPErr(
      `${this.API_ENDPOINT}/direct_debits/${data.directDebitID}`,
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

function getDirectDebitPaymentStatusByReferenceID(data) {
  return promWithJsErr((resolve, reject) => {
    const compulsoryFields = ['referenceID'];
    Validate.rejectOnMissingFields(compulsoryFields, data, reject);

    fetchWithHTTPErr(
      `${this.API_ENDPOINT}/direct_debits?reference_id=${data.referenceID}`,
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

module.exports = {
  createDirectDebitPayment,
  validateOTPforPayment,
  getDirectDebitPaymentStatusByID,
  getDirectDebitPaymentStatusByReferenceID,
};
