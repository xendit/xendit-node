const x = require('./xendit.test');

const { PaymentMethodV2 } = x;
const pm = new PaymentMethodV2({});

module.exports = function() {
  return pm
    .createPaymentMethodV2({
      type: 'DIRECT_DEBIT',
      reusability: 'ONE_TIME_USE',
      customer_id: '16f72571-9b3a-43dc-b241-5b71f470202f',
      country: 'ID',
      direct_debit: {
        channel_code: 'BRI',
        channel_properties: {
          mobile_number: '+6281299640904',
          card_last_four: '8888',
          card_expiry: '10/29',
          email: 'dharma@xendit.co',
        },
      },
    })
    .then(id => {
      pm.authorizePaymentMethodV2({
        id,
        auth_code: '333000',
      });
    })
    .then(id => {
      pm.getPaymentMethodByIdV2({ id });
    })
    .then(() => {
      pm.listPaymentMethodV2({});
    })
    .then(() => {
      // eslint-disable-next-line no-console
      console.log('payment method integration test done...');
    })
    .catch(e => {
      throw new Error(
        `payment method integration tests failed with error: ${e.message}`,
      );
    });
};
