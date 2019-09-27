const CardStatus = require('../../src/card/card_status');

const VALID_CARD_NUM = '4000000000000002';
const VALID_EXP_MNTH = '12';
const VALID_EXP_YR = '2020';
const VALID_CVN = '123';
const VALID_TOKEN_ID = '5d8c611f6f86303720b1f16f';
const VALID_TOKEN_RESPONSE = {
  id: VALID_TOKEN_ID,
  masked_card_number: '400000XXXXXX0002',
  status: CardStatus.VERIFIED,
};

module.exports = {
  VALID_CARD_NUM,
  VALID_EXP_MNTH,
  VALID_EXP_YR,
  VALID_CVN,
  VALID_TOKEN_ID,
  VALID_TOKEN_RESPONSE,
};
