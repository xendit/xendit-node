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
};
