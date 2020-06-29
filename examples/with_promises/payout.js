const x = require('../xendit');

const { Payout } = x;
const p = new Payout({});

p.createPayout({
  externalID: Date.now().toString(),
  amount: 10000,
  email: 'stanley@xendit.co',
})
  .then(r => {
    console.log('created payout:', r); // eslint-disable-line no-console
    return r;
  })
  .then(({ id }) => p.getPayout({ id }))
  .then(r => {
    console.log('retrieved payout:', r); // eslint-disable-line no-console
    return r;
  })
  .then(({ id }) => p.voidPayout({ id }))
  .then(r => {
    console.log('payout voided:', r.id); // eslint-disable-line no-console
    return r;
  })
  .catch(e => {
    console.error(e); // eslint-disable-line no-console
    process.exit(1);
  });
