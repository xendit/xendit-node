const { CardService } = require('./card');
const { VAService } = require('./va');
const Errors = require('./errors');

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
  this.VirtualAcc = VAService._constructorWithInjectedXenditOpts(this.opts);
}

Xendit.Errors = Errors;

module.exports = Xendit;
