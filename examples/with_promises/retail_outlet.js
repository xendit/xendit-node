const x = require('../xendit');

const RetailOutlet = x.RetailOutlet;
const ro = new RetailOutlet({});

ro.createFixedPaymentCode({
  externalID: '123',
  retailOutletName: 'ALFAMART',
  name: 'Ervan Adetya',
  expectedAmt: 10000,
})
  .then(r => {
    // eslint-disable-next-line no-console
    console.log('fixed payment code created:', r);
    return r;
  })
  .then(({ id }) => ro.getFixedPaymentCode({ id }))
  .then(r => {
    // eslint-disable-next-line no-console
    console.log('fixed payment code details:', r);
    return r;
  })
  .then(({ id }) => {
    return ro.updateFixedPaymentCode({
      id,
      expectedAmt: 12000,
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
