const { promWithJsErr, Validate, fetchWithHTTPErr, Auth } = require('../utils');

function createPayment(data) {
  return promWithJsErr((resolve, reject) => {
    const compulsoryFields = [
      'externalID',
      'payerEmail',
      'description',
      'amount',
      'interval',
      'intervalCount',
    ];
    Validate.rejectOnMissingFields(compulsoryFields, data, reject);

    fetchWithHTTPErr(`${this.API_ENDPOINT}/`, {
      method: 'POST',
      headers: {
        Authorization: Auth.basicAuthHeader(this.opts.secretKey),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        external_id: data.externalID,
        payer_email: data.payerEmail,
        description: data.description,
        amount: data.amount,
        interval: data.interval,
        interval_count: data.intervalCount,
        total_recurrence: data.totalRecurrence,
        invoice_duration: data.invoiceDuration,
        should_send_email: data.shouldSendEmail,
        missed_payment_action: data.missedPaymentAction,
        credit_card_token: data.creditCardToken,
        start_date: data.startDate ? data.startDate.toISOString() : undefined,
        success_redirect_url: data.successRedirectURL,
        failure_redirect_url: data.failureRedirectURL,
        recharge: data.recharge,
        charge_immediately: data.chargeImmediately,
        currency: data.currency,
        reschedule_at: data.rescheduleAt
          ? data.rescheduleAt.toISOString()
          : undefined,
      }),
    })
      .then(resolve)
      .catch(reject);
  });
}

function getPayment(data) {
  return promWithJsErr((resolve, reject) => {
    Validate.rejectOnMissingFields(['id'], data, reject);
    fetchWithHTTPErr(`${this.API_ENDPOINT}/${data.id}`, {
      method: 'GET',
      headers: {
        Authorization: Auth.basicAuthHeader(this.opts.secretKey),
      },
    })
      .then(resolve)
      .catch(reject);
  });
}

function editPayment(data) {
  return promWithJsErr((resolve, reject) => {
    Validate.rejectOnMissingFields(['id'], data, reject);
    fetchWithHTTPErr(`${this.API_ENDPOINT}/${data.id}`, {
      method: 'PATCH',
      headers: {
        Authorization: Auth.basicAuthHeader(this.opts.secretKey),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: data.amount,
        credit_card_token: data.creditCardToken,
        interval: data.interval,
        interval_count: data.intervalCount,
        should_send_email: data.shouldSendEmail,
        invoice_duration: data.invoiceDuration,
        missed_payment_action: data.missedPaymentAction,
        reschedule_at: data.rescheduleAt
          ? data.rescheduleAt.toISOString()
          : undefined,
      }),
    })
      .then(resolve)
      .catch(reject);
  });
}

module.exports = { createPayment, getPayment, editPayment };
