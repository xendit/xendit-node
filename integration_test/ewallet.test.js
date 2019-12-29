const x = require('./xendit.test');

const { EWallet } = x;
const ew = new EWallet({});

module.exports = function() {
  return ew
    .createPayment({
      externalID: Date.now().toString(),
      amount: 11000,
      expirationDate: '2020-02-20T00:00:00.000Z',
      callbackURL: 'https://my-shop.com/callbacks',
      redirectURL: 'https://my-shop.com/home',
      ewalletType: EWallet.EWalletType.Dana,
    })
    .then(r =>
      ew.getPayment({
        externalID: r.external_id,
        ewalletType: r.ewallet_type,
      }),
    )
    .then(() => {
      // eslint-disable-next-line no-console
      console.log('EWallet integration test done...');
    });
};
