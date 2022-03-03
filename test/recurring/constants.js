const REF_ID = 'ref-123';
const CUSTOMER_ID = 'cust-123';
const BUSINESS_ID = 'fake-BID';
const CURRENCY = 'IDR';
const EXT_ID = '123';
const PAYER_EMAIL = 'dummy@email.co';
const DESCRIPTION = 'Payment for something';
const AMOUNT = 10000;
const INTERVAL = 'MONTH';
const INTERVAL_COUNT = 1;
const PAYMENT_ID = '5e0577bdf4d38b20d542009b';
const START_DATE = '2020-01-31T17:00:00.000Z';
const CUSTOMER = {
  given_names: 'stan',
  email: 'dummy@email.co',
  mobile_number: '',
  address: '',
};
const SCHEDULE_ID = 'resc-123';
const PLAN_ID = 'repl-123';

const PAYMENT_METHOD_ID = 'pm-123';

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

const PLAN_DETAILS = {
  id: PLAN_ID,
  reference_id: REF_ID,
  business_id: BUSINESS_ID,
  customer_id: CUSTOMER_ID,
  recurring_action: 'PAYMENT',
  recurring_cycle_count: 0,
  currency: 'IDR',
  amount: 1000,
  status: 'SUCCEEDED',
  created: new Date().toISOString(),
  updated: new Date().toISOString(),
  schedule_id: SCHEDULE_ID,
  payment_methods: [],
  immediate_action_type: 'FULL_AMOUNT',
  notification_config: {
    recurring_created: ['email'],
    recurring_succeeded: ['sms'],
    recurring_failed: ['whatsapp'],
  },
  failed_cycle_action: 'RESUME',
  metadata: { foo: 'bar' },
  description: 'baz',
};

const UPDATED_AMOUNT = 20000;
const UPDATED_PAYMENT_DETAILS = Object.assign({}, PAYMENT_DETAILS, {
  amount: UPDATED_AMOUNT,
});
const UPDATED_PLAN_DETAILS = Object.assign({}, PLAN_DETAILS, {
  amount: UPDATED_AMOUNT,
});

module.exports = {
  PAYMENT_METHOD_ID,
  REF_ID,
  CUSTOMER_ID,
  CURRENCY,
  PLAN_DETAILS,
  PLAN_ID,
  SCHEDULE_ID,
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
  UPDATED_PLAN_DETAILS,
  CUSTOMER,
};
