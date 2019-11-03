const { Validate, Auth, fetchWithHTTPErr, promWithJsErr } = require('../utils');
const errors = require('../errors');

const disbursementCompulsoryFields = [
  'externalID',
  'bankCode',
  'accountHolderName',
  'accountNumber',
  'description',
  'amount',
];

function create(data) {
  return promWithJsErr((resolve, reject) => {
    Validate.rejectOnMissingFields(disbursementCompulsoryFields, data, reject);

    const headers = Auth.basicHeaderWithIdempotencyKey(
      this.opts.secretKey,
      data.xIdempotencyKey,
    );

    fetchWithHTTPErr(`${this.API_ENDPOINT}/disbursements`, {
      method: 'POST',
      headers,
      body: JSON.stringify(_transformDisbursementForRequestBody(data)),
    })
      .then(resolve)
      .catch(reject);
  });
}

function createBatch(data) {
  return promWithJsErr((resolve, reject) => {
    const compulsoryFields = ['reference', 'disbursements'];
    Validate.rejectOnMissingFields(compulsoryFields, data, reject);
    if (!Array.isArray(data.disbursements) || data.disbursements.length <= 0) {
      reject({
        status: 400,
        code: errors.API_VALIDATION_ERROR,
        message: '`disbursements` should be an array with length > 0',
      });
    }
    data.disbursements.forEach((d, i) => {
      const missingFields = Validate.requiredFields(
        disbursementCompulsoryFields,
      ).validate(d);
      if (missingFields.length > 0) {
        let message = `Missing required fields in disbursements[${i}]: `;
        message += Validate.missingFieldsToStr(missingFields);
        reject({ status: 400, code: errors.API_VALIDATION_ERROR, message });
      }
    });

    const headers = Auth.basicHeaderWithIdempotencyKey(
      this.opts.secretKey,
      data.xIdempotencyKey,
    );

    fetchWithHTTPErr(`${this.API_ENDPOINT}/batch_disbursements`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        reference: data.reference,
        disbursements: data.disbursements.map(
          _transformDisbursementForRequestBody,
        ),
      }),
    })
      .then(resolve)
      .catch(reject);
  });
}

function _transformDisbursementForRequestBody(disbursement) {
  return {
    external_id: disbursement.externalID,
    bank_code: disbursement.bankCode,
    account_holder_name: disbursement.accountHolderName,
    bank_account_name: disbursement.accountHolderName,
    account_number: disbursement.accountNumber,
    bank_account_number: disbursement.accountNumber,
    description: disbursement.description,
    amount: disbursement.amount,
    email_to: disbursement.emailTo,
    email_cc: disbursement.emailCC,
    email_bcc: disbursement.emailBCC,
  };
}

function getByID(data) {
  return promWithJsErr((resolve, reject) => {
    Validate.rejectOnMissingFields(['disbursementID'], data, reject);
    fetchWithHTTPErr(
      `${this.API_ENDPOINT}/disbursements/${data.disbursementID}`,
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
}

function getByExtID(data) {
  return promWithJsErr((resolve, reject) => {
    Validate.rejectOnMissingFields(['externalID'], data, reject);
    fetchWithHTTPErr(
      `${this.API_ENDPOINT}/disbursements?external_id=${data.externalID}`,
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
}

module.exports = { create, createBatch, getByID, getByExtID };
