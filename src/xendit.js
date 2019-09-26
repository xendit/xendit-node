const { CardService, CardStatus } = require('./card');

function Xendit(options) {
  let {
    publicKey, // customer's public API key
    secretKey, // customer's secret API key
    xenditURL, // should there be a need to override API base URL
  } = options;

  // default values of opts
  xenditURL = xenditURL || 'https://api.xendit.co';

  this.opts = { publicKey, secretKey, xenditURL };
  this.Card = CardService._constructorWithInjectedXenditOpts(this.opts);
}

Xendit.CardStatus = CardStatus;

module.exports = Xendit;
