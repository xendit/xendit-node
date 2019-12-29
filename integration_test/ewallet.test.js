const x = require('./xendit.test');

const { EWallet } = x;
const ew = new EWallet({});

module.exports = function() {
  return ew
    .createPayment({
      externalID: Date.now().toString(),
      amount: 11000,
      expiration_date: '2020-02-20T00:00:00.000Z',
      callback_url: 'https://my-shop.com/callbacks',
      redirect_url: 'https://my-shop.com/home',
      ewalletType: EWallet.EWalletType.DANA,
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
