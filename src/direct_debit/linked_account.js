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
          data.channelCode === 'DC_BRI'
            ? {
                account_mobile_number: data.properties.accountMobileNumber,
                card_last_four: data.properties.cardLastFour,
                card_expiry: data.properties.cardExpiry,
                account_email: data.properties.accountEmail,
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

function validateOTPforLinkedAccount(data) {
  return promWithJsErr((resolve, reject) => {
    const compulsoryFields = ['tokenID', 'otpCode'];
    Validate.rejectOnMissingFields(compulsoryFields, data, reject);

    fetchWithHTTPErr(
      `${this.API_ENDPOINT}/linked_account_tokens/${data.tokenID}/validate_otp`,
      {
        method: 'POST',
        headers: {
          Authorization: Auth.basicAuthHeader(this.opts.secretKey),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          otp_code: data.otpCode,
        }),
      },
    )
      .then(resolve)
      .catch(reject);
  });
}

function retrieveAccountsByTokenID(data) {
  return promWithJsErr((resolve, reject) => {
    const compulsoryFields = ['tokenID'];
    Validate.rejectOnMissingFields(compulsoryFields, data, reject);

    fetchWithHTTPErr(
      `${this.API_ENDPOINT}/linked_account_tokens/${data.tokenID}/accounts`,
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
  initializeTokenization,
  validateOTPforLinkedAccount,
  retrieveAccountsByTokenID,
};
