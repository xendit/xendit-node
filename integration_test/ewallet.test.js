const x = require('./xendit.test');

const { EWallet } = x;
const ew = new EWallet({});

module.exports = function() {
  return ew.ovo
    .createPayment({
      externalID: Date.now().toString(),
      phone: '081234567890',
      amount: 1,
    })
    .then(r => ew.ovo.getPaymentStatusByExtID({ externalID: r.external_id }))
    .then(() => {
      // eslint-disable-next-line no-console
      console.log('EWallet integration test done...');
    });
};
