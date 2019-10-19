const { promWithJsErr, Validate, Auth, fetchWithHTTPErr } = require('../utils');

function getVAPayment(data) {
  return promWithJsErr((resolve, reject) => {
    const compulsoryFields = ['paymentID'];
    Validate.rejectOnMissingFields(compulsoryFields, data, reject);

    fetchWithHTTPErr(
      // eslint-disable-next-line max-len
      `${this.API_ENDPOINT}/callback_virtual_account_payments/payment_id=${data.paymentID}`,
      {
        method: 'GET',
        headers: {
          Authorization: Auth.basicAuthHeader(this.opts.secretKey),
        },
      },
    )
      .then(resolve)
      .catch(reject);
  });
}

module.exports = {
  getVAPayment,
};
