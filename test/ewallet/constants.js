const OVO_EWALLET_TYPE = 'OVO';
const DANA_EWALLET_TYPE = 'DANA';
const LINKAJA_EWALLET_TYPE = 'LINKAJA';

const EXT_ID = '123';
const PHONE = '081234567890';
const AMOUNT = 10000;
const CALLBACK_URL = 'https://yourwebsite.com/callback';
const REDIRECT_URL = 'https://yourwebsite.com/order/123';
const REFERENCE_ID = 'test-reference-id';
const CURRENCY = 'IDR';
const CHECKOUT_METHOD = 'ONE_TIME_PAYMENT';
const CHANNEL_CODE = 'ID_OVO';
const CHARGE_ID = 'ewc_f3925450-5c54-4777-98c1-fcf22b0d1e1c';
const CUSTOMER_ID = '0e0dc5ee-0057-45c4-bd32-e6294348e6cc';
const LINKED_ACCOUNT_TOKEN_ID = 'lat-531ad3f6-6c03-4b78-b084-c4fe9a14fbe7';
const LINKED_ACCOUNT_ID = 'la-ddf78482-ca60-473b-91d1-eb87729a1606';
const PAYMENT_METHOD_ID = 'pm-3d375a3e-7e9d-4727-b5c5-bff92fbb80c9';
const SUCCESS_REDIRECT_URL = 'https://www.google.com';
const FAILURE_REDIRECT_URL = 'https://www.google.com';
const ITEMS = [
  {
    id: '123123',
    name: 'Phone Case',
    price: 100000,
    quantity: 1,
  },
  {
    id: '345678',
    name: 'Powerbank',
    price: 200000,
    quantity: 1,
  },
];

const VALID_CREATE_OVO_RESPONSE = {
  transaction_date: String(new Date()),
  amount: AMOUNT,
  external_id: EXT_ID,
  ewallet_type: OVO_EWALLET_TYPE,
  business_id: '12121212',
};

const VALID_GET_OVO_PAYMENT_STATUS_RESPONSE = {
  external_id: EXT_ID,
  amount: AMOUNT,
  transaction_date: String(new Date()),
  business_id: '12121212',
  ewallet_type: OVO_EWALLET_TYPE,
  status: 'COMPLETED',
};

const VALID_EWALLET_PAYMENT_CHARGE = {
  id: CHARGE_ID,
  business_id: 'business-id-example',
  reference_id: REFERENCE_ID,
  status: 'PENDING',
  currency: CURRENCY,
  charge_amount: AMOUNT,
  capture_amount: AMOUNT,
  checkout_method: CHECKOUT_METHOD,
  channel_code: CHANNEL_CODE,
  channel_properties: {
    mobile_number: PHONE,
  },
  actions: {
    desktop_web_checkout_url: null,
    mobile_web_checkout_url: null,
    mobile_deeplink_checkout_url: 'https://mobile.deeplink.checkout.url',
    qr_checkout_string: 'test-qr-string',
  },
  is_redirect_required: true,
  callback_url: REDIRECT_URL,
  created: '2021-02-09T06:22:35.064408Z',
  updated: '2021-02-09T06:22:35.064408Z',
  voided_at: null,
  capture_now: true,
  customer_id: null,
  payment_method_id: null,
  failure_code: null,
  basket: null,
  metadata: null,
};

const VALID_CREATE_PAYMENT_METHOD_RESPONSE = {
  id: PAYMENT_METHOD_ID,
  customer_id: CUSTOMER_ID,
  type: 'EWALLET',
  status: 'ACTIVE',
  properties: {
    id: LINKED_ACCOUNT_ID,
  },
  metadata: {},
  created: '2021-02-03T02:56:38.856Z',
  updated: '2021-02-03T02:56:38.856Z',
};

const VALID_PAYMENT_METHOD_ARRAY = [
  VALID_CREATE_PAYMENT_METHOD_RESPONSE,
  VALID_CREATE_PAYMENT_METHOD_RESPONSE,
];

const VALID_INITIALIZE_TOKENIZATION_RESPONSE = {
  id: LINKED_ACCOUNT_TOKEN_ID,
  customer_id: CUSTOMER_ID,
  channel_code: 'PH_GRABPAY',
  authorization_url: 'https://www.google.com',
  status: 'PENDING',
  metadata: null,
};

const VALID_UNLINK_TOKENIZATION_RESPONSE = {
  id: LINKED_ACCOUNT_TOKEN_ID,
  is_deleted: true,
};

module.exports = {
  OVO_EWALLET_TYPE,
  DANA_EWALLET_TYPE,
  LINKAJA_EWALLET_TYPE,
  EXT_ID,
  PHONE,
  AMOUNT,
  CALLBACK_URL,
  REDIRECT_URL,
  REFERENCE_ID,
  CURRENCY,
  CHECKOUT_METHOD,
  CHANNEL_CODE,
  CHARGE_ID,
  CUSTOMER_ID,
  LINKED_ACCOUNT_ID,
  LINKED_ACCOUNT_TOKEN_ID,
  SUCCESS_REDIRECT_URL,
  FAILURE_REDIRECT_URL,
  ITEMS,
  VALID_CREATE_PAYMENT_METHOD_RESPONSE,
  VALID_PAYMENT_METHOD_ARRAY,
  VALID_CREATE_OVO_RESPONSE,
  VALID_GET_OVO_PAYMENT_STATUS_RESPONSE,
  VALID_EWALLET_PAYMENT_CHARGE,
  VALID_INITIALIZE_TOKENIZATION_RESPONSE,
  VALID_UNLINK_TOKENIZATION_RESPONSE,
};
