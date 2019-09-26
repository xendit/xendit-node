const {
  isCreditCardNumberValid,
  isCreditCardExpirationDateValid,
  isCreditCardCVNValidForCardType,
} = require('./utils');
const { Validate, Auth } = require('../utils');
const fetch = require('node-fetch');

const CARD_PATH = '';

function Card(options) {
  let aggOpts = options;
  if (Card._injectedOpts && Object.keys(Card._injectedOpts).length > 0) {
    aggOpts = Object.assign({}, options, Card._injectedOpts);
  }

  this.opts = aggOpts;
  this.API_ENDPOINT = this.opts.xenditURL + CARD_PATH;
}

Card._injectedOpts = {};
Card._constructorWithInjectedXenditOpts = function(options) {
  Card._injectedOpts = options;
  return Card;
};

Card.prototype.createToken = function(data) {
  return new Promise((resolve, reject) => {
    try {
      const missingFields = Validate.requiredFields([
        'cardNumber',
        'expMonth',
        'expYear',
        'cardCVN',
      ]).validate(data);
      if (missingFields.length > 0) {
        let message = 'Missing required fields: ';
        missingFields.forEach((f, i) =>
          i < missingFields.length - 1
            ? (message += `'${f}', `)
            : (message += `'${f}'`),
        );
        reject({ status: 418, message });
      }

      if (!isCreditCardNumberValid(data.cardNumber)) {
        reject({ status: 418, message: 'Invalid Card Number' });
      } else if (
        !isCreditCardExpirationDateValid(data.expMonth, data.expYear)
      ) {
        reject({ status: 418, message: 'Invalid Expiration' });
      } else if (
        !isCreditCardCVNValidForCardType(data.cardCVN, data.cardNumber)
      ) {
        reject({ status: 418, message: 'Invalid CVN' });
      }

      fetch(`${this.API_ENDPOINT}/credit_card_tokens`, {
        method: 'POST',
        headers: {
          Authorization: Auth.basicAuthHeader(this.publicKey),
        },
        body: JSON.stringify({
          card_data: {
            account_number: data.cardNumber,
            exp_month: data.expMonth,
            exp_year: data.expYear,
            cvn: data.cardCVN,
          },
          is_single_use: data.isSingleUse,
        }),
      })
        .then(res => res.json())
        .then(resolve)
        .catch(reject);
    } catch (e) {
      reject({ status: 418, message: e.message });
    }
  });
};

module.exports = Card;
