const {
  isCreditCardNumberValid,
  isCreditCardExpirationDateValid,
  isCreditCardCVNValidForCardType,
} = require('./utils');
const { Validate, Auth, fetchWithHTTPErr, promWithJsErr } = require('../utils');
const errors = require('../errors');

function createToken(data) {
  return promWithJsErr((resolve, reject) => {
    const compulsoryFields = [
      'cardNumber',
      'expMonth',
      'expYear',
      'cardCVN',
      'isSingleUse',
    ];
    if (data.isSingleUse) {
      compulsoryFields.push('amount');
    }
    Validate.rejectOnMissingFields(compulsoryFields, data, reject);

    if (!isCreditCardNumberValid(data.cardNumber)) {
      reject({
        status: 400,
        code: errors.API_VALIDATION_ERROR,
        message: 'Invalid Card Number',
      });
    } else if (!isCreditCardExpirationDateValid(data.expMonth, data.expYear)) {
      reject({
        status: 400,
        code: errors.API_VALIDATION_ERROR,
        message: 'Invalid Expiration',
      });
    } else if (
      !isCreditCardCVNValidForCardType(data.cardCVN, data.cardNumber)
    ) {
      reject({
        status: 400,
        code: errors.API_VALIDATION_ERROR,
        message: 'Invalid CVN',
      });
    }

    fetchWithHTTPErr(`${this.API_ENDPOINT}/v2/credit_card_tokens`, {
      method: 'POST',
      headers: {
        Authorization: Auth.basicAuthHeader(this.opts.publicKey),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        card_data: {
          account_number: data.cardNumber,
          exp_month: data.expMonth,
          exp_year: data.expYear,
          cvn: data.cardCVN,
        },
        amount: data.amount,
        is_single_use: data.isSingleUse,
        should_authenticate: data.shouldAuthenticate,
      }),
    })
      .then(resolve)
      .catch(reject);
  });
}

module.exports = {
  createToken,
};
