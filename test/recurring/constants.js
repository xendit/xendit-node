const EXT_ID = '123';
const PAYER_EMAIL = 'stanley@xendit.co';
const DESCRIPTION = 'Payment for something';
const AMOUNT = 10000;
const INTERVAL = 'MONTH';
const INTERVAL_COUNT = 1;
const PAYMENT_ID = '5e0577bdf4d38b20d542009b';

const PAYMENT_DETAILS = {
  id: PAYMENT_ID,
  external_id: EXT_ID,
  payer_email: PAYER_EMAIL,
  description: DESCRIPTION,
  amount: AMOUNT,
  interval: INTERVAL,
  interval_count: INTERVAL_COUNT,
};

const UPDATED_AMOUNT = 20000;
const UPDATED_PAYMENT_DETAILS = Object.assign({}, PAYMENT_DETAILS, {
  amount: UPDATED_AMOUNT,
});

module.exports = {
  EXT_ID,
  PAYER_EMAIL,
  DESCRIPTION,
  AMOUNT,
  INTERVAL,
  INTERVAL_COUNT,
  PAYMENT_ID,
  PAYMENT_DETAILS,
  UPDATED_AMOUNT,
  UPDATED_PAYMENT_DETAILS,
};
