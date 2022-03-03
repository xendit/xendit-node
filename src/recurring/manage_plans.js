const { promWithJsErr, Validate, fetchWithHTTPErr, Auth } = require('../utils');

function createPlan(data) {
  return promWithJsErr((resolve, reject) => {
    const compulsoryFields = [
      'referenceId',
      'customerId',
      'recurringAction',
      'currency',
      'amount',
    ];
    Validate.rejectOnMissingFields(compulsoryFields, data, reject);

    fetchWithHTTPErr(`${this.API_ENDPOINT}/`, {
      method: 'POST',
      headers: {
        Authorization: Auth.basicAuthHeader(this.opts.secretKey),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        reference_id: data.referenceId,
        customer_id: data.customerId,
        recurring_action: data.recurringAction,
        currency: data.currency,
        amount: data.amount,
        payment_methods: (data.paymentMethods || []).map(
          ({ paymentMethodId: id, rank }) => ({
            payment_method_id: id,
            rank,
          }),
        ),
        schedule_id: data.scheduleId,
        immediate_action_type: data.immediateActionType,
        notification_config: {
          recurring_created: data.notificationConfig.recurringCreated,
          recurring_succeeded: data.notificationConfig.recurringSucceeded,
          recurring_failed: data.notificationConfig.recurringFailed,
          locale: data.notificationConfig.locale,
        },
        failed_cycle_action: data.failedCycleAction,
        metadata: data.metadata,
        description: data.description,
      }),
    })
      .then(resolve)
      .catch(reject);
  });
}

function getPlan(data) {
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

function deactivatePlan(data) {
  return promWithJsErr((resolve, reject) => {
    Validate.rejectOnMissingFields(['id'], data, reject);
    fetchWithHTTPErr(`${this.API_ENDPOINT}/${data.id}/deactivate`, {
      method: 'POST',
      headers: {
        Authorization: Auth.basicAuthHeader(this.opts.secretKey),
      },
    })
      .then(resolve)
      .catch(reject);
  });
}

function editPlan(data) {
  return promWithJsErr((resolve, reject) => {
    Validate.rejectOnMissingFields(['id'], data, reject);
    fetchWithHTTPErr(`${this.API_ENDPOINT}/${data.id}`, {
      method: 'PATCH',
      headers: {
        Authorization: Auth.basicAuthHeader(this.opts.secretKey),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customer_id: data.customerId,
        currency: data.currency,
        amount: data.amount,
        payment_methods:
          data.paymentMethods &&
          data.paymentMethods.map(({ paymentMethodId: id, rank }) => ({
            payment_method_id: id,
            rank,
          })),
        notification_config: data.notificationConfig && {
          recurring_created: data.notificationConfig.recurringCreated || [],
          recurring_succeeded: data.notificationConfig.recurringSucceeded || [],
          recurring_failed: data.notificationConfig.recurringFailed || [],
          locale: data.notificationConfig.locale,
        },
        metadata: data.metadata,
        description: data.description,
      }),
    })
      .then(resolve)
      .catch(reject);
  });
}

module.exports = { createPlan, getPlan, editPlan, deactivatePlan };
