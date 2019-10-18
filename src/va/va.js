const { getVABanks } = require('./bank');

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

module.exports = VirtualAcc;
