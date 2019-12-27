const x = require('./xendit');

const EWallet = x.EWallet;
const ew = new EWallet({});

ew.createOVOPayment({
  externalID: new Date(),
  amount: 1,
  phone: '087877971875',
})
  .then(r => {
    console.log('create ovo payment detail:', r); // eslint-disable-line no-console
    return r;
  })
  .then(({ external_id }) =>
    ew.getOVOPaymentStatusByExtID({ externalID: external_id }),
  )
  .then(r => {
    console.log('ovo payment status detail:', r); // eslint-disable-line no-console
    return r;
  })
  .catch(e => {
    console.error(e); // eslint-disable-line no-console
    process.exit(1);
  });
