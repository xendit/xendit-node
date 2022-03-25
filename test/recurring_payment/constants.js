const REF_ID = 'ref-123';
const BUSINESS_ID = 'fake-BID';
const CUSTOMER_ID = 'cust-123';
const CURRENCY = 'IDR';
const EXT_ID = '123';
const PAYER_EMAIL = 'dummy@email.co';
const DESCRIPTION = 'Payment for something';
const AMOUNT = 10000;
const INTERVAL = 'MONTH';
const INTERVAL_COUNT = 1;
const PAYMENT_ID = '5e0577bdf4d38b20d542009b';
const ANCHOR_DATE = new Date().toISOString();
const START_DATE = '2020-01-31T17:00:00.000Z';
const CUSTOMER = {
  given_names: 'stan',
  email: 'dummy@email.co',
  mobile_number: '',
  address: '',
};

const PAYMENT_METHOD_ID = 'pm-123';

const UPDATED_AMOUNT = 20000;

const PAYMENT_DETAILS = {
  id: PAYMENT_ID,
  external_id: EXT_ID,
  payer_email: PAYER_EMAIL,
  description: DESCRIPTION,
  amount: AMOUNT,
  interval: INTERVAL,
  interval_count: INTERVAL_COUNT,
  start_date: START_DATE,
  customer: CUSTOMER,
};

const UPDATED_PAYMENT_DETAILS = Object.assign({}, PAYMENT_DETAILS, {
  amount: UPDATED_AMOUNT,
});

module.exports = {
  PAYMENT_METHOD_ID,
  CUSTOMER_ID,
  CURRENCY,
  EXT_ID,
  PAYER_EMAIL,
  DESCRIPTION,
  AMOUNT,
  INTERVAL,
  INTERVAL_COUNT,
  PAYMENT_ID,
  PAYMENT_DETAILS,
  START_DATE,
  UPDATED_AMOUNT,
  UPDATED_PAYMENT_DETAILS,
  CUSTOMER,
  REF_ID,
  BUSINESS_ID,
  ANCHOR_DATE,
};
