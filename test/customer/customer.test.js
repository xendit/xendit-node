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
beforeEach(function() {
  customer = new Customer({});
});
before(function() {
  nock(customer.API_ENDPOINT)
    .post('/customers', {
      reference_id: TestConstants.REFERENCE_ID,
      given_names: TestConstants.GIVEN_NAMES,
      email: TestConstants.EMAIL,
      mobile_number: TestConstants.MOBILE_NUMBER,
      description: 'dummy customer',
      middle_name: TestConstants.MIDDLE_NAME,
      surname: TestConstants.SURNAME,
      addresses: [],
    })
    .reply(200, TestConstants.pls);
  nock(customer.API_ENDPOINT)
    .get(`/customers/${TestConstants.CUSTOMER_ID}`)
    .reply(200, TestConstants.VALID_CREATE_CUSTOMER_RESPONSE);
  nock(customer.API_ENDPOINT)
    .patch(`/customers/${TestConstants.CUSTOMER_ID}`, {
      description: 'customer dummy',
      phone_number: '+628987654321',
      nationality: 'ID',
      date_of_birth: '2000-06-13',
      addresses: [
        {
          street_line1: 'jalan raya',
          country: 'ID',
          city: 'Jakarta',
        },
        {
          street_line1: 'jalan raya 2',
          country: 'ID',
          city: 'Jakarta',
        },
      ],
    })
    .reply(200, TestConstants.VALID_CUSTOMER);
  nock(customer.API_ENDPOINT)
    .get(`/customers?reference_id=${TestConstants.REFERENCE_ID}`)
    .reply(200, TestConstants.VALID_CUSTOMER_ARRAY);
});

describe('Customer Service', function() {
  describe('createCustomer', () => {
    it('should create a customer', done => {
      expect(
        customer.createCustomer({
          referenceID: TestConstants.REFERENCE_ID,
          givenNames: TestConstants.GIVEN_NAMES,
          email: TestConstants.EMAIL,
          mobileNumber: TestConstants.MOBILE_NUMBER,
          description: 'dummy customer',
          middleName: TestConstants.MIDDLE_NAME,
          surname: TestConstants.SURNAME,
          addresses: [],
        }),
      )
        .to.eventually.deep.equal(TestConstants.pls)
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
      expect(customer.getCustomer({ id: TestConstants.CUSTOMER_ID }))
        .to.eventually.deep.equal(TestConstants.VALID_CREATE_CUSTOMER_RESPONSE)
        .and.notify(done);
    });
    it('should report missing required fields', done => {
      expect(customer.getCustomer({}))
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
          id: TestConstants.CUSTOMER_ID,
          description: 'customer dummy',
          phoneNumber: '+628987654321',
          nationality: 'ID',
          dateOfBirth: '2000-06-13',
          addresses: [
            {
              streetLine1: 'jalan raya',
              country: 'ID',
              city: 'Jakarta',
            },
            {
              streetLine1: 'jalan raya 2',
              country: 'ID',
              city: 'Jakarta',
            },
          ],
        }),
      )
        .to.eventually.deep.equal(TestConstants.VALID_CUSTOMER)
        .and.notify(done);
    });
  });

  describe('getCustomerByReferenceID', () => {
    it('should get a customer by reference ID', done => {
      expect(
        customer.getCustomerByReferenceID({
          referenceID: TestConstants.REFERENCE_ID,
        }),
      )
        .to.eventually.deep.equal(TestConstants.VALID_CUSTOMER_ARRAY)
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
