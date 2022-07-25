const chai = require('chai');
const chaiAsProm = require('chai-as-promised');
const TestConstants = require('./constants');
const { expect } = chai;
const nock = require('nock');
const { Errors } = require('../../src/xendit');

chai.use(chaiAsProm);

module.exports = function(x) {
  const { Card } = x;
  let card;
  beforeEach(function() {
    card = new Card({});
  });
  before(function() {
    nock(x.opts.xenditURL)
      .post('/promotions', {
        reference_id: TestConstants.VALID_PROMOTION_REF_ID,
        description: TestConstants.VALID_PROMOTION_DESCRIPTION,
        promo_code: TestConstants.VALID_PROMOTION_PROMO_CODE,
        bin_list: TestConstants.VALID_PROMOTION_BIN_LIST,
        channel_code: TestConstants.VALID_PROMOTION_CHANNEL_CODE,
        discount_percent: TestConstants.VALID_PROMOTION_DISCOUNT_PERCENTAGE,
        discount_amount: TestConstants.VALID_PROMOTION_DISCOUNT_AMOUNT,
        currency: TestConstants.VALID_PROMOTION_CURRENCY,
        start_time: TestConstants.VALID_PROMOTION_START_TIME,
        end_time: TestConstants.VALID_PROMOTION_END_TIME,
        min_original_amount: TestConstants.VALID_PROMOTION_MIN_AMOUNT,
        max_discount_amount: TestConstants.VALID_PROMOTION_MAX_AMOUNT,
      })
      .reply(200, TestConstants.VALID_PROMOTION_RESPONSE);
  });

  describe('createPromotion', () => {
    it('should create promotion', done => {
      expect(
        card.createPromotion({
          referenceId: TestConstants.VALID_PROMOTION_REF_ID,
          description: TestConstants.VALID_PROMOTION_DESCRIPTION,
          promoCode: TestConstants.VALID_PROMOTION_PROMO_CODE,
          binList: TestConstants.VALID_PROMOTION_BIN_LIST,
          channelCode: TestConstants.VALID_PROMOTION_CHANNEL_CODE,
          discountPercent: TestConstants.VALID_PROMOTION_DISCOUNT_PERCENTAGE,
          discountAmount: TestConstants.VALID_PROMOTION_DISCOUNT_AMOUNT,
          currency: TestConstants.VALID_PROMOTION_CURRENCY,
          startTime: TestConstants.VALID_PROMOTION_START_TIME,
          endTime: TestConstants.VALID_PROMOTION_END_TIME,
          minOriginalAmount: TestConstants.VALID_PROMOTION_MIN_AMOUNT,
          maxDiscountAmount: TestConstants.VALID_PROMOTION_MAX_AMOUNT,
        }),
      )
        .to.eventually.deep.equal(TestConstants.VALID_PROMOTION_RESPONSE)
        .and.notify(done);
    });
    it('should report missing required fields', done => {
      expect(
        card.createCharge({
          promoCode: TestConstants.VALID_PROMOTION_PROMO_CODE,
          binList: TestConstants.VALID_PROMOTION_BIN_LIST,
          channelCode: TestConstants.VALID_PROMOTION_CHANNEL_CODE,
          discountPercent: TestConstants.VALID_PROMOTION_DISCOUNT_PERCENTAGE,
          discountAmount: TestConstants.VALID_PROMOTION_DISCOUNT_AMOUNT,
          minOriginalAmount: TestConstants.VALID_PROMOTION_MIN_AMOUNT,
          maxDiscountAmount: TestConstants.VALID_PROMOTION_MAX_AMOUNT,
        }),
      )
        .to.eventually.be.rejected.then(e =>
          Promise.all([
            expect(e).to.have.property('status', 400),
            expect(e).to.have.property('code', Errors.API_VALIDATION_ERROR),
          ]),
        )
        .then(() => done())
        .catch(e => done(e));
    });
  });
};
