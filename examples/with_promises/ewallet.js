const x = require('../xendit');

const EWallet = x.EWallet;
const ew = new EWallet({});

ew.createPayment({
  externalID: Date.now().toString(),
  amount: 1,
  phone: '081234567890',
  ewalletType: EWallet.Type.OVO,
})
  .then(r => {
    // eslint-disable-next-line no-console
    console.log('created payment detail old ver:', r);
    return r;
  })
  .then(({ external_id, ewallet_type }) =>
    ew.getPayment({
      externalID: external_id,
      ewalletType: ewallet_type,
    }),
  )
  .then(r => {
    // eslint-disable-next-line no-console
    console.log('EWallet payment detail old ver:', r);
    return r;
  })
  .then(() =>
    ew.createPayment({
      referenceID: 'test-reference-id',
      currency: 'IDR',
      amount: 1688,
      checkoutMethod: 'ONE_TIME_PAYMENT',
      channelCode: 'ID_SHOPEEPAY',
      channelProperties: {
        successRedirectURL:
          'https://webhook.site/a2f9bcf0-4d92-4882-a8c5-65a86462050c',
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
    }),
  )
  .then(r => {
    // eslint-disable-next-line no-console
    console.log('created ewallet payment charge:', r);
    return r;
  })
  .then(r =>
    ew.getPayment({
      chargeID: r.id,
    }),
  )
  .then(r => {
    // eslint-disable-next-line no-console
    console.log('retrieved ewallet payment charge:', r);
    return r;
  })
  .catch(e => {
    console.error(e); // eslint-disable-line no-console
    process.exit(1);
  });
