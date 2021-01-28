const x = require('./xendit.test');

const VirtualAcc = x.VirtualAcc;
const va = new VirtualAcc({});

module.exports = function() {
  return va
    .getVABanks()
    .then(banks => {
      return va.createFixedVA({
        externalID: '123',
        bankCode: banks[0].code,
        name: 'Stanley Nguyen',
        isClosed: true,
        expectedAmt: 15,
      });
    })
    .then(({ id }) => va.getFixedVA({ id }))
    .then(({ id }) => {
      return va.updateFixedVA({
        id,
        suggestedAmt: 20,
        expectedAmt: 30,
      });
    })
    .then(() => {
      // eslint-disable-next-line no-console
      console.log('VA integration test done...');
    })
    .catch(e => {
      throw new Error(`VA integration tests failed with error: ${e.message}`);
    });
};
