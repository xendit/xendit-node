const TYPE = 'BALANCE_HISTORY';
const FILTER_DATE_FROM = new Date('2022-01-01T00:00:00.000Z');
const FILTER_DATE_TO = new Date('2022-01-02T00:00:00.000Z');
const FORMAT = 'CSV';
const CURRENCY = 'IDR';

const REPORT_ID = 'report_123123';
const BUSINESS_ID = '123123';
const FILTER = {
  from: FILTER_DATE_FROM.toISOString(),
  to: FILTER_DATE_TO.toISOString(),
};

const GENERATE_REPORT_RESPONSE = {
  id: REPORT_ID,
  type: TYPE,
  status: 'PENDING',
  filter: FILTER,
  format: FORMAT,
  currency: CURRENCY,
  business_id: BUSINESS_ID,
  created: '2022-01-02T00:00:00.000Z',
  updated: '2022-01-02T00:00:00.000Z',
};

const GET_REPORT_RESPONSE = {
  id: REPORT_ID,
  type: TYPE,
  status: 'COMPLETED',
  filter: FILTER,
  format: FORMAT,
  currency: CURRENCY,
  url: 'https://www.google.com',
  business_id: BUSINESS_ID,
  created: '2022-01-02T00:00:00.000Z',
  updated: '2022-01-02T00:00:00.000Z',
};

module.exports = {
  TYPE,
  FILTER,
  FILTER_DATE_FROM,
  FILTER_DATE_TO,
  FORMAT,
  CURRENCY,
  REPORT_ID,
  GENERATE_REPORT_RESPONSE,
  GET_REPORT_RESPONSE,
};
