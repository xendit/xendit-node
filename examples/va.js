const x = require('./xendit');

const VirtualAcc = x.VirtualAcc;
const va = new VirtualAcc({});

va.getVABanks()
  .then(r => {
    console.log('available va banks:', r); // eslint-disable-line no-console
    return r;
  })
  .catch(e => {
    console.error(e); // eslint-disable-line no-console
    process.exit(1);
  });
