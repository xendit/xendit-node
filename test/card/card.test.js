process.env.NODE_ENV = 'test';

const chai = require('chai');
const expect = chai.expect;
const dotenv = require('dotenv');
const nock = require('nock');

const Xendit = require('../../src/xendit');

dotenv.config();

const x = new Xendit({
  publicKey: process.env.PUBLIC_KEY,
  secretKey: process.env.SECRET_KEY,
  xenditURL: process.env.XENDIT_URL,
});
const { Card } = x;

describe('Card Service', function() {
  const VALID_CARD_NUM = '4000000000000002';
  const VALID_EXP_MNTH = '12';
  const VALID_EXP_YR = '2020';
  const VALID_CVN = '123';
  const VALID_RESPONSE = {
    id: '5d8c611f6f86303720b1f16f',
    masked_card_number: '400000XXXXXX0002',
    status: Card.Status.VERIFIED,
  };

  before(function() {
    nock(x.opts.xenditURL)
      .post('/credit_card_tokens', {
        card_data: {
          account_number: VALID_CARD_NUM,
          exp_month: VALID_EXP_MNTH,
          exp_year: VALID_EXP_YR,
          cvn: VALID_CVN,
        },
        is_single_use: false,
        should_authenticate: true,
      })
      .reply(200, VALID_RESPONSE);
  });

  let card;
  beforeEach(function() {
    card = new Card({});
  });

  it('should be able to generate token', done => {
    card
      .createToken({
        cardNumber: VALID_CARD_NUM,
        expMonth: VALID_EXP_MNTH,
        expYear: VALID_EXP_YR,
        cardCVN: VALID_CVN,
        isSingleUse: false,
      })
      .then(res => {
        return Promise.all([
          expect(res.id).to.be.equal(VALID_RESPONSE.id),
          expect(res.masked_card_number).to.be.equal(
            VALID_RESPONSE.masked_card_number,
          ),
          expect(res.status).to.be.equal(Card.Status.VERIFIED),
        ]);
      })
      .then(() => done())
      .catch(e => done(e));
  });
});
