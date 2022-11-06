const x = require('./xendit.test');

const { PaymentMethodV2 } = x;
const pm = new PaymentMethodV2({});

module.exports = function() {
  return pm
    .createPaymentMethodV2({
      type: 'QR_CODE',
      reusability: 'ONE_TIME_USE',
      qr_code: {
        channel_code: 'QRIS',
        amount: 10000,
      },
    })
    .then(pm =>
      pm.listPaymentMethodV2((id = 'pm-6ff0b6f2-f5de-457f-b08f-bc98fbae485a')),
    )
    .then(() => {
      // eslint-disable-next-line no-console
      console.log('Platform integration test done...');
    })
    .catch(e => {
      throw new Error(
        `Platform integration tests failed with error: ${e.message}`,
      );
    });
};
