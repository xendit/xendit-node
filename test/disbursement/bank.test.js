const chai = require('chai');
const chaiAsProm = require('chai-as-promised');
const TestConstants = require('./constants');
const { expect } = chai;
const nock = require('nock');

chai.use(chaiAsProm);

module.exports = function(x) {
  const { Disbursement } = x;
  let d;
  beforeEach(function() {
    d = new Disbursement({});
  });
  before(function() {
    nock(x.opts.xenditURL)
      .get('/available_disbursements_banks')
      .reply(200, TestConstants.VALID_BANKS_RESPONSE);
  });

  describe('getBanks', () => {
    it('should get a list of banks with disbursement available', done => {
      expect(d.getBanks())
        .to.eventually.deep.equal(TestConstants.VALID_BANKS_RESPONSE)
        .and.notify(done);
    });
  });
};
