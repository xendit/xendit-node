const x = require('./xendit.test');

const { EWallet } = x;
const ew = new EWallet({});

module.exports = function() {
  return ew
    .createPayment({
      externalID: Date.now().toString(),
      phone: '087877971875',
      amount: 1,
      ewalletType: 'OVO',
    })
    .then(r =>
      ew.getPayment({
        externalID: r.external_id,
        ewalletType: r.ewallet_type,
      }),
    )
    .then(() => {
      // eslint-disable-next-line no-console
      console.log('EWallet integration test done...');
    });
};
