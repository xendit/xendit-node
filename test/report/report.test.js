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

const { Report } = x;
let r = new Report({});
beforeEach(function() {
  r = new Report({});
});
before(function() {
  nock(x.opts.xenditURL)
    .post('/reports', {
      type: TestConstants.TYPE,
      filter: TestConstants.FILTER,
      format: TestConstants.FORMAT,
      currency: TestConstants.CURRENCY,
    })
    .reply(200, TestConstants.GENERATE_REPORT_RESPONSE)
    .get(`/reports/${TestConstants.REPORT_ID}`)
    .reply(200, TestConstants.GET_REPORT_RESPONSE);
});

describe('Report Service', () => {
  describe('generateReport', () => {
    it('should generate a report', done => {
      expect(
        r.generateReport({
          type: TestConstants.TYPE,
          filterDateFrom: TestConstants.FILTER_DATE_FROM,
          filterDateTo: TestConstants.FILTER_DATE_TO,
          format: TestConstants.FORMAT,
          currency: TestConstants.CURRENCY,
        }),
      )
        .to.eventually.deep.equal(TestConstants.GENERATE_REPORT_RESPONSE)
        .and.notify(done);
    });

    it('should report missing required fields', done => {
      expect(r.generateReport({}))
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

  describe('getReport', () => {
    it('should retrieve report information and url', done => {
      expect(r.getReport({ id: TestConstants.REPORT_ID }))
        .to.eventually.deep.equal(TestConstants.GET_REPORT_RESPONSE)
        .and.notify(done);
    });

    it('should report missing required fields', done => {
      expect(r.getReport({}))
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
