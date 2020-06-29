const x = require('../xendit');

const { QrCode } = x;
const q = new QrCode({});

q.createCode({
  externalID: Date.now().toString(),
  type: QrCode.Type.Dynamic,
  callbackURL: 'https://httpstat.us/200',
  amount: 10000,
})
  .then(r => {
    console.log('created QR code', r); // eslint-disable-line no-console
    return r;
  })
  .then(r => q.getCode({ externalID: r.external_id }))
  .then(r => {
    console.log('retrieved QR code', r); // eslint-disable-line no-console
    return r;
  })
  .then(r =>
    Promise.all([r.external_id, q.simulate({ externalID: r.external_id })]),
  )
  .then(([externalID, r]) => {
    console.log('simulated payment', r); // eslint-disable-line no-console
    return externalID;
  })
  .catch(e => {
    console.error(e); // eslint-disable-line no-console
    process.exit(1);
  });
