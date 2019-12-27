const { promWithJsErr, Validate, fetchWithHTTPErr, Auth } = require('../utils');

function operatePayment(action, data) {
  promWithJsErr((resolve, reject) => {
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
  return operatePayment('stop', data);
}

function pausePayment(data) {
  return operatePayment('pause', data);
}

function resumePayment(data) {
  return operatePayment('resume', data);
}

module.exports = { stopPayment, pausePayment, resumePayment };
