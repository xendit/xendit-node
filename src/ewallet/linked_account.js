const { Validate, Auth, fetchWithHTTPErr, promWithJsErr } = require('../utils');

function initializeTokenization(data) {
  return promWithJsErr((resolve, reject) => {
    const compulsoryFields = ['customerID', 'channelCode'];
    Validate.rejectOnMissingFields(compulsoryFields, data, reject);

    fetchWithHTTPErr(`${this.API_ENDPOINT}/linked_account_tokens/auth`, {
      method: 'POST',
      headers: {
        Authorization: Auth.basicAuthHeader(this.opts.secretKey),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customer_id: data.customerID,
        channel_code: data.channelCode,
        properties:
          data.channelCode === 'PH_PAYMAYA'
            ? {
                success_redirect_url: data.properties.successRedirectURL,
                failure_redirect_url: data.properties.failureRedirectURL,
                cancel_redirect_url: data.properties.cancelRedirectURL,
                callback_url: data.properties.callbackURL,
              }
            : {
                success_redirect_url: data.properties.successRedirectURL,
                failure_redirect_url: data.properties.failureRedirectURL,
                callback_url: data.properties.callbackURL,
              },
        metadata: data.metadata,
      }),
    })
      .then(resolve)
      .catch(reject);
  });
}

function unlinkTokenization(data) {
  return promWithJsErr((resolve, reject) => {
    const compulsoryFields = ['linkedAccTokenID'];
    Validate.rejectOnMissingFields(compulsoryFields, data, reject);

    fetchWithHTTPErr(
      `${this.API_ENDPOINT}/linked_account_tokens/${data.linkedAccTokenID}`,
      {
        method: 'DELETE',
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
  initializeTokenization,
  unlinkTokenization,
};
