const x = require('../xendit');

const { PaymentMethodV2 } = x;
const r = new PaymentMethodV2({});

(async function() {
  try {
    let paymentmethod = await r.createPaymentMethodV2({
        "type": "EWALLET",
        "reusability": "ONE_TIME_USE",
        "ewallet": {
            "channel_code": "PAYMAYA",
            "channel_properties": {
                "success_return_url": "https://redirect.me/goodstuff",
                "failure_return_url": "https://redirect.me/badstuff",
                "cancel_return_url": "https://redirect.me/nostuff"
            }
        },
        "metadata": {}
    });
    console.log('created payment method', paymentmethod); // eslint-disable-line no-console

    const getpaymentmetohd = await r.getPaymentRequestById({ id: paymentmethod.id });
    // eslint-disable-next-line no-console
    console.log('retrieved payment method', paymentmethod);

    const paymentmethodlist = await r.listPaymentMethodV2({});
    // eslint-disable-next-line no-console
    console.log('list of payment method', paymentmethodlist);

    process.exit(0);
  } catch (e) {
    console.error(e); // eslint-disable-line no-console
    process.exit(1);
  }
})();

