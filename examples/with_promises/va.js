const x = require('../xendit');

const VirtualAcc = x.VirtualAcc;
const va = new VirtualAcc({});

va.getVABanks()
  .then(r => {
    console.log('available va banks:', r); // eslint-disable-line no-console
    return r;
  })
  .then(banks => {
    return va.createFixedVA({
      externalID: '123',
      bankCode: banks[0].code,
      name: 'Stanley Nguyen',
    });
  })
  .then(r => {
    console.log('fixed va created:', r); // eslint-disable-line no-console
    return r;
  })
  .then(({ id }) => va.getFixedVA({ id }))
  .then(r => {
    console.log('fixed va details:', r); // eslint-disable-line no-console
    return r;
  })
  .then(({ id }) => {
    return va.updateFixedVA({
      id,
      suggestedAmt: 20,
      expectedAmt: 30,
    });
  })
  .then(r => {
    console.log('updated va details:', r); // eslint-disable-line no-console
    return r;
  })
  .catch(e => {
    console.error(e); // eslint-disable-line no-console
    process.exit(1);
  });
