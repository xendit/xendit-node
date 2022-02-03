const ACCOUNT_EMAIL = 'angie@pinkpanther.com';
const ID = '61fb6d4d92b2ff75d2b45059';
const BUSINESS_NAME = 'angies pink panther';
const UPDATED_EMAIL = 'angie_updated@pinkpanther.com';
const UPDATED_BUSINESS_NAME = 'angies updated pink panther';
const TYPE = 'MANAGED';
const URL = 'https://www.xendit.co/callback_catcher';
const CALLBACK_TYPE = 'invoice';
const REFERENCE = 'transfer001';
const SOURCE_USER_ID = '54afeb170a2b18519b1b8768';
const DESTINATION_USER_ID = '5cafeb170a2b1851246b8768';
const AMOUNT = 10000;
const FEE_NAME = 'Standard platform fee';
const ROUTES = [
  {
    unit: 'flat',
    amount: 3000,
    currency: 'IDR',
  },
];

const PUBLIC_PROFILE = {
  business_name: BUSINESS_NAME,
};

const UPDATED_PUBLIC_PROFILE = {
  business_name: UPDATED_BUSINESS_NAME,
};

const VALID_CREATE_ACCOUNT_RESPONSE = {
  created: '2019-01-01T08:51:44.484Z',
  status: 'SUCCESSFUL',
  account_email: ACCOUNT_EMAIL,
  user_id: '57fb4e076fb3fa296b7f5a17',
  type: TYPE,
};

const VALID_SET_CALLBACK_URL_RESPONSE = {
  status: 'SUCCESSFUL',
  user_id: '5e6b30d967627b957de8c123',
  url: URL,
  environment: 'TEST',
  callback_token:
    '66a6680348e1c33ed2b9053a8eb9291b9e2230ff4f4d3057c9f4ac26405d2123',
};

const VALID_CREATE_TRANSFER_RESPONSE = {
  created: '2020-01-01T08:51:44.484Z',
  transfer_id: '60b9d810-d9a3-456c-abbf-2786ec7a9651',
  reference: REFERENCE,
  source_user_id: SOURCE_USER_ID,
  destination_user_id: DESTINATION_USER_ID,
  status: 'SUCCESSFUL',
  amount: AMOUNT,
};

const VALID_CREATE_FEE_RULE_RESPONSE = {
  id: 'xpfeeru_d9e069f2-4da7-4562-93b7-ded87023d749',
  name: FEE_NAME,
  routes: ROUTES,
  created: '2020-09-01T07:00:00.007Z',
  updated: '2020-09-01T07:00:00.007Z',
  metadata: {},
};

const VALID_CREATE_V2_ACCOUNT_RESPONSE = {
  id: ID,
  created: '2022-02-01T07:00:00.000Z',
  updated: '2022-02-01T07:00:00.000Z',
  email: ACCOUNT_EMAIL,
  type: TYPE,
  public_profile: {
    business_name: BUSINESS_NAME,
  },
  country: 'ID',
  status: 'REGISTERED',
};

const VALID_GET_ACCOUNT_RESPONSE = {
  id: ID,
  created: '2022-02-01T07:00:00.000Z',
  updated: '2022-02-01T07:00:00.000Z',
  email: ACCOUNT_EMAIL,
  type: TYPE,
  public_profile: {
    business_name: BUSINESS_NAME,
  },
  country: 'ID',
  status: 'REGISTERED',
};

const VALID_UPDATE_ACCOUNT_RESPONSE = {
  id: ID,
  created: '2022-02-01T07:00:00.000Z',
  updated: '2022-02-01T07:00:00.000Z',
  email: UPDATED_EMAIL,
  type: TYPE,
  public_profile: {
    business_name: UPDATED_BUSINESS_NAME,
  },
  country: 'ID',
  status: 'REGISTERED',
};

module.exports = {
  ID,
  ACCOUNT_EMAIL,
  TYPE,
  UPDATED_EMAIL,
  BUSINESS_NAME,
  UPDATED_BUSINESS_NAME,
  PUBLIC_PROFILE,
  UPDATED_PUBLIC_PROFILE,
  URL,
  CALLBACK_TYPE,
  REFERENCE,
  SOURCE_USER_ID,
  DESTINATION_USER_ID,
  AMOUNT,
  FEE_NAME,
  ROUTES,
  VALID_CREATE_ACCOUNT_RESPONSE,
  VALID_SET_CALLBACK_URL_RESPONSE,
  VALID_CREATE_TRANSFER_RESPONSE,
  VALID_CREATE_FEE_RULE_RESPONSE,
  VALID_CREATE_V2_ACCOUNT_RESPONSE,
  VALID_GET_ACCOUNT_RESPONSE,
  VALID_UPDATE_ACCOUNT_RESPONSE,
};
