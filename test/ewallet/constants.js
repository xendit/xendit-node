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
  ITEMS,
  VALID_CREATE_OVO_RESPONSE,
  VALID_GET_OVO_PAYMENT_STATUS_RESPONSE,
  VALID_EWALLET_PAYMENT_CHARGE,
};
