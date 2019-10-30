const { getBanks } = require('./bank');

const DISBURSE_PATH = '';

function Disbursement(options) {
  let aggOpts = options;
  if (
    Disbursement._injectedOpts &&
    Object.keys(Disbursement._injectedOpts).length > 0
  ) {
    aggOpts = Object.assign({}, options, Disbursement._injectedOpts);
  }

  this.opts = aggOpts;
  this.API_ENDPOINT = this.opts.xenditURL + DISBURSE_PATH;
}

Disbursement._injectedOpts = {};
Disbursement._constructorWithInjectedXenditOpts = function(options) {
  Disbursement._injectedOpts = options;
  return Disbursement;
};

Disbursement.prototype.getBanks = getBanks;

module.exports = Disbursement;
