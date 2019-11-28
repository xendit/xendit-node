const EXT_ID = '123';
const DESCRIPTION = 'Purchase of something';
const AMT = 100000;
const PAYER_EMAIL = 'example@gmail.com';
const ID = '5ddf9112e4e17325c9917be3';

const VALID_INVOICE = {
  id: ID,
  external_id: EXT_ID,
  amount: AMT,
  payer_email: PAYER_EMAIL,
  description: DESCRIPTION,
};

module.exports = {
  EXT_ID,
  DESCRIPTION,
  PAYER_EMAIL,
  AMT,
  ID,
  VALID_INVOICE,
};
