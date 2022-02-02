const TYPES = ['DISBURSEMENT', 'PAYMENT'];
const STATUSES = ['PENDING', 'SUCCESS'];
const CHANNEL_CATEGORIES = ['BANK'];
const CREATED_DATE_FROM = new Date('2022-01-01T00:00:00.000Z');
const CREATED_DATE_TO = new Date('2022-02-01T00:00:00.000Z');

const TRANSACTION_ID = 'txn_123123';
const QUERY_STRING =
  'types=DISBURSEMENT&types=PAYMENT&statuses=PENDING&statuses=SUCCESS&' +
  'channel_categories=BANK&created[gte]=2022-01-01T00:00:00.000Z&' +
  'created[lte]=2022-02-01T00:00:00.000Z';

const GET_TRANSACTION_RESPONSE = {
  id: TRANSACTION_ID,
  product_id: '1232131',
  type: TYPES[0],
  status: STATUSES[0],
  channel_category: CHANNEL_CATEGORIES[0],
  channel_code: 'BCA',
  reference_id: 'Bank Central Asia (BCA) - BCA single disbursement',
  account_identifier: '123123',
  currency: 'IDR',
  amount: 10000,
  net_amount: 10000,
  cashflow: 'MONEY_OUT',
  business_id: '13123',
  created: '2022-02-01T00:00:00.000Z',
  updated: '2022-02-01T00:00:00.000Z',
  fee: {
    xendit_fee: 0,
    value_added_tax: 0,
    xendit_withholding_tax: 0,
    third_party_withholding_tax: 0,
    status: 'COMPLETED',
  },
};

const ANOTHER_TRANSACTION_RESPONSE = {
  id: TRANSACTION_ID,
  product_id: '1232132131',
  type: TYPES[1],
  status: STATUSES[1],
  channel_category: CHANNEL_CATEGORIES[0],
  channel_code: 'BCA',
  reference_id: 'Bank Central Asia (BCA) - BCA single disbursement',
  account_identifier: '123123',
  currency: 'IDR',
  amount: 100001,
  net_amount: 100001,
  cashflow: 'MONEY_OUT',
  business_id: '13123',
  created: '2022-02-01T00:00:00.000Z',
  updated: '2022-02-01T00:00:00.000Z',
  fee: {
    xendit_fee: 0,
    value_added_tax: 0,
    xendit_withholding_tax: 0,
    third_party_withholding_tax: 0,
    status: 'COMPLETED',
  },
};

const LIST_TRANSACTIONS_RESPONSE = {
  has_more: false,
  data: [GET_TRANSACTION_RESPONSE, ANOTHER_TRANSACTION_RESPONSE],
  links: [],
};

module.exports = {
  TYPES,
  STATUSES,
  CHANNEL_CATEGORIES,
  CREATED_DATE_FROM,
  CREATED_DATE_TO,
  TRANSACTION_ID,
  GET_TRANSACTION_RESPONSE,
  LIST_TRANSACTIONS_RESPONSE,
  QUERY_STRING,
};
