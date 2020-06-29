const { promWithJsErr, fetchWithHTTPErr, Auth, Validate } = require('../utils');

const QR_CODE_PATH = '/qr_codes';

function QrCode(options) {
  let aggOpts = options;
  if (QrCode._injectedOpts && Object.keys(QrCode._injectedOpts).length > 0) {
    aggOpts = Object.assign({}, options, QrCode._injectedOpts);
  }

  this.opts = aggOpts;
  this.API_ENDPOINT = this.opts.xenditURL + QR_CODE_PATH;
}

QrCode._injectedOpts = {};
QrCode._constructorWithInjectedXenditOpts = function(options) {
  QrCode._injectedOpts = options;
  return QrCode;
};
QrCode.Type = {
  Dynamic: 'DYNAMIC',
  Static: 'STATIC',
};

QrCode.prototype.createCode = function(data) {
  return promWithJsErr((resolve, reject) => {
    const compulsoryFields = ['externalID', 'type', 'callbackURL'];
    if (data.type === QrCode.Type.Dynamic) {
      compulsoryFields.push('amount');
    }
    Validate.rejectOnMissingFields(compulsoryFields, data, reject);

    fetchWithHTTPErr(`${this.API_ENDPOINT}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: Auth.basicAuthHeader(this.opts.secretKey),
      },
      body: JSON.stringify({
        external_id: data.externalID,
        type: data.type,
        callback_url: data.callbackURL,
        amount: data.amount,
      }),
    })
      .then(resolve)
      .catch(reject);
  });
};

QrCode.prototype.getCode = function(data) {
  return promWithJsErr((resolve, reject) => {
    Validate.rejectOnMissingFields(['externalID'], data, reject);

    fetchWithHTTPErr(`${this.API_ENDPOINT}/${data.externalID}`, {
      method: 'GET',
      headers: { Authorization: Auth.basicAuthHeader(this.opts.secretKey) },
    })
      .then(resolve)
      .catch(reject);
  });
};

QrCode.prototype.simulate = function(data) {
  return promWithJsErr((resolve, reject) => {
    Validate.rejectOnMissingFields(['externalID'], data, reject);

    fetchWithHTTPErr(
      `${this.API_ENDPOINT}/${data.externalID}/payments/simulate`,
      {
        method: 'POST',
        headers: { Authorization: Auth.basicAuthHeader(this.opts.secretKey) },
        body: JSON.stringify({ amount: data.amount }),
      },
    )
      .then(resolve)
      .catch(reject);
  });
};

module.exports = QrCode;
