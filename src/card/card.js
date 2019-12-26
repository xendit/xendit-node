const { createCharge, captureCharge, getCharge } = require('./charge');
const {
  createAuthorization,
  reverseAuthorization,
} = require('./authorization');
const { createRefund } = require('./refund');
const CardStatus = require('./card_status');

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

Card.Status = CardStatus;

Card.prototype.createCharge = createCharge;
Card.prototype.captureCharge = captureCharge;
Card.prototype.getCharge = getCharge;
Card.prototype.createAuthorization = createAuthorization;
Card.prototype.reverseAuthorization = reverseAuthorization;
Card.prototype.createRefund = createRefund;

module.exports = Card;
