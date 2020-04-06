const chai = require('chai');
const chaiAsProm = require('chai-as-promised');
const TestConstants = require('./constants');
const { expect } = chai;
const nock = require('nock');
const { Errors } = require('../../src/xendit');
const Xendit = require('../../src/xendit');

const x = new Xendit({
  secretKey: 'fake_secret_key',
});

chai.use(chaiAsProm);

const { Payout } = x;
let p = new Payout({});
beforeEach(function() {
  p = new Payout({});
});
before(function() {
  nock(p.API_ENDPOINT)
    .post('/', {
      external_id: TestConstants.EXT_ID,
      amount: TestConstants.AMOUNT,
    })
    .reply(201, TestConstants.VALID_PAYOUT)
    .get(`/${TestConstants.PAYOUT_ID}`)
    .reply(200, TestConstants.VALID_PAYOUT)
    .post(`/${TestConstants.PAYOUT_ID}/void`)
    .reply(200, TestConstants.VALID_PAYOUT);
});

describe('Payout Service', () => {
  describe('createPayout', () => {
    it('should create a payout', done => {
      expect(
        p.createPayout({
          externalID: TestConstants.EXT_ID,
          amount: TestConstants.AMOUNT,
        }),
      )
        .to.eventually.deep.equal(TestConstants.VALID_PAYOUT)
        .and.notify(done);
    });

    it('should report missing required fields', done => {
      expect(p.createPayout({}))
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

  describe('getPayout', () => {
    it('should retrieve payout details', done => {
      expect(p.getPayout({ id: TestConstants.PAYOUT_ID }))
        .to.eventually.deep.equal(TestConstants.VALID_PAYOUT)
        .and.notify(done);
    });

    it('should report missing required fields', done => {
      expect(p.getPayout({}))
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

  describe('voidPayout', () => {
    it('should void a payout', done => {
      expect(p.voidPayout({ id: TestConstants.PAYOUT_ID }))
        .to.eventually.deep.equal(TestConstants.VALID_PAYOUT)
        .and.notify(done);
    });

    it('should report missing required fields', done => {
      expect(p.voidPayout({}))
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
});
