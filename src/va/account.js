const { promWithJsErr, Validate, fetchWithHTTPErr, Auth } = require('../utils');

function createFixedVA(data) {
  return promWithJsErr((resolve, reject) => {
    const compulsoryFields = ['externalID', 'bankCode', 'name'];
    Validate.rejectOnMissingFields(compulsoryFields, data, reject);

    let headers = {
      Authorization: Auth.basicAuthHeader(this.opts.secretKey),
      'Content-Type': 'application/json',
    };

    if (data && data.forUserID) {
      headers['for-user-id'] = data.forUserID;
    }

    fetchWithHTTPErr(`${this.API_ENDPOINT}/callback_virtual_accounts`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        external_id: data.externalID,
        bank_code: data.bankCode,
        name: data.name,
        virtual_account_number: data.virtualAccNumber,
        suggested_amount: data.suggestedAmt,
        is_closed: data.isClosed,
        expected_amount: data.expectedAmt,
        expiration_date: data.expirationDate
          ? data.expirationDate.toISOString()
          : undefined,
        is_single_use: data.isSingleUse,
        description: data.description,
      }),
    })
      .then(resolve)
      .catch(reject);
  });
}

function getFixedVA(data) {
  return promWithJsErr((resolve, reject) => {
    Validate.rejectOnMissingFields(['id'], data, reject);

    let headers = {
      Authorization: Auth.basicAuthHeader(this.opts.secretKey),
    };

    if (data && data.forUserID) {
      headers['for-user-id'] = data.forUserID;
    }

    fetchWithHTTPErr(
      `${this.API_ENDPOINT}/callback_virtual_accounts/${data.id}`,
      {
        method: 'GET',
        headers,
      },
    )
      .then(resolve)
      .catch(reject);
  });
}

function updateFixedVA(data) {
  return promWithJsErr((resolve, reject) => {
    Validate.rejectOnMissingFields(['id'], data, reject);

    let headers = {
      Authorization: Auth.basicAuthHeader(this.opts.secretKey),
      'Content-Type': 'application/json',
    };

    if (data && data.forUserID) {
      headers['for-user-id'] = data.forUserID;
    }

    fetchWithHTTPErr(
      `${this.API_ENDPOINT}/callback_virtual_accounts/${data.id}`,
      {
        method: 'PATCH',
        headers,
        body: JSON.stringify({
          suggested_amount: data.suggestedAmt,
          expected_amount: data.expectedAmt,
          expiration_date: data.expirationDate
            ? data.expirationDate.toISOString()
            : undefined,
          is_single_use: data.isSingleUse,
          description: data.description,
        }),
      },
    )
      .then(resolve)
      .catch(reject);
  });
}

module.exports = {
  createFixedVA,
  getFixedVA,
  updateFixedVA,
};
