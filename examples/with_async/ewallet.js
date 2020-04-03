const x = require('../xendit');

const EWallet = x.EWallet;
const ew = new EWallet({});

(async function() {
  try {
    const payment = await ew.createPayment({
      externalID: Date.now().toString(),
      amount: 1,
      phone: '081234567890',
      ewalletType: EWallet.Type.OVO,
    });
    // eslint-disable-next-line no-console
    console.log('create payment detail:', payment);

    const retrievedPayment = await ew.getPayment({
      externalID: payment.external_id,
      ewalletType: payment.ewallet_type,
    });
    // eslint-disable-next-line no-console
    console.log('EWallet payment detail:', retrievedPayment);

    process.exit(0);
  } catch (e) {
    console.error(e); // eslint-disable-line no-console
    process.exit(1);
  }
})();
