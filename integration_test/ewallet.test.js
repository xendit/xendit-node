const x = require('./xendit.test');

const { EWallet } = x;
const ew = new EWallet({});

module.exports = function() {
  return ew
    .createPayment({
      externalID: Date.now().toString(),
      amount: 1,
      phone: '081234567890',
      ewalletType: EWallet.Type.OVO,
    })
    .then(({ external_id, ewallet_type }) =>
      ew.getPayment({
        externalID: external_id,
        ewalletType: ewallet_type,
      }),
    )
    .then(() => {
      // eslint-disable-next-line no-console
      console.log('EWallet integration test done...');
    });
};
