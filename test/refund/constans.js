const CREATE_REFUND_SUCCESS_RESPONSE = {
  id: 'rfd-6f4a377d-a201-437f-9119-f8b00cbbe857',
  payment_id: 'ddpy-3cd658ae-25b9-4659-aa36-596ae41a809f',
  invoice_id: null,
  amount: 10000,
  payment_method_type: 'DIRECT_DEBIT',
  channel_code: 'BPI',
  currency: 'PHP',
  status: 'SUCCEEDED',
  reason: 'CANCELLATION',
  reference_id: 'b2756a1e-e6cd-4352-9a68-0483aa2b6a2',
  failure_code: null,
  refund_fee_amount: null,
  created: '2020-08-30T09:12:33.001Z',
  updated: '2020-08-30T09:12:33.001Z',
  metadata: null,
};

const LIST_REFUNDS_SUCCESS_RESPONSE = {
  data: [
    {
      id: 'rfd-6f4a377d-a201-437f-9119-f8b00cbbe857',
      payment_id: 'ddpy-3cd658ae-25b9-4659-aa36-596ae41a809f',
      invoice_id: null,
      amount: 10000,
      payment_method_type: 'DIRECT_DEBIT',
      channel_code: 'BPI',
      currency: 'PHP',
      status: 'SUCCEEDED',
      reason: 'CANCELLATION',
      reference_id: 'b2756a1e-e6cd-4352-9a68-0483aa2b6a2',
      failure_code: null,
      refund_fee_amount: null,
      created: '2020-08-30T09:12:33.001Z',
      updated: '2020-08-30T09:12:33.001Z',
      metadata: null,
    },
  ],
  links: [
    {
      href:
        "/refunds?after_id='rfd-7a836151-7a2c-4cc9-b158-07a617cc0e3a'&limit=10",
      rel: 'first',
      method: 'GET',
    },
  ],
  has_more: true,
};

const GET_REFUND_BY_ID_RESPONSE = {
  id: 'rfd-6f4a377d-a201-437f-9119-f8b00cbbe857',
  payment_id: 'ddpy-3cd658ae-25b9-4659-aa36-596ae41a809f',
  invoice_id: null,
  amount: 10000,
  payment_method_type: 'DIRECT_DEBIT',
  channel_code: 'BPI',
  currency: 'PHP',
  status: 'SUCCEEDED',
  reason: 'CANCELLATION',
  reference_id: 'b2756a1e-e6cd-4352-9a68-0483aa2b6a2',
  failure_code: null,
  refund_fee_amount: null,
  created: '2020-08-30T09:12:33.001Z',
  updated: '2020-08-30T09:12:33.001Z',
  metadata: null,
};

module.exports = {
  CREATE_REFUND_SUCCESS_RESPONSE,
  LIST_REFUNDS_SUCCESS_RESPONSE,
  GET_REFUND_BY_ID_RESPONSE,
};
