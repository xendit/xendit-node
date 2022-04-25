const x = require('./xendit.test');

const RetailOutlet = x.RetailOutlet;
const ro = new RetailOutlet({});
function sleepFor(sleepDuration) {
  var now = new Date().getTime();
  while (new Date().getTime() < now + sleepDuration) {
    /* Do nothing */
  }
}
module.exports = function() {
  return ro
    .createFixedPaymentCode({
      externalID: '123',
      retailOutletName: 'ALFAMART',
      name: 'Ervan Adetya',
      expectedAmt: 10000,
    })
    .then(({ id }) => {
      sleepFor(3000);
      return ro.getFixedPaymentCode({ id });
    })
    .then(({ id }) => {
      sleepFor(3000);
      return ro.updateFixedPaymentCode({ id: id, expectedAmt: 12000 });
    })
    .then(({ id, payment_code }) =>
      Promise.all([
        id,
        ro.simulatePayment({
          retailOutletName: 'ALFAMART',
          paymentCode: payment_code,
          transferAmount: 12000,
        }),
      ]),
    )
    .then(([id]) => {
      sleepFor(3000);
      return ro.getPaymentsByFixedPaymentCodeId({ id });
    })
    .then(() => {
      // eslint-disable-next-line no-console
      console.log('Retail outlet integration test done...');
    })
    .catch(e => {
      throw new Error(`RO integration tests failed with error: ${e.message}`);
    });
};
