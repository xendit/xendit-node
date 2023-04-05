const x = require('../xendit');

const { PaymentRequest } = x;
const r = new PaymentRequest({});

(async function() {
  try {
    let paymentrequest = await r.createPaymentRequest({
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
    });
    console.log('created payment request', paymentrequest); // eslint-disable-line no-console

    const getpaymentrequest = await r.getPaymentRequestById({
      id: paymentrequest.id,
    });
    // eslint-disable-next-line no-console
    console.log('retrieved payment request', getpaymentrequest);

    const getpaymentrequestList = await r.listPaymentRequest({});
    // eslint-disable-next-line no-console
    console.log('list of payment request', getpaymentrequestList);

    process.exit(0);
  } catch (e) {
    console.error(e); // eslint-disable-line no-console
    process.exit(1);
  }
})();
