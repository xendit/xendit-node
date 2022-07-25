const { promWithJsErr, Validate, fetchWithHTTPErr, Auth } = require('../utils');

function getSchedule(data) {
  return promWithJsErr((resolve, reject) => {
    const requiredFields = ['id', 'businessId'];

    Validate.rejectOnMissingFields(requiredFields, data, reject);

    fetchWithHTTPErr(`${this.API_ENDPOINT_SCHEDULES}/${data.id}`, {
      method: 'GET',
      headers: {
        Authorization: Auth.basicAuthHeader(this.opts.secretKey),
        'business-id': data.businessId,
      },
    })
      .then(resolve)
      .catch(reject);
  });
}

function createSchedule(data) {
  return promWithJsErr((resolve, reject) => {
    const requiredFields = [
      'businessId',
      'referenceId',
      'interval',
      'intervalCount',
    ];

    Validate.rejectOnMissingFields(requiredFields, data, reject);

    fetchWithHTTPErr(`${this.API_ENDPOINT_SCHEDULES}/`, {
      method: 'POST',
      headers: {
        Authorization: Auth.basicAuthHeader(this.opts.secretKey),
        'business-id': data.businessId,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        reference_id: data.referenceId,
        interval: data.interval,
        interval_count: data.intervalCount,
        total_recurrence: data.totalRecurrence,
        anchor_date: data.anchorDate,
        retry_interval: data.retryInterval,
        retry_interval_count: data.retryIntervalCount,
        total_retry: data.totalRetry,
        failed_attempt_notifications: data.failedAttemptNotifications,
      }),
    })
      .then(resolve)
      .catch(reject);
  });
}

function editSchedule(data) {
  return promWithJsErr((resolve, reject) => {
    const requiredFields = ['id', 'businessId', 'interval', 'intervalCount'];

    Validate.rejectOnMissingFields(requiredFields, data, reject);

    fetchWithHTTPErr(`${this.API_ENDPOINT_SCHEDULES}/${data.id}`, {
      method: 'PATCH',
      headers: {
        Authorization: Auth.basicAuthHeader(this.opts.secretKey),
        'business-id': data.businessId,
        'Content-Type': 'application/json',
        'update-scheduled-cycle': data.updateScheduledCycle || false,
      },
      body: JSON.stringify({
        interval: data.interval,
        interval_count: data.intervalCount,
        total_recurrence: data.totalRecurrence,
        anchor_date: data.anchorDate,
        retry_interval: data.retryInterval,
        retry_interval_count: data.retryIntervalCount,
        total_retry: data.totalRetry,
        failed_attempt_notifications: data.failedAttemptNotifications,
      }),
    })
      .then(resolve)
      .catch(reject);
  });
}

module.exports = { createSchedule, getSchedule, editSchedule };
