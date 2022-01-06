const {
  Validate,
  Auth,
  fetchWithHTTPErr,
  promWithJsErr,
  queryStringWithoutUndefined,
} = require('../utils');
const errors = require('../errors');

function createPayment(data) {
  const Type = Object.freeze({ OVO: 'OVO', Dana: 'DANA', LinkAja: 'LINKAJA' });
  return promWithJsErr((resolve, reject) => {
    let compulsoryFields = ['ewalletType'];

    if (data.ewalletType) {
      switch (data.ewalletType) {
        case Type.OVO:
          compulsoryFields = ['externalID', 'amount', 'phone', 'ewalletType'];
          break;
        case Type.Dana:
          compulsoryFields = [
            'externalID',
            'amount',
            'callbackURL',
            'redirectURL',
            'ewalletType',
          ];
          break;
        case Type.LinkAja:
          compulsoryFields = [
            'externalID',
            'phone',
            'amount',
            'items',
            'callbackURL',
            'redirectURL',
            'ewalletType',
          ];
          break;
        default:
          reject({
            status: 400,
            code: errors.API_VALIDATION_ERROR,
            message: 'Invalid EWallet Type',
          });
      }
    }

    Validate.rejectOnMissingFields(compulsoryFields, data, reject);

    const headers = {
      'Content-Type': 'application/json',
      Authorization: Auth.basicAuthHeader(this.opts.secretKey),
    };
    if (data.xApiVersion) {
      headers['X-API-VERSION'] = data.xApiVersion;
    }

    fetchWithHTTPErr(this.API_ENDPOINT + '/ewallets', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        external_id: data.externalID,
        amount: data.amount,
        phone: data.phone,
        expiration_date: data.expirationDate
          ? data.expirationDate.toISOString()
          : undefined,
        callback_url: data.callbackURL,
        redirect_url: data.redirectURL,
        items: data.items,
        ewallet_type: data.ewalletType,
      }),
    })
      .then(resolve)
      .catch(reject);
  });
}

function getPayment(data) {
  return promWithJsErr((resolve, reject) => {
    Validate.rejectOnMissingFields(['externalID', 'ewalletType'], data, reject);

    const queryStr = data
      ? queryStringWithoutUndefined({
          external_id: data.externalID,
          ewallet_type: data.ewalletType,
        })
      : '';

    fetchWithHTTPErr(this.API_ENDPOINT + `/ewallets?${queryStr}`, {
      method: 'GET',
      headers: {
        Authorization: Auth.basicAuthHeader(this.opts.secretKey),
      },
    })
      .then(resolve)
      .catch(reject);
  });
}

module.exports = {
  createPayment,
  getPayment,
};
