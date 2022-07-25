const chai = require('chai');
const chaiAsProm = require('chai-as-promised');
const TestConstants = require('./constants');
const { expect } = chai;
const nock = require('nock');
const { Errors } = require('../../src/xendit');
const Xendit = require('../../src/xendit');
const { QUERY_STRING } = require('./constants');

const x = new Xendit({
  secretKey: 'fake_secret_key',
});

chai.use(chaiAsProm);

const { Transaction } = x;
let t = new Transaction({});
beforeEach(function() {
  t = new Transaction({});
});
before(function() {
  nock(x.opts.xenditURL)
    .get(`/transactions/${TestConstants.TRANSACTION_ID}`)
    .reply(200, TestConstants.GET_TRANSACTION_RESPONSE)
    .get(`/transactions?${QUERY_STRING}`)
    .reply(200, TestConstants.LIST_TRANSACTIONS_RESPONSE);
});

describe('Transaction Service', () => {
  describe('getTransaction', () => {
    it('should get a single transaction', done => {
      expect(
        t.getTransaction({
          id: TestConstants.TRANSACTION_ID,
        }),
      )
        .to.eventually.deep.equal(TestConstants.GET_TRANSACTION_RESPONSE)
        .and.notify(done);
    });

    it('should report missing required fields', done => {
      expect(t.getTransaction({}))
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

  describe('listTransactions', () => {
    it('should retrieve a list of transactions', done => {
      expect(
        t.listTransactions({
          types: TestConstants.TYPES,
          statuses: TestConstants.STATUSES,
          channelCategories: TestConstants.CHANNEL_CATEGORIES,
          createdDateFrom: TestConstants.CREATED_DATE_FROM,
          createdDateTo: TestConstants.CREATED_DATE_TO,
        }),
      )
        .to.eventually.deep.equal(TestConstants.LIST_TRANSACTIONS_RESPONSE)
        .and.notify(done);
    });
  });
});
