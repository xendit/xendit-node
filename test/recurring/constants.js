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
const SCHEDULE_ID = '5e0577bdf4d38b20d542009b';
const ANCHOR_DATE = new Date().toISOString();
const START_DATE = '2020-01-31T17:00:00.000Z';
const UPDATE_SCHEDULED_CYCLE = 'false';
const CUSTOMER = {
  given_names: 'stan',
  email: 'dummy@email.co',
  mobile_number: '',
  address: '',
};
const PAYMENT_METHOD_ID = 'pm-123';
const UPDATED_AMOUNT = 20000;

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

const UPDATED_SCHEDULE_DETAILS = Object.assign({}, SCHEDULE_DETAILS, {
  interval_count: INTERVAL_COUNT + 1,
});

const PLAN_ID = 'repl-123';

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

const UPDATED_PLAN_DETAILS = Object.assign({}, PLAN_DETAILS, {
  amount: UPDATED_AMOUNT,
});

const CYCLE_ID = 'recy-1234';
const SCHEDULED_TIMESTAMP = new Date(Date.now() + 60 * 1000).toISOString();
const CYCLE_DETAILS = {
  id: CYCLE_ID,
  type: 'IMMEDIATE',
  reference_id: REF_ID,
  plan_id: PLAN_ID,
  customer_id: CUSTOMER_ID,
  recurring_action: 'PAYMENT',
  attempt_count: 1,
  cycle_number: 1,
  attempt_details: [],
  status: 'PENDING',
  scheduled_timestamp: new Date().toISOString(),
  created: new Date().toISOString(),
  updated: new Date().toISOString(),
  currency: CURRENCY,
  amount: AMOUNT,
  metadata: { foo: 'bar' },
};

const UPDATED_CYCLE_DETAILS = Object.assign({}, CYCLE_DETAILS, {
  amount: UPDATED_AMOUNT,
});

const CYCLES_FILTER = {
  limit: 10,
  afterId: 'recy-987',
  beforeId: 'recy-087',
  search_type_id: 'id',
  search_type_reference_id: 'reference_id',
  search_value_id: CYCLE_ID,
  search_value_reference_id: REF_ID,
};

module.exports = {
  CUSTOMER_ID,
  CURRENCY,
  PLAN_DETAILS,
  PLAN_ID,
  EXT_ID,
  PAYER_EMAIL,
  DESCRIPTION,
  AMOUNT,
  INTERVAL,
  INTERVAL_COUNT,
  PAYMENT_ID,
  PAYMENT_METHOD_ID,
  START_DATE,
  UPDATED_AMOUNT,
  UPDATED_PLAN_DETAILS,
  CUSTOMER,
  REF_ID,
  BUSINESS_ID,
  SCHEDULE_ID,
  ANCHOR_DATE,
  SCHEDULE_DETAILS,
  UPDATED_SCHEDULE_DETAILS,
  CYCLE_ID,
  CYCLE_DETAILS,
  SCHEDULED_TIMESTAMP,
  UPDATED_CYCLE_DETAILS,
  UPDATE_SCHEDULED_CYCLE,
  CYCLES_FILTER,
};
