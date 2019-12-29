const { Validate, Auth, fetchWithHTTPErr, promWithJsErr } = require('../utils');

const OVO_EWALLET_PATH = '';

function OVO(options) {
  let aggOpts = options;
  if (OVO._injectedOpts && Object.keys(OVO._injectedOpts).length > 0) {
    aggOpts = Object.assign({}, options, OVO._injectedOpts);
  }

  this.opts = aggOpts;
  this.API_ENDPOINT = this.opts.eWalletURL + OVO_EWALLET_PATH;
  this.EWALLET_TYPE = 'OVO';
}

OVO._injectedOpts = {};
OVO._constructorWithInjectedEWalletOpts = function(options) {
  OVO._injectedOpts = options;
  return OVO;
};

OVO.prototype.createPayment = function(data) {
  return promWithJsErr((resolve, reject) => {
    Validate.rejectOnMissingFields(
      ['externalID', 'amount', 'phone'],
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
        amount: data.amount,
        phone: data.phone,
        ewallet_type: this.EWALLET_TYPE,
      }),
    })
      .then(resolve)
      .catch(reject);
  });
};

OVO.prototype.getPaymentStatusByExtID = function(data) {
  return promWithJsErr((resolve, reject) => {
    Validate.rejectOnMissingFields(['externalID'], data, reject);
    fetchWithHTTPErr(
      `${this.API_ENDPOINT}?external_id=${data.externalID}&ewallet_type=${this.EWALLET_TYPE}`,
      {
        method: 'GET',
        headers: {
          Authorization: Auth.basicAuthHeader(this.opts.secretKey),
        },
      },
    )
      .then(resolve)
      .catch(reject);
  });
};

module.exports = OVO;
