const chai = require('chai');
const chaiAsProm = require('chai-as-promised');
const TestConstants = require('./constants');
const { expect } = chai;
const nock = require('nock');

chai.use(chaiAsProm);

module.exports = function(x) {
  const { VirtualAcc } = x;
  let va;
  beforeEach(function() {
    va = new VirtualAcc({});
  });
  before(function() {
    nock(x.opts.xenditURL)
      .get('/available_virtual_account_banks')
      .reply(200, TestConstants.VALID_VA_BANKS_RESPONSE);
  });

  describe('getVABanks', () => {
    it('should get a list of banks with VA', done => {
      expect(va.getVABanks())
        .to.eventually.deep.equal(TestConstants.VALID_VA_BANKS_RESPONSE)
        .and.notify(done);
    });
  });
};
