const OVO_EWALLET_TYPE = 'OVO';
const DANA_EWALLET_TYPE = 'DANA';
const LINKAJA_EWALLET_TYPE = 'LINKAJA';

const EXT_ID = '123';
const PHONE = '081234567890';
const AMOUNT = 10000;
const CALLBACK_URL = 'https://yourwebsite.com/callback';
const REDIRECT_URL = 'https://yourwebsite.com/order/123';
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

const VALID_CREATE_DANA_RESPONSE = {
  external_id: EXT_ID,
  checkout_url:
    'https://dana.id/m/portal/cashier/checkout?id=a1b2c3d4e5f6g7h8i9j10k11',
  amount: AMOUNT,
  ewallet_type: DANA_EWALLET_TYPE,
};

const VALID_GET_DANA_PAYMENT_STATUS_RESPONSE = {
  amount: EXT_ID,
  external_id: EXT_ID,
  expiration_date: String(new Date()),
  business_id: '12121212',
  status: 'PAID',
};

const VALID_CREATE_LINKAJA_RESPONSE = {
  checkout_url:
    'https://ewallet-linkaja.xendit.co/checkouts/75d64796-c9e7-46e9-8c96-3edeacf3817b',
  transaction_date: String(new Date()),
  amount: 30000,
  external_id: EXT_ID,
  ewallet_type: LINKAJA_EWALLET_TYPE,
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
  ITEMS,
  VALID_CREATE_OVO_RESPONSE,
  VALID_GET_OVO_PAYMENT_STATUS_RESPONSE,
  VALID_CREATE_DANA_RESPONSE,
  VALID_GET_DANA_PAYMENT_STATUS_RESPONSE,
  VALID_CREATE_LINKAJA_RESPONSE,
};
