const chai = require('chai');
const chaiAsProm = require('chai-as-promised');
const { expect } = chai;
const nock = require('nock');
const Xendit = require('../../src/xendit');
const {
  CREATE_REFUND_SUCCESS_RESPONSE,
  LIST_REFUNDS_SUCCESS_RESPONSE,
  GET_REFUND_BY_ID_RESPONSE,
} = require('./constans');

const x = new Xendit({
  secretKey: 'fake_secret_key',
});

chai.use(chaiAsProm);

const { Refund } = x;
let r = new Refund({});
before(function() {
  nock(x.opts.xenditURL)
    .post('/refunds', {
      invoice_id: '63676ed0eb10cf38ce0550b7',
      reason: 'OTHERS',
      amount: 1,
    })
    .reply(201, CREATE_REFUND_SUCCESS_RESPONSE)
    .get('/refunds')
    .reply(200, LIST_REFUNDS_SUCCESS_RESPONSE)
    .get('/refunds/rfd-e9601c54-cacc-4b77-90e7-17c899c19106')
    .reply(200, GET_REFUND_BY_ID_RESPONSE);
});

describe('Refund Service', () => {
  describe('create refund', () => {
    it('should get a response of refund created', done => {
      expect(
        r.createRefund({
          invoice_id: '63676ed0eb10cf38ce0550b7',
          reason: 'OTHERS',
          amount: 1,
        }),
      )
        .to.eventually.deep.equal(CREATE_REFUND_SUCCESS_RESPONSE)
        .and.notify(done);
    });
  });
  describe('list refunds', () => {
    it('should get a response of refunds', done => {
      expect(r.listRefunds())
        .to.eventually.deep.equal(LIST_REFUNDS_SUCCESS_RESPONSE)
        .and.notify(done);
    });
  });
  describe('get refund by id', () => {
    it('should get a response detail of refund by id', done => {
      expect(
        r.getRefundById({
          id: 'rfd-e9601c54-cacc-4b77-90e7-17c899c19106',
        }),
      )
        .to.eventually.deep.equal(GET_REFUND_BY_ID_RESPONSE)
        .and.notify(done);
    });
  });
});
