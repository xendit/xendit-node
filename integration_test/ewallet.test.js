const x = require('./xendit.test');

const { EWallet } = x;
const e = new EWallet({});

module.exports = function() {
  return e
    .createOVOPayment({
      externalID: Date.now().toString(),
      phone: '081234567890',
      amount: 100000,
    })
    .then(() => {
      // eslint-disable-next-line no-console
      console.log('Invoice integration test done...');
    });
};
