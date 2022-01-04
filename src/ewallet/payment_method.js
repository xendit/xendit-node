const { Validate, Auth, fetchWithHTTPErr, promWithJsErr } = require('../utils');

function createPaymentMethod(data) {
  return promWithJsErr((resolve, reject) => {
    const compulsoryFields = ['customerID', 'type', 'properties'];
    Validate.rejectOnMissingFields(compulsoryFields, data, reject);

    fetchWithHTTPErr(`${this.API_ENDPOINT}/payment_methods`, {
      method: 'POST',
      headers: {
        Authorization: Auth.basicAuthHeader(this.opts.secretKey),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customer_id: data.customerID,
        type: data.type,
        properties: {
          id: data.properties.id,
        },
        metadata: data.metadata,
      }),
    })
      .then(resolve)
      .catch(reject);
  });
}

function getPaymentMethodsByCustomerID(data) {
  return promWithJsErr((resolve, reject) => {
    const compulsoryFields = ['customerID'];
    Validate.rejectOnMissingFields(compulsoryFields, data, reject);

    fetchWithHTTPErr(
      `${this.API_ENDPOINT}/payment_methods?customer_id=${data.customerID}`,
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
  createPaymentMethod,
  getPaymentMethodsByCustomerID,
};
