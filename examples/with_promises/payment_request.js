const x = require('../xendit');

const PaymentRequest = x.PaymentRequest;
const ref = new PaymentRequest();

ref
  .createPaymentRequest({
    amount: 1500,
    currency: 'PHP',
    payment_method: {
      type: 'EWALLET',
      ewallet: {
        channel_code: 'GRABPAY',
        channel_properties: {
          success_return_url: 'https://redirect.me/goodstuff',
          failure_return_url: 'https://redirect.me/badstuff',
        },
      },
      reusability: 'ONE_TIME_USE',
    },
  })
  .then(r => {
    // eslint-disable-next-line no-console
    console.log('payment request created:', r);
    return r;
  })
  .then(({ id }) => ref.getPaymentRequestById({ id }))
  .then(r => {
    // eslint-disable-next-line no-console
    console.log('payment request details:', r);
    return r;
  })
  .then(() => {
    return ref.listPaymentRequest({});
  })
  .then(r => {
    // eslint-disable-next-line no-console
    console.log(':', r);
    return r;
  })
  .catch(e => {
    console.error(e); // eslint-disable-line no-console
    process.exit(1);
  });
