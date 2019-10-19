const { getVABanks } = require('./bank');
const { createFixedVA, getFixedVA, updateFixedVA } = require('./account');
const { getVAPayment } = require('./payment');

const VA_PATH = '';

function VirtualAcc(options) {
  let aggOpts = options;
  if (
    VirtualAcc._injectedOpts &&
    Object.keys(VirtualAcc._injectedOpts).length > 0
  ) {
    aggOpts = Object.assign({}, options, VirtualAcc._injectedOpts);
  }

  this.opts = aggOpts;
  this.API_ENDPOINT = this.opts.xenditURL + VA_PATH;
}

VirtualAcc._injectedOpts = {};
VirtualAcc._constructorWithInjectedXenditOpts = function(options) {
  VirtualAcc._injectedOpts = options;
  return VirtualAcc;
};

VirtualAcc.prototype.getVABanks = getVABanks;
VirtualAcc.prototype.createFixedVA = createFixedVA;
VirtualAcc.prototype.getFixedVA = getFixedVA;
VirtualAcc.prototype.updateFixedVA = updateFixedVA;
VirtualAcc.prototype.getVAPayment = getVAPayment;

module.exports = VirtualAcc;
