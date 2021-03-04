const {
  promWithJsErr,
  Auth,
  Validate,
  fetchWithHTTPErr,
  queryStringWithoutUndefined,
} = require('../utils');

const INVOICE_PATH = '';

function Invoice(options) {
  let aggOpts = options;
  if (Invoice._injectedOpts && Object.keys(Invoice._injectedOpts).length > 0) {
    aggOpts = Object.assign({}, options, Invoice._injectedOpts);
  }

  this.opts = aggOpts;
  this.API_ENDPOINT = this.opts.xenditURL + INVOICE_PATH;
}

Invoice._injectedOpts = {};
Invoice._constructorWithInjectedXenditOpts = function(options) {
  Invoice._injectedOpts = options;
  return Invoice;
};

Invoice.prototype.createInvoice = function(data) {
  return promWithJsErr((resolve, reject) => {
    Validate.rejectOnMissingFields(
      ['externalID', 'payerEmail', 'description', 'amount'],
      data,
      reject,
    );

    let headers = {
      'Content-Type': 'application/json',
      Authorization: Auth.basicAuthHeader(this.opts.secretKey),
    };

    if (data.forUserID) {
      headers['for-user-id'] = data.forUserID;
    }

    fetchWithHTTPErr(`${this.API_ENDPOINT}/v2/invoices`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        external_id: data.externalID,
        payer_email: data.payerEmail,
        description: data.description,
        amount: data.amount,
        should_send_email: data.shouldSendEmail,
        callback_virtual_account_id: data.callbackVirtualAccountID,
        invoice_duration: data.invoiceDuration,
        success_redirect_url: data.successRedirectURL,
        failure_redirect_url: data.failureRedirectURL,
        payment_methods: data.paymentMethods,
        mid_label: data.midLabel,
        currency: data.currency,
        fixed_va: data.fixedVA,
      }),
    })
      .then(resolve)
      .catch(reject);
  });
};

Invoice.prototype.getInvoice = function(data) {
  return promWithJsErr((resolve, reject) => {
    Validate.rejectOnMissingFields(['invoiceID'], data, reject);

    let headers = {
      Authorization: Auth.basicAuthHeader(this.opts.secretKey),
    };

    if (data.forUserID) {
      headers['for-user-id'] = data.forUserID;
    }

    fetchWithHTTPErr(`${this.API_ENDPOINT}/v2/invoices/${data.invoiceID}`, {
      method: 'GET',
      headers,
    })
      .then(resolve)
      .catch(reject);
  });
};

Invoice.prototype.expireInvoice = function(data) {
  return promWithJsErr((resolve, reject) => {
    Validate.rejectOnMissingFields(['invoiceID'], data, reject);

    let headers = {
      Authorization: Auth.basicAuthHeader(this.opts.secretKey),
    };

    if (data.forUserID) {
      headers['for-user-id'] = data.forUserID;
    }

    fetchWithHTTPErr(
      `${this.API_ENDPOINT}/invoices/${data.invoiceID}/expire!`,
      {
        method: 'POST',
        headers,
      },
    )
      .then(resolve)
      .catch(reject);
  });
};

Invoice.prototype.getAllInvoices = function(data) {
  return promWithJsErr((resolve, reject) => {
    // if no data provided, querystring should be empty
    const queryStr = data
      ? queryStringWithoutUndefined({
          statuses: data.statuses,
          limit: data.limit,
          created_after: data.createdAfter
            ? data.createdAfter.toISOString()
            : undefined,
          created_before: data.createdBefore
            ? data.createdBefore.toISOString()
            : undefined,
          paid_after: data.paidAfter ? data.paidAfter.toISOString() : undefined,
          paid_before: data.paidBefore
            ? data.paidBefore.toISOString()
            : undefined,
          expired_after: data.expiredAfter
            ? data.expiredAfter.toISOString()
            : undefined,
          expired_before: data.expiredBefore
            ? data.expiredBefore.toISOString()
            : undefined,
          last_invoice_id: data.lastInvoiceID,
          client_types: data.clientTypes,
          payment_channels: data.paymentChannels,
          on_demand_link: data.onDemandLink,
          recurring_payment_id: data.recurringPaymentID,
        })
      : '';
    const queryStrWithQuestionMark = queryStr ? `?${queryStr}` : '';

    let headers = {
      Authorization: Auth.basicAuthHeader(this.opts.secretKey),
    };

    if (data && data.forUserID) {
      headers['for-user-id'] = data.forUserID;
    }

    fetchWithHTTPErr(
      `${this.API_ENDPOINT}/v2/invoices${queryStrWithQuestionMark}`,
      {
        method: 'GET',
        headers,
      },
    )
      .then(resolve)
      .catch(reject);
  });
};

module.exports = Invoice;
