const OVO = require('./ovo');
const Dana = require('./dana');
const LinkAja = require('./linkaja');

const EWALLET_PATH = '/ewallets';

function EWallet(options) {
  let aggOpts = options;
  if (EWallet._injectedOpts && Object.keys(EWallet._injectedOpts).length > 0) {
    aggOpts = Object.assign({}, options, EWallet._injectedOpts);
  }

  this.opts = aggOpts;
  this.opts.eWalletURL = this.opts.xenditURL + EWALLET_PATH;

  let ovo = OVO._constructorWithInjectedEWalletOpts(this.opts);
  let dana = Dana._constructorWithInjectedEWalletOpts(this.opts);
  let linkaja = LinkAja._constructorWithInjectedEWalletOpts(this.opts);

  this.ovo = new ovo({});
  this.dana = new dana({});
  this.linkaja = new linkaja({});
}

EWallet._injectedOpts = {};
EWallet._constructorWithInjectedXenditOpts = function(options) {
  EWallet._injectedOpts = options;
  return EWallet;
};

module.exports = EWallet;
