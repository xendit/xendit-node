const {
  promWithJsErr,
  Validate,
  fetchWithHTTPErr,
  Auth,
  queryStringWithoutUndefined,
} = require('../utils');

const PAYMENT_REQUEST_PATH = '/payment_requests';

function PaymentRequest(options) {
  let aggOpts = options;
  if (
    PaymentRequest._injectedOpts &&
    Object.keys(PaymentRequest._injectedOpts).length > 0
  ) {
    aggOpts = Object.assign({}, options, PaymentRequest._injectedOpts);
  }

  this.opts = aggOpts;
  this.API_ENDPOINT = this.opts.xenditURL + PAYMENT_REQUEST_PATH;
}

PaymentRequest._injectedOpts = {};
PaymentRequest._constructorWithInjectedXenditOpts = function(options) {
  PaymentRequest._injectedOpts = options;
  return PaymentRequest;
};

PaymentRequest.prototype.createPaymentRequest = function(data) {
  return promWithJsErr((resolve, reject) => {
    Validate.rejectOnMissingFields(['amount'], data, reject);

    let headers = {
      Authorization: Auth.basicAuthHeader(this.opts.secretKey),
      'Content-Type': 'application/json',
    };

    if (data && data.for_user_id) {
      headers['for-user-id'] = data.for_user_id;
    }

    if (data && data.idempotency_key) {
      headers['idempotency-key'] = data.idempotency_key;
    }

    fetchWithHTTPErr(`${this.API_ENDPOINT}`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        currency: data.currency,
        amount: data.amount,
        reference_id: data.reference_id,
        customer_id: data.customer_id,
        country: data.country,
        description: data.description,
        payment_method: data.payment_method,
        channel_properties: data.channel_properties,
        metadata: data.metadata,
        payment_method_id: data.payment_method_id,
        capture_method: data.capture_method,
        shipping_information: data.shipping_information,
        initiator: data.initiator,
      }),
    })
      .then(resolve)
      .catch(reject);
  });
};

PaymentRequest.prototype.confirmPaymentRequest = function(data) {
  return promWithJsErr((resolve, reject) => {
    Validate.rejectOnMissingFields(['id', 'auth_code'], data, reject);

    let headers = {
      Authorization: Auth.basicAuthHeader(this.opts.secretKey),
      'Content-Type': 'application/json',
    };

    if (data && data.for_user_id) {
      headers['for-user-id'] = data.forUserID;
    }

    if (data && data.idempotency_key) {
      headers['idempotency-key'] = data.idempotency_key;
    }

    fetchWithHTTPErr(`${this.API_ENDPOINT}/${data.id}/auth`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        auth_code: data.auth_code,
      }),
    })
      .then(resolve)
      .catch(reject);
  });
};

PaymentRequest.prototype.resendAuthForPaymentRequest = function(data) {
  return promWithJsErr((resolve, reject) => {
    Validate.rejectOnMissingFields(['id'], data, reject);

    let headers = {
      Authorization: Auth.basicAuthHeader(this.opts.secretKey),
      'Content-Type': 'application/json',
    };

    if (data && data.for_user_id) {
      headers['for-user-id'] = data.forUserID;
    }

    if (data && data.idempotency_key) {
      headers['idempotency-key'] = data.idempotency_key;
    }

    fetchWithHTTPErr(`${this.API_ENDPOINT}/${data.id}/auth/resend`, {
      method: 'POST',
      headers,
    })
      .then(resolve)
      .catch(reject);
  });
};

PaymentRequest.prototype.listPaymentRequest = function(data) {
  return promWithJsErr((resolve, reject) => {
    Validate.rejectOnMissingFields([], data, reject);

    let headers = {
      Authorization: Auth.basicAuthHeader(this.opts.secretKey),
      'Content-Type': 'application/json',
    };

    if (data && data.for_user_id) {
      headers['for-user-id'] = data.for_user_id;
    }

    const queryStr = data
      ? queryStringWithoutUndefined({
          id: data.id ? data.id : undefined,
          reference_id: data.reference_id ? data.reference_id : undefined,
          customer_id: data.customer_id ? data.customer_id : undefined,
          type: data.type ? data.type : undefined,
          channel_code: data.channel_code ? data.channel_code : undefined,
          status: data.status ? data.status : undefined,
          limit: data.limit ? data.limit : undefined,
          after_id: data.after_id ? data.after_id : undefined,
          before_id: data.before_id ? data.before_id : undefined,
        })
      : '';

    const queryStrWithQuestionMark = queryStr ? `?${queryStr}` : '';

    fetchWithHTTPErr(`${this.API_ENDPOINT}${queryStrWithQuestionMark}`, {
      method: 'GET',
      headers,
    })
      .then(resolve)
      .catch(reject);
  });
};

PaymentRequest.prototype.getPaymentRequestById = function(data) {
  return promWithJsErr((resolve, reject) => {
    Validate.rejectOnMissingFields(['id'], data, reject);

    let headers = {
      Authorization: Auth.basicAuthHeader(this.opts.secretKey),
      'Content-Type': 'application/json',
    };

    if (data && data.for_user_id) {
      headers['for-user-id'] = data.forUserID;
    }

    fetchWithHTTPErr(`${this.API_ENDPOINT}/${data.id}`, {
      method: 'GET',
      headers,
    })
      .then(resolve)
      .catch(reject);
  });
};

module.exports = PaymentRequest;
