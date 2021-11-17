const EXT_ID = 'qris_merchant_reference_id';
const TYPE = 'DYNAMIC';
const AMOUNT = 10000;
const CALLBACK_URL = 'https://yourwebsite.com/callback';
const VALID_CREATE_CODE_RESPONSE = {
  id: 'qr_8182837te-87st-49ing-8696-1239bd4d759c',
  external_id: EXT_ID,
  amount: AMOUNT,
  qr_string:
    '0002010102##########CO.XENDIT.WWW011893600#######14220002152#####414220' +
    '010303TTT####015CO.XENDIT.WWW02180000000000000000000TTT52045######ID5' +
    '911XenditQRIS6007Jakarta6105121606##########3k1mOnF73h11111111#3k1mOnF73' +
    'h6v53033605401163040BDB',
  merchant_callback_url: CALLBACK_URL,
  type: TYPE,
  status: 'ACTIVE',
  metadata: null,
  created: '2020-01-08T18:18:18.661Z',
  updated: '2020-01-08T18:18:18.661Z',
};
const VALID_PAYMENT = {
  id: 'qrpy_8182837te-87st-49ing-8696-1239bd4d759c',
  amount: AMOUNT,
  created: '2020-01-08T18:18:18.857Z',
  qr_code: {
    id: 'qr_8182837te-87st-49ing-8696-1239bd4d759c',
    external_id: EXT_ID,
    qr_string:
      '0002010102##########CO.XENDIT.WWW011893600#######14220002152#####4' +
      '14220010303TTT####015CO.XENDIT.WWW02180000000000000000000TTT52045##' +
      '####ID5911XenditQRIS6007Jakarta6105121606##########3k1mOnF73h111111' +
      '11#3k1mOnF73h6v53033605401163040BDB',
    type: TYPE,
  },
  status: 'COMPLETED',
  metadata: null,
};
const VALID_PAYMENT_ARRAY = [VALID_PAYMENT, VALID_PAYMENT];

module.exports = {
  EXT_ID,
  TYPE,
  AMOUNT,
  CALLBACK_URL,
  VALID_CREATE_CODE_RESPONSE,
  VALID_PAYMENT,
  VALID_PAYMENT_ARRAY,
};
