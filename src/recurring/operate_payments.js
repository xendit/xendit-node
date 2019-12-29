const { promWithJsErr, Validate, fetchWithHTTPErr, Auth } = require('../utils');

function operatePayment(action, data) {
  return promWithJsErr((resolve, reject) => {
    Validate.rejectOnMissingFields(['id'], data, reject);

    fetchWithHTTPErr(`${this.API_ENDPOINT}/${data.id}/${action}!`, {
      method: 'POST',
      headers: {
        Authorization: Auth.basicAuthHeader(this.opts.secretKey),
      },
    })
      .then(resolve)
      .catch(reject);
  });
}

function stopPayment(data) {
  return operatePayment.bind(this)('stop', data);
}

function pausePayment(data) {
  return operatePayment.bind(this)('pause', data);
}

function resumePayment(data) {
  return operatePayment.bind(this)('resume', data);
}

module.exports = { stopPayment, pausePayment, resumePayment };
