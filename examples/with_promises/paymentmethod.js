const x = require('../xendit');

const PaymentMethodV2 = x.PaymentMethodV2;
const ref = new PaymentMethodV2();

ref
  .createPaymentMethodV2({
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
  })
  .then(r => {
    // eslint-disable-next-line no-console
    console.log('payment method created:', r);
    return r;
  })
  .then(({ id }) => ref.getPaymentMethodByIdV2({ id }))
  .then(r => {
    // eslint-disable-next-line no-console
    console.log('payment method details:', r);
    return r;
  })
  .then(() => {
    return ref.listPaymentMethodV2({});
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
