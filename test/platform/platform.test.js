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

const { Platform } = x;
let platform = new Platform({});
beforeEach(function() {
  platform = new Platform({});
});
before(function() {
  nock(x.opts.xenditURL)
    .post('/accounts', {
      account_email: TestConstants.ACCOUNT_EMAIL,
      type: TestConstants.TYPE,
    })
    .reply(200, TestConstants.VALID_CREATE_ACCOUNT_RESPONSE);
  nock(x.opts.xenditURL)
    .post(`/callback_urls/${TestConstants.CALLBACK_TYPE}`, {
      url: TestConstants.URL,
    })
    .reply(200, TestConstants.VALID_SET_CALLBACK_URL_RESPONSE);
  nock(x.opts.xenditURL)
    .post('/transfers', {
      reference: TestConstants.REFERENCE,
      amount: TestConstants.AMOUNT,
      source_user_id: TestConstants.SOURCE_USER_ID,
      destination_user_id: TestConstants.DESTINATION_USER_ID,
    })
    .reply(200, TestConstants.VALID_CREATE_TRANSFER_RESPONSE);
  nock(x.opts.xenditURL)
    .post('/fee_rules', {
      name: TestConstants.FEE_NAME,
      routes: TestConstants.ROUTES,
    })
    .reply(200, TestConstants.VALID_CREATE_FEE_RULE_RESPONSE);
});

describe('Platform Service', function() {
  describe('createAccount', () => {
    it('should create a sub-account', done => {
      expect(
        platform.createAccount({
          accountEmail: TestConstants.ACCOUNT_EMAIL,
          type: TestConstants.TYPE,
        }),
      )
        .to.eventually.deep.eq(TestConstants.VALID_CREATE_ACCOUNT_RESPONSE)
        .then(() => done())
        .catch(done);
    });
    it('should report missing required fields', done => {
      expect(platform.createAccount({}))
        .to.eventually.be.rejected.then(e =>
          Promise.all([
            expect(e).to.have.property('status', 400),
            expect(e).to.have.property('code', Errors.API_VALIDATION_ERROR),
          ]),
        )
        .then(() => done())
        .catch(done);
    });
  });
  describe('setCallbackURL', () => {
    it('should set callback URL of an account', done => {
      expect(
        platform.setCallbackURL({
          type: TestConstants.CALLBACK_TYPE,
          url: TestConstants.URL,
        }),
      )
        .to.eventually.deep.eq(TestConstants.VALID_SET_CALLBACK_URL_RESPONSE)
        .then(() => done())
        .catch(done);
    });
    it('should report missing required fields', done => {
      expect(platform.setCallbackURL({}))
        .to.eventually.be.rejected.then(e =>
          Promise.all([
            expect(e).to.have.property('status', 400),
            expect(e).to.have.property('code', Errors.API_VALIDATION_ERROR),
          ]),
        )
        .then(() => done())
        .catch(done);
    });
  });
  describe('createTransfer', () => {
    it('should create a transfer', done => {
      expect(
        platform.createTransfer({
          reference: TestConstants.REFERENCE,
          amount: TestConstants.AMOUNT,
          sourceUserID: TestConstants.SOURCE_USER_ID,
          destinationUserID: TestConstants.DESTINATION_USER_ID,
        }),
      )
        .to.eventually.deep.eq(TestConstants.VALID_CREATE_TRANSFER_RESPONSE)
        .then(() => done())
        .catch(done);
    });
    it('should report missing required fields', done => {
      expect(platform.createTransfer({}))
        .to.eventually.be.rejected.then(e =>
          Promise.all([
            expect(e).to.have.property('status', 400),
            expect(e).to.have.property('code', Errors.API_VALIDATION_ERROR),
          ]),
        )
        .then(() => done())
        .catch(done);
    });
  });
  describe('createFeeRule', () => {
    it('should create a fee rule', done => {
      expect(
        platform.createFeeRule({
          name: TestConstants.FEE_NAME,
          routes: TestConstants.ROUTES,
        }),
      )
        .to.eventually.deep.eq(TestConstants.VALID_CREATE_FEE_RULE_RESPONSE)
        .then(() => done())
        .catch(done);
    });
    it('should report missing required fields', done => {
      expect(platform.createFeeRule({}))
        .to.eventually.be.rejected.then(e =>
          Promise.all([
            expect(e).to.have.property('status', 400),
            expect(e).to.have.property('code', Errors.API_VALIDATION_ERROR),
          ]),
        )
        .then(() => done())
        .catch(done);
    });
  });
});
