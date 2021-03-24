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
    console.log('created payment detail:', payment);

    const retrievedPayment = await ew.getPayment({
      externalID: payment.external_id,
      ewalletType: payment.ewallet_type,
    });
    // eslint-disable-next-line no-console
    console.log('EWallet payment detail:', retrievedPayment);

    const charge = await ew.createEWalletCharge({
      referenceID: Date.now().toString(),
      currency: 'IDR',
      amount: 1688,
      checkoutMethod: 'ONE_TIME_PAYMENT',
      channelCode: 'ID_OVO',
      channelProperties: {
        mobileNumber: '+6281234567890',
      },
      basket: [
        {
          referenceID: 'basket-product-ref-id',
          name: 'product name',
          category: 'mechanics',
          currency: 'IDR',
          price: 50000,
          quantity: 5,
          type: 'wht',
          subCategory: 'evr',
          metadata: {
            meta: 'data',
          },
        },
      ],
      metadata: {
        meta2: 'data2',
      },
    });
    // eslint-disable-next-line no-console
    console.log('created ewallet payment charge:', charge);

    const retrievedCharge = await ew.getEWalletChargeStatus({
      chargeID: charge.id,
    });
    // eslint-disable-next-line no-console
    console.log('retrieved ewallet payment charge:', retrievedCharge);

    const voidedCharge = await ew.voidEWalletCharge({
      chargeID: charge.id,
    });
    // eslint-disable-next-line no-console
    console.log('voided ewallet payment charge:', voidedCharge);

    process.exit(0);
  } catch (e) {
    console.error(e); // eslint-disable-line no-console
    process.exit(1);
  }
})();
