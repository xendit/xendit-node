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
  .then(r =>
    Promise.all([
      r,
      q.getPayments({
        externalID: r,
        from: '2021-01-04T08:09:30.000Z',
        to: new Date().toISOString(),
        limit: 10,
      }),
    ]),
  )
  .then(([externalID, r]) => {
    console.log('retrieved payments', r); // eslint-disable-line no-console
    return externalID;
  })
  .catch(e => {
    console.error(e); // eslint-disable-line no-console
    process.exit(1);
  });
