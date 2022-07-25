const x = require('./xendit.test');

const VirtualAcc = x.VirtualAcc;
const va = new VirtualAcc({});
function sleepFor(sleepDuration) {
  var now = new Date().getTime();
  while (new Date().getTime() < now + sleepDuration) {
    /* Do nothing */
  }
}
module.exports = function() {
  return va
    .getVABanks()
    .then(banks => {
      return va.createFixedVA({
        externalID: 'VA-xendit-node-js998877',
        bankCode: banks[0].code,
        name: 'Stanley Nguyen',
        isClosed: true,
        expectedAmt: 10000,
      });
    })
    .then(({ id }) => {
      sleepFor(3000);
      return va.getFixedVA({ id });
    })
    .then(({ id }) => {
      sleepFor(5000);
      return va.updateFixedVA({
        id,
        expectedAmt: 12000,
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
