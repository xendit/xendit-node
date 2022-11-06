const {
  promWithJsErr,
  Validate,
  fetchWithHTTPErr,
  Auth,
  queryStringWithoutUndefined,
} = require('../utils');

const PAYMENT_METHOD_V2_PATH = '/v2/payment_methods';

function PaymentMethodV2(options) {
  let aggOpts = options;
  if (
    PaymentMethodV2._injectedOpts &&
    Object.keys(PaymentMethodV2._injectedOpts).length > 0
  ) {
    aggOpts = Object.assign({}, options, PaymentMethodV2._injectedOpts);
  }

  this.opts = aggOpts;
  this.API_ENDPOINT = this.opts.xenditURL + PAYMENT_METHOD_V2_PATH;
}

PaymentMethodV2._injectedOpts = {};
PaymentMethodV2._constructorWithInjectedXenditOpts = function(options) {
  PaymentMethodV2._injectedOpts = options;
  return PaymentMethodV2;
};

PaymentMethodV2.prototype.createPaymentMethodV2 = function(data) {
  return promWithJsErr((resolve, reject) => {
    Validate.rejectOnMissingFields(['type', 'reusability'], data, reject);

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
        type: data.type,
        reusability: data.reusability,
        reference_id: data.reference_id,
        customer_id: data.customer_id,
        country: data.country,
        description: data.description,
        billing_information: data.billing_information,
        metadata: data.metadata,
        ewallet: data.ewallet,
        direct_debit: data.direct_debit,
        card: data.card,
        over_the_counter: data.over_the_counter,
        virtual_account: data.virtual_account,
        qr_code: data.qr_code,
      }),
    })
      .then(resolve)
      .catch(reject);
  });
};

PaymentMethodV2.prototype.listPaymentMethodV2 = function(data) {
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
          type: data.type ? data.type : undefined,
          reusability: data.reusability ? data.reusability : undefined,
          reference_id: data.reference_id ? data.reference_id : undefined,
          customer_id: data.customer_id ? data.customer_id : undefined,
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

PaymentMethodV2.prototype.authorizePaymentMethodV2 = function(data) {
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

PaymentMethodV2.prototype.getPaymentMethodByIdV2 = function(data) {
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

PaymentMethodV2.prototype.updatePaymentMethodV2 = function(data) {
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
      method: 'PATCH',
      headers,
      body: JSON.stringify({
        reference_id: data.reference_id,
        description: data.description,
        metadata: data.metadata,
        status: data.status,
        reusability: data.reusability,
        over_the_counter: data.over_the_counter,
        virtual_account: data.virtual_account,
      }),
    })
      .then(resolve)
      .catch(reject);
  });
};

PaymentMethodV2.prototype.expirePaymentMethodV2 = function(data) {
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

    fetchWithHTTPErr(`${this.API_ENDPOINT}/${data.id}/expire`, {
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

PaymentMethodV2.prototype.expirePaymentMethodV2 = function(data) {
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

    fetchWithHTTPErr(`${this.API_ENDPOINT}/${data.id}/expire`, {
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

PaymentMethodV2.prototype.listPaymentsByPaymentMethodIdV2 = function(data) {
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
          reference_id: data.reference_id ? data.reference_id : undefined,
          status: data.status ? data.status : undefined,
          limit: data.limit ? data.limit : undefined,
          after_id: data.after_id ? data.after_id : undefined,
          before_id: data.before_id ? data.before_id : undefined,
          created: data.created ? data.created : undefined,
          updated: data.updated ? data.updated : undefined,
        })
      : '';

    const queryStrWithQuestionMark = queryStr ? `?${queryStr}` : '';

    fetchWithHTTPErr(
      `${this.API_ENDPOINT}/${data.id}/payments${queryStrWithQuestionMark}`,
      {
        method: 'GET',
        headers,
      },
    )
      .then(resolve)
      .catch(reject);
  });
};

module.exports = PaymentMethodV2;
