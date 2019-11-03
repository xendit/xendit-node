const chai = require('chai');
const chaiAsProm = require('chai-as-promised');
const TestConstants = require('./constants');
const { expect } = chai;
const nock = require('nock');
const { Errors } = require('../../src/xendit');

chai.use(chaiAsProm);

module.exports = function(x) {
  const { Disbursement } = x;
  let d;
  beforeEach(function() {
    d = new Disbursement({});
  });
  before(function() {
    nock(x.opts.xenditURL)
      .post('/disbursements', {
        external_id: TestConstants.EXT_ID,
        bank_code: TestConstants.BANK_CODE,
        account_holder_name: TestConstants.ACC_HOLDER_NAME,
        account_number: TestConstants.ACC_NUMBER,
        bank_account_name: TestConstants.ACC_HOLDER_NAME,
        bank_account_number: TestConstants.ACC_NUMBER,
        description: TestConstants.DESCRIPTION,
        amount: TestConstants.AMOUNT,
      })
      .reply(201, TestConstants.VALID_CREATE_RESPONSE);
    nock(x.opts.xenditURL)
      .post('/batch_disbursements', {
        reference: TestConstants.REF,
        disbursements: [
          {
            external_id: TestConstants.EXT_ID,
            bank_code: TestConstants.BANK_CODE,
            bank_account_name: TestConstants.ACC_HOLDER_NAME,
            bank_account_number: TestConstants.ACC_NUMBER,
            account_holder_name: TestConstants.ACC_HOLDER_NAME,
            account_number: TestConstants.ACC_NUMBER,
            description: TestConstants.DESCRIPTION,
            amount: TestConstants.AMOUNT,
          },
        ],
      })
      .reply(201, TestConstants.VALID_BATCH_RESPONSE);
    nock(x.opts.xenditURL)
      .get(`/disbursements/${TestConstants.ID}`)
      .reply(200, TestConstants.VALID_CREATE_RESPONSE);
    nock(x.opts.xenditURL)
      .get(`/disbursements?external_id=${TestConstants.EXT_ID}`)
      .reply(200, TestConstants.VALID_CREATE_RESPONSE);
  });

  describe('create', () => {
    it('should create disbursement', done => {
      expect(
        d.create({
          externalID: TestConstants.EXT_ID,
          bankCode: TestConstants.BANK_CODE,
          accountHolderName: TestConstants.ACC_HOLDER_NAME,
          accountNumber: TestConstants.ACC_NUMBER,
          description: TestConstants.DESCRIPTION,
          amount: TestConstants.AMOUNT,
        }),
      )
        .to.eventually.deep.equal(TestConstants.VALID_CREATE_RESPONSE)
        .and.notify(done);
    });
    it('should report missing required fields', done => {
      expect(d.create({}))
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

  describe('createBatch', () => {
    it('should create a batch of disbursements', done => {
      expect(
        d.createBatch({
          reference: TestConstants.REF,
          disbursements: [
            {
              externalID: TestConstants.EXT_ID,
              bankCode: TestConstants.BANK_CODE,
              accountHolderName: TestConstants.ACC_HOLDER_NAME,
              accountNumber: TestConstants.ACC_NUMBER,
              description: TestConstants.DESCRIPTION,
              amount: TestConstants.AMOUNT,
            },
          ],
        }),
      )
        .to.eventually.be.deep.equal(TestConstants.VALID_BATCH_RESPONSE)
        .and.notify(done);
    });
    it('should report missing required fields', done => {
      expect(d.createBatch({}))
        .to.eventually.be.rejected.then(e =>
          Promise.all([
            expect(e).to.have.property('status', 400),
            expect(e).to.have.property('code', Errors.API_VALIDATION_ERROR),
          ]),
        )
        .then(() => done())
        .catch(e => done(e));
    });
    it('should report `disbursements` not being an array', done => {
      expect(
        d.createBatch({
          reference: TestConstants.REF,
          disbursements: {},
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
    it('should report `disbursements` not having length > 0', done => {
      expect(
        d.createBatch({
          reference: TestConstants.REF,
          disbursements: [],
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
    it('should report missing disbursementItem required fields', done => {
      expect(
        d.createBatch({
          reference: TestConstants.REF,
          disbursements: [{}],
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

  describe('getByID', () => {
    it('should get disbursement by ID', done => {
      expect(d.getByID({ disbursementID: TestConstants.ID }))
        .to.eventually.deep.equal(TestConstants.VALID_CREATE_RESPONSE)
        .and.notify(done);
    });
    it('should report missing required fields', done => {
      expect(d.getByID({}))
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

  describe('getByExtID', () => {
    it('should get disbursement by external ID', done => {
      expect(
        d.getByExtID({
          externalID: TestConstants.EXT_ID,
        }),
      )
        .to.eventually.deep.equal(TestConstants.VALID_CREATE_RESPONSE)
        .and.notify(done);
    });
    it('should report missing required fields', done => {
      expect(d.getByExtID({}))
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
