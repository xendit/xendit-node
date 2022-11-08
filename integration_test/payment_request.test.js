const x = require('./xendit.test');

const { PaymentRequest } = x;
const pr = new PaymentRequest({});

module.exports = function() {
  return pr
    .createPaymentRequest({
      currency: 'IDR',
      amount: 10000,
      customer_id: '16f72571-9b3a-43dc-b241-5b71f470202f',
      payment_method: {
        type: 'DIRECT_DEBIT',
        reusability: 'ONE_TIME_USE',
        direct_debit: {
          channel_code: 'BRI',
          channel_properties: {
            success_return_url: 'https://your-redirect-website.com/success',
            mobile_number: '+6281299640904',
            card_last_four: '8888',
            card_expiry: '10/29',
            email: 'dharma@gmail.co',
          },
        },
      },
    })
    .then(({ id }) =>
      pr.getPaymentRequestById({
        id,
      }),
    )
    .then(() => {
      // eslint-disable-next-line no-console
      console.log('Payment Request integration test done...');
    })
    .catch(e => {
      throw new Error(
        `Payment Request integration tests failed with error: ${e.message}`,
      );
    });
};
