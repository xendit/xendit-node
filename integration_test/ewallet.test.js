const x = require('./xendit.test');

const { EWallet } = x;
const ew = new EWallet({});

module.exports = function() {
  return ew
    .createPayment({
      externalID: Date.now().toString(),
      amount: 1,
      phone: '081234567890',
      ewalletType: EWallet.Type.OVO,
    })
    .then(({ external_id, ewallet_type }) =>
      ew.getPayment({
        externalID: external_id,
        ewalletType: ewallet_type,
      }),
    )
    .then(() =>
      ew.createEWalletCharge({
        referenceID: 'test-reference-id',
        currency: 'IDR',
        amount: 1688,
        checkoutMethod: 'ONE_TIME_PAYMENT',
        channelCode: 'ID_SHOPEEPAY',
        channelProperties: {
          successRedirectURL: 'https://yourwebsite.com/order/123',
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
    .then(r =>
      ew.getEWalletChargeStatus({
        chargeID: r.id,
      }),
    )
    .then(() => {
      // eslint-disable-next-line no-console
      console.log('EWallet integration test done...');
    })
    .catch(e => {
      throw new Error(
        `Ewallet integration tests failed with error: ${e.message}`,
      );
    });
};
