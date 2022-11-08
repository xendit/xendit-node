const x = require('../xendit');

const { PaymentMethodV2 } = x;
const pm = new PaymentMethodV2({});

(async function() {
  try {
    let createdPaymentMethod = await pm.createPaymentMethodV2({
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
    });
    // eslint-disable-next-line no-console
    console.log('created payment method', createdPaymentMethod);

    const paymentMethodDetailsById = await pm.getPaymentMethodByIdV2({
      id: createdPaymentMethod.id,
    });
    // eslint-disable-next-line no-console
    console.log('retrieved payment method', paymentMethodDetailsById);

    const listOfPaymentMethod = await pm.listPaymentMethodV2({});
    // eslint-disable-next-line no-console
    console.log('retrieved payment method list', listOfPaymentMethod);

    const authorizedPaymentMethod = await pm.authorizePaymentMethodV2({
      id: createdPaymentMethod.id,
      auth_code: '333000',
    });
    // eslint-disable-next-line no-console
    console.log('authorized payment method', authorizedPaymentMethod);

    process.exit(0);
  } catch (e) {
    console.error(e); // eslint-disable-line no-console
    process.exit(1);
  }
})();
