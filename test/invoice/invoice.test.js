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

const { Invoice } = x;
let i;
beforeEach(function() {
  i = new Invoice({});
});
before(function() {
  nock(x.opts.xenditURL)
    .post('/v2/invoices', {
      external_id: TestConstants.EXT_ID,
      payer_email: TestConstants.PAYER_EMAIL,
      description: TestConstants.DESCRIPTION,
      amount: TestConstants.AMT,
    })
    .reply(201, TestConstants.VALID_INVOICE);
  nock(x.opts.xenditURL)
    .get(`/v2/invoices/${TestConstants.ID}`)
    .reply(200, TestConstants.VALID_INVOICE);
  nock(x.opts.xenditURL)
    .post(`/invoices/${TestConstants.ID}/expire!`)
    .reply(200, TestConstants.VALID_INVOICE);
  nock(x.opts.xenditURL)
    .get(`/v2/invoices`)
    .reply(200, [
      TestConstants.VALID_INVOICE,
      TestConstants.VALID_INVOICE,
      TestConstants.VALID_INVOICE,
    ]);
});

describe('Invoice Service', function() {
  describe('createInvoice', () => {
    it('should create an invoice', done => {
      expect(
        i.createInvoice({
          externalID: TestConstants.EXT_ID,
          amount: TestConstants.AMT,
          description: TestConstants.DESCRIPTION,
          payerEmail: TestConstants.PAYER_EMAIL,
        }),
      )
        .to.eventually.deep.equal(TestConstants.VALID_INVOICE)
        .and.notify(done);
    });
    it('should report missing required fields', done => {
      expect(i.createInvoice({}))
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

  describe('getInvoice', () => {
    it('should get an invoice', done => {
      expect(i.getInvoice({ invoiceID: TestConstants.ID }))
        .to.eventually.deep.equal(TestConstants.VALID_INVOICE)
        .and.notify(done);
    });
    it('should report missing required fields', done => {
      expect(i.createInvoice({}))
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

  describe('expireInvoice', () => {
    it('should expire an invoice', done => {
      expect(i.expireInvoice({ invoiceID: TestConstants.ID }))
        .to.eventually.deep.equal(TestConstants.VALID_INVOICE)
        .and.notify(done);
    });
    it('should report missing required fields', done => {
      expect(i.expireInvoice({}))
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

  describe('getInvoice', () => {
    it('should get a list of invoices', done => {
      expect(i.getAllInvoices())
        .to.eventually.deep.equal([
          TestConstants.VALID_INVOICE,
          TestConstants.VALID_INVOICE,
          TestConstants.VALID_INVOICE,
        ])
        .and.notify(done);
    });
  });
});
