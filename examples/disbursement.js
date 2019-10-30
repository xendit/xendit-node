const x = require('./xendit');

const { Disbursement } = x;
const d = new Disbursement({});

d.getBanks()
  .then(r => {
    console.log('available banks:', r); // eslint-disable-line no-console
    return r;
  })
  .catch(e => {
    console.error(e); // eslint-disable-line no-console
    process.exit(1);
  });
