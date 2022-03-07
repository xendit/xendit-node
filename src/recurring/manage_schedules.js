const { promWithJsErr, Validate, fetchWithHTTPErr, Auth } = require('../utils');

function getSchedule(data) {
  return promWithJsErr((resolve, reject) => {
    const requiredFields = ['id', 'business_id'];

    Validate.rejectOnMissingFields(requiredFields, data, reject);

    fetchWithHTTPErr(`${this.API_ENDPOINT_SCHEDULES}/${data.id}`, {
      method: 'GET',
      headers: {
        Authorization: Auth.basicAuthHeader(this.opts.secretKey),
        'business-id': data.business_id,
      },
    })
      .then(resolve)
      .catch(reject);
  });
}

function createSchedule(data) {
  return promWithJsErr((resolve, reject) => {
    const requiredFields = [
      'business_id',
      'reference_id',
      'interval',
      'interval_count',
    ];

    Validate.rejectOnMissingFields(requiredFields, data, reject);

    fetchWithHTTPErr(`${this.API_ENDPOINT_SCHEDULES}/`, {
      method: 'POST',
      headers: {
        Authorization: Auth.basicAuthHeader(this.opts.secretKey),
        'business-id': data.business_id,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        reference_id: data.reference_id,
        interval: data.interval,
        interval_count: data.interval_count,
        total_recurrence: data.total_recurrence,
        anchor_date: data.anchor_date,
        retry_interval: data.retry_interval,
        retry_interval_count: data.retry_interval_count,
        total_retry: data.total_retry,
        failed_attempt_notifications: data.failed_attempt_notifications,
        failed_cycle_action: data.failed_cycle_action,
      }),
    })
      .then(resolve)
      .catch(reject);
  });
}

function updateSchedule(data) {
  return promWithJsErr((resolve, reject) => {
    const requiredFields = ['id', 'business_id', 'interval', 'interval_count'];

    Validate.rejectOnMissingFields(requiredFields, data, reject);

    fetchWithHTTPErr(`${this.API_ENDPOINT_SCHEDULES}/${data.id}`, {
      method: 'PATCH',
      headers: {
        Authorization: Auth.basicAuthHeader(this.opts.secretKey),
        'business-id': data.business_id,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        reference_id: data.reference_id,
        interval: data.interval,
        interval_count: data.interval_count,
        total_recurrence: data.total_recurrence,
        anchor_date: data.anchor_date,
        retry_interval: data.retry_interval,
        retry_interval_count: data.retry_interval_count,
        total_retry: data.total_retry,
        failed_attempt_notifications: data.failed_attempt_notifications,
        failed_cycle_action: data.failed_cycle_action,
      }),
    })
      .then(resolve)
      .catch(reject);
  });
}

module.exports = { createSchedule, getSchedule, updateSchedule };
