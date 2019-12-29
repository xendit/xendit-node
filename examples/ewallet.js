const x = require('./xendit');

const EWallet = x.EWallet;
const ew = new EWallet({});

ew.createPayment({
  externalID: new Date(),
  amount: 1,
  phone: '081234567890',
  ewalletType: 'OVO',
})
  .then(r => {
    console.log('create payment detail:', r); // eslint-disable-line no-console
    return r;
  })
  .then(({ external_id, ewallet_type }) =>
    ew.ovo.getPaymentStatusByExtID({
      externalID: external_id,
      ewalletType: ewallet_type,
    }),
  )
  .then(r => {
    console.log('EWallet payment detail:', r); // eslint-disable-line no-console
    return r;
  })
  .catch(e => {
    console.error(e); // eslint-disable-line no-console
    process.exit(1);
  });
