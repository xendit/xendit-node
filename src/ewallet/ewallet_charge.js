const { Validate, Auth, fetchWithHTTPErr, promWithJsErr } = require('../utils');

function createEWalletCharge(data) {
  return promWithJsErr((resolve, reject) => {
    let compulsoryFields = [
      'referenceID',
      'currency',
      'amount',
      'checkoutMethod',
    ];
    Validate.rejectOnMissingFields(compulsoryFields, data, reject);

    let headers = {
      Authorization: Auth.basicAuthHeader(this.opts.secretKey),
      'Content-Type': 'application/json',
    };

    if (data.forUserID) {
      headers['for-user-id'] = data.forUserID;
    }

    if (data.withFeeRule) {
      headers['with-fee-rule'] = data.withFeeRule;
    }

    fetchWithHTTPErr(`${this.API_ENDPOINT}/ewallets/charges`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        reference_id: data.referenceID,
        currency: data.currency,
        amount: data.amount,
        checkout_method: data.checkoutMethod,
        channel_code: data.channelCode,
        channel_properties: data.channelProperties
          ? {
              mobile_number: data.channelProperties.mobileNumber,
              success_redirect_url: data.channelProperties.successRedirectURL,
              failure_redirect_url: data.channelProperties.failureRedirectURL,
              cancel_redirect_url: data.channelProperties.cancelRedirectURL,
              redeem_points: data.channelProperties.redeemPoints,
            }
          : data.channelProperties,
        payment_method_id: data.paymentMethodId,
        customer_id: data.customerID,
        basket: data.basket
          ? data.basket.map(product => ({
              reference_id: product.referenceID,
              name: product.name,
              category: product.category,
              currency: product.currency,
              price: product.price,
              quantity: product.quantity,
              type: product.type,
              url: product.url,
              description: product.description,
              sub_category: product.subCategory,
              metadata: product.metadata,
            }))
          : null,
        metadata: data.metadata,
      }),
    })
      .then(resolve)
      .catch(reject);
  });
}

function getEWalletChargeStatus(data) {
  return promWithJsErr((resolve, reject) => {
    Validate.rejectOnMissingFields(['chargeID'], data, reject);

    let headers = {
      Authorization: Auth.basicAuthHeader(this.opts.secretKey),
    };

    if (data.forUserID) {
      headers['for-user-id'] = data.forUserID;
    }

    fetchWithHTTPErr(`${this.API_ENDPOINT}/ewallets/charges/${data.chargeID}`, {
      method: 'GET',
      headers: headers,
    })
      .then(resolve)
      .catch(reject);
  });
}

function voidEWalletCharge(data) {
  return promWithJsErr((resolve, reject) => {
    Validate.rejectOnMissingFields(['chargeID'], data, reject);

    let headers = {
      Authorization: Auth.basicAuthHeader(this.opts.secretKey),
      'Content-Type': 'application/json',
    };

    if (data.forUserID) {
      headers['for-user-id'] = data.forUserID;
    }

    fetchWithHTTPErr(
      `${this.API_ENDPOINT}/ewallets/charges/${data.chargeID}/void`,
      {
        method: 'POST',
        headers: headers,
      },
    )
      .then(resolve)
      .catch(reject);
  });
}

module.exports = {
  createEWalletCharge,
  getEWalletChargeStatus,
  voidEWalletCharge,
};
