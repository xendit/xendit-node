const x = require('../xendit');

const RegionalRetailOutlet = x.RegionalRetailOutlet;
const ro = new RegionalRetailOutlet();

ro.createPaymentCode({
  referenceId: 'test_dharma_4',
  channelCode: 'CEBUANA',
  customerName: 'Dharma',
  amount: 50,
  currency: 'PHP',
  market: 'PH',
})
  .then(r => {
    // eslint-disable-next-line no-console
    console.log('fixed payment code created:', r);
    return r;
  })
  .then(({ id }) => ro.getPaymentCode({ id }))
  .then(r => {
    // eslint-disable-next-line no-console
    console.log('fixed payment code details:', r);
    return r;
  })
  .then(({ id }) => {
    return ro.updatePaymentCode({
      id,
      customerName: 'DharmaLain',
    });
  })
  .then(r => {
    // eslint-disable-next-line no-console
    console.log('updated payment code details:', r);
    return r;
  })
  .catch(e => {
    console.error(e); // eslint-disable-line no-console
    process.exit(1);
  });
