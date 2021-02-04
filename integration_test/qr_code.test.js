const x = require('./xendit.test');

const { QrCode } = x;
const q = new QrCode({});

module.exports = function() {
  return q
    .createCode({
      externalID: Date.now().toString(),
      type: QrCode.Type.Dynamic,
      callbackURL: 'https://httpstat.us/200',
      amount: 10000,
    })
    .then(r => q.getCode({ externalID: r.external_id }))
    .then(r =>
      Promise.all([r.external_id, q.simulate({ externalID: r.external_id })]),
    )
    .then(([externalId, r]) =>
      Promise.all([
        externalId,
        q.getPayments({
          externalID: externalId,
          from: r.created_at,
          to: new Date().toISOString(),
          limit: 10,
        }),
      ]),
    )
    .then(() => {
      // eslint-disable-next-line no-console
      console.log('QR Code integration test done...');
    })
    .catch(e => {
      throw new Error(
        `QR Code integration tests failed with error: ${e.message}`,
      );
    });
};
