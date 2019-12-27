const chai = require('chai');
const chaiAsProm = require('chai-as-promised');
const TestConstants = require('./constants');
const { expect } = chai;
const nock = require('nock');
const { Errors } = require('../../src/xendit');

chai.use(chaiAsProm);

module.exports = function(x) {
  const { VirtualAcc } = x;
  let va;
  beforeEach(function() {
    va = new VirtualAcc({});
  });
  before(function() {
    nock(x.opts.xenditURL)
      .post('/callback_virtual_accounts', {
        external_id: TestConstants.EXT_ID,
        bank_code: TestConstants.BANK_CODE,
        name: TestConstants.NAME,
      })
      .reply(200, TestConstants.VA_DETAILS);
    nock(x.opts.xenditURL)
      .get(`/callback_virtual_accounts/${TestConstants.VA_ID}`)
      .reply(200, TestConstants.VA_DETAILS);
    nock(x.opts.xenditURL)
      .patch(`/callback_virtual_accounts/${TestConstants.VA_ID}`, {
        expected_amount: TestConstants.EXPECTED_AMT,
      })
      .reply(200, TestConstants.UPDATED_VA_DETAILS);
    nock(x.opts.xenditURL)
      .post('/callback_virtual_accounts', {
        external_id: TestConstants.EXT_ID,
        bank_code: TestConstants.BANK_CODE,
        name: TestConstants.NAME,
        expiration_date: null,
      })
      .reply(400, {
        status: 400,
        code: 'API_VALIDATION_ERROR',
        message: 'There was an error with the format submitted to the server.',
      });
    nock(x.opts.xenditURL)
      .patch(`/callback_virtual_accounts/${TestConstants.VA_ID}`, {
        expected_amount: TestConstants.EXPECTED_AMT,
        expiration_date: null,
      })
      .reply(400, {
        status: 400,
        code: 'API_VALIDATION_ERROR',
        message: 'There was an error with the format submitted to the server.',
      });
  });

  describe('createFixedVA', () => {
    it('should create a virtual account', done => {
      expect(
        va.createFixedVA({
          externalID: TestConstants.EXT_ID,
          bankCode: TestConstants.BANK_CODE,
          name: TestConstants.NAME,
        }),
      )
        .to.eventually.deep.equal(TestConstants.VA_DETAILS)
        .and.notify(done);
    });
    it('should report missing required fields', done => {
      expect(va.createFixedVA({}))
        .to.eventually.to.be.rejected.then(e =>
          Promise.all([
            expect(e).to.have.property('status', 400),
            expect(e).to.have.property('code', Errors.API_VALIDATION_ERROR),
          ]),
        )
        .then(() => done())
        .catch(e => done(e));
    });
  });
  describe('getFixedVA', () => {
    it('should be able to retrieve VA details', done => {
      expect(va.getFixedVA({ id: TestConstants.VA_ID }))
        .to.eventually.deep.equal(TestConstants.VA_DETAILS)
        .and.notify(done);
    });
    it('should report missing required fields', done => {
      expect(va.getFixedVA({}))
        .to.eventually.to.be.rejected.then(e =>
          Promise.all([
            expect(e).to.have.property('status', 400),
            expect(e).to.have.property('code', Errors.API_VALIDATION_ERROR),
          ]),
        )
        .then(() => done())
        .catch(e => done(e));
    });
  });
  describe('updateFixedVA', () => {
    it('should be able to update fixed VA', done => {
      expect(
        va.updateFixedVA({
          id: TestConstants.VA_ID,
          expectedAmt: TestConstants.EXPECTED_AMT,
        }),
      )
        .to.eventually.deep.equal(TestConstants.UPDATED_VA_DETAILS)
        .and.notify(done);
    });
  });
};
