const VALID_VA_BANKS_RESPONSE = [
  { name: 'Bank Mandiri', code: 'MANDIRI' },
  { name: 'Bank Negara Indonesia', code: 'BNI' },
];
const EXT_ID = '123';
const BANK_CODE = 'BNI';
const NAME = 'Uvuvwevwevwe Osas';
const VA_ID = '57f6fbf26b9f064272622aa6';
const VA_DETAILS = {
  id: VA_ID,
  bank_code: BANK_CODE,
  name: NAME,
  external_id: EXT_ID,
};
const EXPECTED_AMT = 50;
const UPDATED_VA_DETAILS = Object.assign({}, VA_DETAILS, {
  expected_amount: EXPECTED_AMT,
});
const PAYMENT_ID = '1502450097080';
const PAYMENT_DETAILS = {
  id: VA_ID,
  payment_id: PAYMENT_ID,
  external_id: EXT_ID,
  bank_code: BANK_CODE,
};

module.exports = {
  VALID_VA_BANKS_RESPONSE,
  EXT_ID,
  BANK_CODE,
  NAME,
  VA_DETAILS,
  VA_ID,
  UPDATED_VA_DETAILS,
  EXPECTED_AMT,
  PAYMENT_ID,
  PAYMENT_DETAILS,
};
