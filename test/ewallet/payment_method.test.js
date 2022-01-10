const chai = require('chai');
const chaiAsProm = require('chai-as-promised');
const TestConstants = require('./constants');
const { expect } = chai;
const nock = require('nock');
const { Errors } = require('../../src/xendit');

chai.use(chaiAsProm);

module.exports = function(x) {
  const { EWallet } = x;

  let ew;

  beforeEach(function() {
    ew = new EWallet({});
  });

  before(function() {
    nock(x.opts.xenditURL)
      .post('/payment_methods', {
        customer_id: TestConstants.CUSTOMER_ID,
        type: 'EWALLET',
        properties: {
          id: TestConstants.LINKED_ACCOUNT_ID,
        },
      })
      .reply(200, TestConstants.VALID_CREATE_PAYMENT_METHOD_RESPONSE);
    nock(x.opts.xenditURL)
      .get(`/payment_methods?customer_id=${TestConstants.CUSTOMER_ID}`)
      .reply(200, TestConstants.VALID_PAYMENT_METHOD_ARRAY);
  });

  describe('createPaymentMethod', () => {
    it('should create payment method', done => {
      expect(
        ew.createPaymentMethod({
          customerID: TestConstants.CUSTOMER_ID,
          type: 'EWALLET',
          properties: {
            id: TestConstants.LINKED_ACCOUNT_ID,
          },
        }),
      )
        .to.eventually.deep.equal(
          TestConstants.VALID_CREATE_PAYMENT_METHOD_RESPONSE,
        )
        .and.notify(done);
    });
    it('should report missing required fields', done => {
      expect(ew.createPaymentMethod({}))
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

  describe('getPaymentMethodsByCustomerID', () => {
    it('should get payment methods', done => {
      expect(
        ew.getPaymentMethodsByCustomerID({
          customerID: TestConstants.CUSTOMER_ID,
        }),
      )
        .to.eventually.deep.equal(TestConstants.VALID_PAYMENT_METHOD_ARRAY)
        .and.notify(done);
    });
    it('should report missing required fields', done => {
      expect(ew.getPaymentMethodsByCustomerID({}))
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
};
