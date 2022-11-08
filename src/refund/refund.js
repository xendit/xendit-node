const {
  promWithJsErr,
  Validate,
  fetchWithHTTPErr,
  Auth,
  queryStringWithoutUndefined,
} = require('../utils');

const REFUND_PATH = '/refunds';

function Refund(options) {
  let aggOpts = options;
  if (Refund._injectedOpts && Object.keys(Refund._injectedOpts).length > 0) {
    aggOpts = Object.assign({}, options, Refund._injectedOpts);
  }

  this.opts = aggOpts;
  this.API_ENDPOINT = this.opts.xenditURL + REFUND_PATH;
}

Refund._injectedOpts = {};
Refund._constructorWithInjectedXenditOpts = function(options) {
  Refund._injectedOpts = options;
  return Refund;
};

Refund.prototype.createRefund = function(data) {
  return promWithJsErr((resolve, reject) => {
    Validate.rejectOnMissingFields(['reason', 'amount'], data, reject);

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
        payment_request_id: data.payment_request_id,
        reference_id: data.reference_id,
        invoice_id: data.invoice_id,
        currency: data.currency,
        amount: data.amount,
        reason: data.reason,
        metadata: data.metadata,
      }),
    })
      .then(resolve)
      .catch(reject);
  });
};

Refund.prototype.getRefundById = function(data) {
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

    fetchWithHTTPErr(`${this.API_ENDPOINT}/${data.id}`, {
      method: 'GET',
      headers,
    })
      .then(resolve)
      .catch(reject);
  });
};

Refund.prototype.listRefunds = function(data) {
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
          payment_request_id: data.payment_request_id
            ? data.payment_request_id
            : undefined,
          invoice_id: data.invoice_id ? data.invoice_id : undefined,
          payment_method_id: data.payment_method_id
            ? data.payment_method_id
            : undefined,
          channel_code: data.channel_code ? data.channel_code : undefined,
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

module.exports = Refund;
