const VALID_BANKS_RESPONSE = [
  {
    name: 'Bank Central Asia (BCA)',
    code: 'BCA',
    can_disburse: true,
    can_name_validate: true,
  },
  {
    name: 'Bank Danamon',
    code: 'DANAMON',
    can_disburse: true,
    can_name_validate: true,
  },
  {
    name: 'Bank Artha Graha International',
    code: 'ARTHA',
    can_disburse: true,
    can_name_validate: true,
  },
];
const EXT_ID = '123';
const BANK_CODE = 'BCA';
const ACC_HOLDER_NAME = 'Stan';
const ACC_NUMBER = '1234567890';
const DESCRIPTION = 'Purchase of something';
const AMOUNT = 10000;
const ID = '5dba923cf6977e002259377c';
const REF = '111';
const VALID_CREATE_RESPONSE = {
  status: 'PENDING',
  user_id: '5d88f30005827c2cbd6a0d81',
  external_id: EXT_ID,
  amount: AMOUNT,
  bank_code: BANK_CODE,
  account_holder_name: ACC_HOLDER_NAME,
  disbursement_description: DESCRIPTION,
  id: ID,
};
const VALID_BATCH_RESPONSE = {
  status: 'NEEDS_APPROVAL',
  reference: REF,
  total_uploaded_amount: AMOUNT,
  total_uploaded_count: 1,
  created: '2019-10-31T07:52:38.504Z',
  id: '5dba92c6f6977e002259377e',
};

module.exports = {
  VALID_BANKS_RESPONSE,
  EXT_ID,
  BANK_CODE,
  ACC_HOLDER_NAME,
  ACC_NUMBER,
  DESCRIPTION,
  AMOUNT,
  ID,
  REF,
  VALID_CREATE_RESPONSE,
  VALID_BATCH_RESPONSE,
};
