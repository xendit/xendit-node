const CUSTOMER_ID = 'ccf51fe5-b715-4d28-b28b-cec420f3e96f';
const REFERENCE_ID = 'customer-reference-id-example';
const GIVEN_NAMES = 'customer 1';
const EMAIL = 'customer@website.com';
const MOBILE_NUMBER = '+6281212345678';
const MIDDLE_NAME = 'middle';
const SURNAME = 'surname';
const VALID_CREATE_CUSTOMER_RESPONSE = {
  id: CUSTOMER_ID,
  reference_id: REFERENCE_ID,
  given_names: GIVEN_NAMES,
  email: EMAIL,
  mobile_number: MOBILE_NUMBER,
  description: 'dummy customer',
  middle_name: MIDDLE_NAME,
  surname: SURNAME,
  phone_number: null,
  nationality: null,
  date_of_birth: null,
  metadata: null,
  employment: null,
  addresses: null,
  source_of_wealth: null,
};
const VALID_CUSTOMER = {
  id: CUSTOMER_ID,
  reference_id: REFERENCE_ID,
  given_names: GIVEN_NAMES,
  email: EMAIL,
  mobile_number: MOBILE_NUMBER,
  description: 'customer dummy',
  middle_name: MIDDLE_NAME,
  surname: SURNAME,
  phone_number: '+628987654321',
  nationality: 'ID',
  date_of_birth: '2000-06-13T00:00:00.000Z',
  metadata: null,
  employment: null,
  addresses: [
    {
      address_id: '9b28de5e-57b2-4072-896a-72995a5802cd',
      country_code: 'ID',
      state: null,
      province: null,
      city: 'Jakarta',
      suburb: null,
      line_1: 'jalan raya 2',
      line_2: null,
      created: '2021-02-01T06:35:13.536Z',
      zip_code: null,
      category: null,
      is_preferred: false,
      meta: null,
      status: 'ACTIVE',
      updated: '2021-02-01T06:35:13.536Z',
    },
    {
      address_id: '95a9346b-adae-4dd1-aeaf-1a961eda2cb2',
      country_code: 'ID',
      state: null,
      province: null,
      city: 'Jakarta',
      suburb: null,
      line_1: 'jalan raya',
      line_2: null,
      created: '2021-02-01T06:35:13.536Z',
      zip_code: null,
      category: null,
      is_preferred: false,
      meta: null,
      status: 'ACTIVE',
      updated: '2021-02-01T06:35:13.536Z',
    },
  ],
  source_of_wealth: null,
};
const VALID_CUSTOMER_ARRAY = [VALID_CUSTOMER, VALID_CUSTOMER];

module.exports = {
  CUSTOMER_ID,
  REFERENCE_ID,
  GIVEN_NAMES,
  EMAIL,
  MOBILE_NUMBER,
  MIDDLE_NAME,
  SURNAME,
  VALID_CREATE_CUSTOMER_RESPONSE,
  VALID_CUSTOMER,
  VALID_CUSTOMER_ARRAY,
};
