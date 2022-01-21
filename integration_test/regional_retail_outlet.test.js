const x = require('./xendit_ph.test');

const RegionalRetailOutlet = x.RegionalRetailOutlet;
const ro = new RegionalRetailOutlet({});

const dynamicReferenceId = Math.floor(Math.random() * 9999 + 1);

module.exports = function() {
  return ro
    .createPaymentCode({
      referenceId: `test_dharma_${dynamicReferenceId}`,
      channelCode: 'CEBUANA',
      customerName: 'Dharma',
      amount: 50,
      currency: 'PHP',
      market: 'PH',
    })
    .then(({ id }) => ro.getPaymentCode({ id }))
    .then(({ id }) =>
      ro.updatePaymentCode({ id: id, customerName: 'DharmaLain' }),
    )
    .then(() => {
      // eslint-disable-next-line no-console
      console.log('Regional Retail outlet integration test done...');
    })
    .catch(e => {
      throw new Error(
        `Regional RO integration tests failed with error: ${e.message}`,
      );
    });
};
