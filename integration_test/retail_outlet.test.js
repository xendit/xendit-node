const x = require('./xendit.test');

const RetailOutlet = x.RetailOutlet;
const ro = new RetailOutlet({});

module.exports = function() {
  return ro
    .createFixedPaymentCode({
      externalID: '123',
      retailOutletName: 'ALFAMART',
      name: 'Ervan Adetya',
      expectedAmt: 10000,
    })
    .then(({ id }) => ro.getFixedPaymentCode({ id }))
    .then(({ id }) => ro.updateFixedPaymentCode({ id: id, expectedAmt: 12000 }))
    .then(() => {
      // eslint-disable-next-line no-console
      console.log('Retail outlet integration test done...');
    })
    .catch(e => {
      throw new Error(`RO integration tests failed with error: ${e.message}`);
    });
};
