const EXT_ID = '123';
const AMOUNT = 10000;
const NAME = 'Uvuvwevwevwe Osas';
const ALFMART_RETAIL_OUTLET_NAME = 'ALFAMART';
const FIXED_PAYMENT_CODE_ID = '5e0ed8797bc384e60435ec62';
const UPDATED_AMOUNT = 12000;

const FIXED_PAYMENT_CODE_DETAILS = {
  owner_id: '12121212',
  external_id: EXT_ID,
  retail_outlet_name: ALFMART_RETAIL_OUTLET_NAME,
  prefix: 'XND',
  name: NAME,
  payment_code: 'XND642680',
  type: 'USER',
  expected_amount: AMOUNT,
  status: 'ACTIVE',
  is_single_use: false,
  expiration_date: '2021-10-10T00:00:00.000Z',
  id: FIXED_PAYMENT_CODE_ID,
};

const UPDATED_FIXED_PAYMENT_CODE_DETAILS = Object.assign(
  {},
  FIXED_PAYMENT_CODE_DETAILS,
  {
    expected_amount: UPDATED_AMOUNT,
  },
);

module.exports = {
  EXT_ID,
  AMOUNT,
  NAME,
  ALFMART_RETAIL_OUTLET_NAME,
  FIXED_PAYMENT_CODE_ID,
  UPDATED_AMOUNT,
  FIXED_PAYMENT_CODE_DETAILS,
  UPDATED_FIXED_PAYMENT_CODE_DETAILS,
};
