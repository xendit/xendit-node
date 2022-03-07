const REF_ID = 'ref-123';
const BUSINESS_ID = 'fake-BID';
const EXT_ID = '123';
const PAYER_EMAIL = 'dummy@email.co';
const DESCRIPTION = 'Payment for something';
const AMOUNT = 10000;
const INTERVAL = 'MONTH';
const INTERVAL_COUNT = 1;
const PAYMENT_ID = '5e0577bdf4d38b20d542009b';
const SCHEDULE_ID = '5e0577bdf4d38b20d542009b';
const ANCHOR_DATE = new Date().toISOString();
const START_DATE = '2020-01-31T17:00:00.000Z';
const CUSTOMER = {
  given_names: 'stan',
  email: 'dummy@email.co',
  mobile_number: '',
  address: '',
};

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
const SCHEDULE_DETAILS = {
  reference_id: REF_ID,
  interval: INTERVAL,
  business_id: BUSINESS_ID,
  interval_count: INTERVAL_COUNT,
  total_recurrence: INTERVAL_COUNT + 2,
  anchor_date: ANCHOR_DATE,
  retry_interval: INTERVAL,
  retry_interval_count: INTERVAL_COUNT,
  total_retry: INTERVAL_COUNT,
  failed_attempt_notifications: [INTERVAL_COUNT],
};

const UPDATED_AMOUNT = 20000;
const UPDATED_PAYMENT_DETAILS = Object.assign({}, PAYMENT_DETAILS, {
  amount: UPDATED_AMOUNT,
});
const UPDATED_SCHEDULE_DETAILS = Object.assign({}, SCHEDULE_DETAILS, {
  interval: INTERVAL,
  interval_count: INTERVAL_COUNT,
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
  START_DATE,
  UPDATED_AMOUNT,
  UPDATED_PAYMENT_DETAILS,
  CUSTOMER,
  REF_ID,
  BUSINESS_ID,
  SCHEDULE_ID,
  ANCHOR_DATE,
  SCHEDULE_DETAILS,
  UPDATED_SCHEDULE_DETAILS,
};
