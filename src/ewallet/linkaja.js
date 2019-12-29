const { Validate, Auth, fetchWithHTTPErr, promWithJsErr } = require('../utils');

const LINKAJA_EWALLET_PATH = '';

function LinkAja(options) {
  let aggOpts = options;
  if (LinkAja._injectedOpts && Object.keys(LinkAja._injectedOpts).length > 0) {
    aggOpts = Object.assign({}, options, LinkAja._injectedOpts);
  }

  this.opts = aggOpts;
  this.API_ENDPOINT = this.opts.eWalletURL + LINKAJA_EWALLET_PATH;
  this.EWALLET_TYPE = 'LINKAJA';
}

LinkAja._injectedOpts = {};
LinkAja._constructorWithInjectedEWalletOpts = function(options) {
  LinkAja._injectedOpts = options;
  return LinkAja;
};

LinkAja.prototype.createPayment = function(data) {
  return promWithJsErr((resolve, reject) => {
    Validate.rejectOnMissingFields(
      ['externalID', 'phone', 'amount', 'items', 'callbackURL', 'redirectURL'],
      data,
      reject,
    );

    fetchWithHTTPErr(`${this.API_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: Auth.basicAuthHeader(this.opts.secretKey),
      },
      body: JSON.stringify({
        external_id: data.externalID,
        phone: data.phone,
        amount: data.amount,
        items: data.items,
        callback_url: data.callbackURL,
        redirect_url: data.redirectURL,
        ewallet_type: this.EWALLET_TYPE,
      }),
    })
      .then(resolve)
      .catch(reject);
  });
};

module.exports = LinkAja;
