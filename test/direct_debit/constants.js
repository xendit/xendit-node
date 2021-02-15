const TOKEN_ID = 'lat-f274979c-8f79-4317-915d-1ffc194a924a';
const CUSTOMER_ID = 'd32d1a7f-1ed9-4ab2-a502-f7e636ce69da';
const CHANNEL_CODE = 'DC_BRI';
const ACCOUNT_ID = 'la-c0eadde1-1d75-4e81-9767-4e54b50580a9';
const ACCOUNT_MOBILE_NUMBER = '+62818555988';
const CARD_EXPIRY = '06/24';
const CARD_LAST_FOUR = '8888';
const ACCOUNT_EMAIL = 'test.email@xendit.co';
const CURRENCY = 'IDR';
const LINKED_ACCOUNT_OTP_CODE = '333000';
const DIRECT_DEBIT_PAYMENT_OTP_CODE = '222000';
const PAYMENT_METHOD_ID = 'pm-8c09656d-09fe-4bdd-bd8d-87495a71d231';
const IDEMPOTENCY_KEY = '7960e3fd-9a1d-469d-8b3e-2f88df139c50';
const REFERENCE_ID = 'merchant-ref-id-ex-1';
const DIRECT_DEBIT_PAYMENT_ID = 'ddpy-b4b6f301-5008-4c32-91b1-418ac04dfd10';
const AMOUNT = 15000;
const PAYMENT_CALLBACK_URL = 'https://payment-callback-listener/';
const COUNTRY_CODE = 'ID';
const PRODUCT_TYPE = 'product type';
const VALID_INITIALIZE_TOKENIZATION_RESPONSE = {
  id: TOKEN_ID,
  customer_id: CUSTOMER_ID,
  channel_code: CHANNEL_CODE,
  authorizer_url: null,
  status: 'PENDING',
  metadata: null,
};
const VALID_VALIDATED_ACCOUNT_RESPONSE = {
  id: TOKEN_ID,
  customer_id: CUSTOMER_ID,
  channel_code: CHANNEL_CODE,
  status: 'SUCCESS',
  metadata: null,
};
const VALID_RETRIEVE_ACCOUNT_RESPONSE = {
  channel_code: CHANNEL_CODE,
  id: ACCOUNT_ID,
  properties: {
    card_expiry: CARD_EXPIRY,
    card_last_four: CARD_LAST_FOUR,
    currency: CURRENCY,
    description: '',
  },
  type: 'DEBIT_CARD',
};
const VALID_ACCOUNT_ARRAY = [
  VALID_RETRIEVE_ACCOUNT_RESPONSE,
  VALID_RETRIEVE_ACCOUNT_RESPONSE,
];
const VALID_CREATE_PAYMENT_METHOD_RESPONSE = {
  customer_id: CUSTOMER_ID,
  type: 'DEBIT_CARD',
  properties: {
    id: ACCOUNT_ID,
    currency: CURRENCY,
    card_expiry: CARD_EXPIRY,
    description: '',
    channel_code: CHANNEL_CODE,
    card_last_four: CARD_LAST_FOUR,
  },
  status: 'ACTIVE',
  metadata: {},
  id: PAYMENT_METHOD_ID,
  created: '2021-02-03T02:56:38.856Z',
  updated: '2021-02-03T02:56:38.856Z',
};
const VALID_PAYMENT_METHOD_ARRAY = [
  VALID_CREATE_PAYMENT_METHOD_RESPONSE,
  VALID_CREATE_PAYMENT_METHOD_RESPONSE,
];
const VALID_CREATE_DIRECT_DEBIT_PAYMENT_RESPONSE = {
  failure_code: null,
  otp_mobile_number: null,
  otp_expiration_timestamp: null,
  id: DIRECT_DEBIT_PAYMENT_ID,
  reference_id: REFERENCE_ID,
  payment_method_id: PAYMENT_METHOD_ID,
  channel_code: CHANNEL_CODE,
  currency: CURRENCY,
  amount: AMOUNT,
  is_otp_required: true,
  basket: [
    {
      reference_id: 'product-ref-id-ex-1',
      name: 'product 1',
      market: COUNTRY_CODE,
      description: '',
      type: PRODUCT_TYPE,
      category: '',
      sub_category: '',
      price: 0,
      url: '',
      metadata: null,
      quatity: 0,
    },
    {
      reference_id: 'product-ref-id-ex-2',
      name: 'product 2',
      market: COUNTRY_CODE,
      description: '',
      type: PRODUCT_TYPE,
      category: '',
      sub_category: '',
      price: 0,
      url: '',
      metadata: null,
      quatity: 0,
    },
  ],
  description: '',
  status: 'PENDING',
  metadata: null,
  created: '2021-02-03T04:15:07.977269Z',
  updated: '2021-02-03T04:15:07.977269Z',
};
const VALID_VALIDATED_DIRECT_DEBIT_PAYMENT_RESPONSE = {
  failure_code: null,
  otp_mobile_number: null,
  otp_expiration_timestamp: null,
  id: DIRECT_DEBIT_PAYMENT_ID,
  reference_id: REFERENCE_ID,
  payment_method_id: PAYMENT_METHOD_ID,
  channel_code: CHANNEL_CODE,
  currency: CURRENCY,
  amount: AMOUNT,
  is_otp_required: true,
  basket: [
    {
      reference_id: 'product-ref-id-ex-1',
      name: 'product 1',
      market: COUNTRY_CODE,
      description: '',
      type: PRODUCT_TYPE,
      category: '',
      sub_category: '',
      price: 0,
      url: '',
      metadata: null,
      quatity: 0,
    },
    {
      reference_id: 'product-ref-id-ex-2',
      name: 'product 2',
      market: COUNTRY_CODE,
      description: '',
      type: PRODUCT_TYPE,
      category: '',
      sub_category: '',
      price: 0,
      url: '',
      metadata: null,
      quatity: 0,
    },
  ],
  description: '',
  status: 'COMPLETED',
  metadata: null,
  created: '2021-02-03T04:15:07.977269Z',
  updated: '2021-02-03T04:15:07.977269Z',
};
const VALID_DIRECT_DEBIT_PAYMENT_ARRAY = [
  VALID_VALIDATED_DIRECT_DEBIT_PAYMENT_RESPONSE,
  VALID_VALIDATED_DIRECT_DEBIT_PAYMENT_RESPONSE,
];

module.exports = {
  TOKEN_ID,
  CUSTOMER_ID,
  CHANNEL_CODE,
  ACCOUNT_ID,
  ACCOUNT_MOBILE_NUMBER,
  CARD_EXPIRY,
  CARD_LAST_FOUR,
  ACCOUNT_EMAIL,
  CURRENCY,
  LINKED_ACCOUNT_OTP_CODE,
  DIRECT_DEBIT_PAYMENT_OTP_CODE,
  PAYMENT_METHOD_ID,
  IDEMPOTENCY_KEY,
  REFERENCE_ID,
  DIRECT_DEBIT_PAYMENT_ID,
  AMOUNT,
  PAYMENT_CALLBACK_URL,
  COUNTRY_CODE,
  PRODUCT_TYPE,
  VALID_INITIALIZE_TOKENIZATION_RESPONSE,
  VALID_VALIDATED_ACCOUNT_RESPONSE,
  VALID_RETRIEVE_ACCOUNT_RESPONSE,
  VALID_ACCOUNT_ARRAY,
  VALID_CREATE_PAYMENT_METHOD_RESPONSE,
  VALID_PAYMENT_METHOD_ARRAY,
  VALID_CREATE_DIRECT_DEBIT_PAYMENT_RESPONSE,
  VALID_VALIDATED_DIRECT_DEBIT_PAYMENT_RESPONSE,
  VALID_DIRECT_DEBIT_PAYMENT_ARRAY,
};
