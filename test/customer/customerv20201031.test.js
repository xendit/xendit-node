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

const { Customer } = x;
let customer = new Customer({});
const apiVersion = '2020-10-31';
beforeEach(function() {
  customer = new Customer({});
});
before(function() {
  nock(customer.API_ENDPOINT)
    .post('/customers', {
      reference_id: TestConstants.REFERENCE_ID,
      type: 'INDIVIDUAL',
      individual_detail: {
        given_names: TestConstants.GIVEN_NAMES,
        surname: TestConstants.SURNAME,
      },
      email: TestConstants.EMAIL,
      mobile_number: TestConstants.MOBILE_NUMBER,
      description: 'dummy customer',
    })
    .reply(200, TestConstants.VALID_CREATE_CUSTOMER_RESPONSE_V20201031);
  nock(customer.API_ENDPOINT)
    .get(`/customers/${'cust-' + TestConstants.CUSTOMER_ID}`)
    .reply(200, TestConstants.VALID_CREATE_CUSTOMER_RESPONSE_V20201031);
  nock(customer.API_ENDPOINT)
    .patch(`/customers/${'cust-' + TestConstants.CUSTOMER_ID}`, {
      addresses: [
        {
          country: 'ID',
          city: 'Jakarta',
        },
        {
          country: 'ID',
          city: 'Jakarta',
        },
      ],
      description: 'dummy customer',
    })
    .reply(200, TestConstants.VALID_CUSTOMER_V20201031);
  nock(customer.API_ENDPOINT)
    .get(`/customers?reference_id=${'ref-' + TestConstants.REFERENCE_ID}`)
    .reply(200, TestConstants.VALID_CUSTOMER_ARRAY_V20201031);
});

after(function() {
  nock.cleanAll();
});

describe('Customer Service v2020-10-31', function() {
  describe('createCustomer', () => {
    it('should create a customer', done => {
      expect(
        customer.createCustomer({
          referenceID: TestConstants.REFERENCE_ID,
          type: 'INDIVIDUAL',
          individualDetail: {
            givenNames: TestConstants.GIVEN_NAMES,
            surname: TestConstants.SURNAME,
          },
          email: TestConstants.EMAIL,
          mobileNumber: TestConstants.MOBILE_NUMBER,
          description: 'dummy customer',
          apiVersion: apiVersion,
        }),
      )
        .to.eventually.deep.equal(
          TestConstants.VALID_CREATE_CUSTOMER_RESPONSE_V20201031,
        )
        .and.notify(done);
    });
    it('should report missing required fields', done => {
      expect(customer.createCustomer({}))
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

  describe('getCustomer', () => {
    it('should get a customer', done => {
      expect(
        customer.getCustomer(
          { id: 'cust-' + TestConstants.CUSTOMER_ID },
          apiVersion,
        ),
      )
        .to.eventually.deep.equal(
          TestConstants.VALID_CREATE_CUSTOMER_RESPONSE_V20201031,
        )
        .and.notify(done);
    });
    it('should report missing required fields', done => {
      expect(customer.getCustomer({}, apiVersion))
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

  describe('updateCustomer', () => {
    it('should update a customer', done => {
      expect(
        customer.updateCustomer({
          id: 'cust-' + TestConstants.CUSTOMER_ID,
          addresses: [
            {
              country: 'ID',
              city: 'Jakarta',
            },
            {
              country: 'ID',
              city: 'Jakarta',
            },
          ],
          description: 'dummy customer',
          apiVersion: apiVersion,
        }),
      )
        .to.eventually.deep.equal(TestConstants.VALID_CUSTOMER_V20201031)
        .and.notify(done);
    });
  });

  describe('getCustomerByReferenceID', () => {
    it('should get customers by reference ID', done => {
      expect(
        customer.getCustomerByReferenceID({
          referenceID: 'ref-' + TestConstants.REFERENCE_ID,
        }),
      )
        .to.eventually.deep.equal(TestConstants.VALID_CUSTOMER_ARRAY_V20201031)
        .and.notify(done);
    });
    it('should report missing required fields', done => {
      expect(customer.getCustomerByReferenceID({}))
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
});
