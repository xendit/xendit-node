const x = require('./xendit');

const EWallet = x.EWallet;
const ew = new EWallet({});

ew.ovo
  .createPayment({
    externalID: new Date(),
    amount: 1,
    phone: '081234567890',
  })
  .then(r => {
    console.log('create OVO payment detail:', r); // eslint-disable-line no-console
    return r;
  })
  .then(({ external_id }) =>
    ew.ovo.getPaymentStatusByExtID({ externalID: external_id }),
  )
  .then(r => {
    console.log('OVO payment status detail:', r); // eslint-disable-line no-console
    return r;
  })
  .catch(e => {
    console.error(e); // eslint-disable-line no-console
    process.exit(1);
  });

ew.dana
  .createPayment({
    externalID: new Date(),
    amount: 1,
    callbackURL: 'https://my-shop.com/callbacks',
    redirectURL: 'https://my-shop.com/home',
  })
  .then(r => {
    console.log('create dana payment detail:', r); // eslint-disable-line no-console
    return r;
  })
  .then(({ external_id }) =>
    ew.dana.getPaymentStatusByExtID({ externalID: external_id }),
  )
  .then(r => {
    console.log('Dana payment status detail:', r); // eslint-disable-line no-console
    return r;
  })
  .catch(e => {
    console.error(e); // eslint-disable-line no-console
    process.exit(1);
  });

ew.linkaja
  .createPayment({
    externalID: new Date(),
    phone: '081234567890',
    amount: 30000,
    items: [
      {
        id: '123123',
        name: 'Phone Case',
        price: 100000,
        quantity: 1,
      },
      {
        id: '345678',
        name: 'Powerbank',
        price: 200000,
        quantity: 1,
      },
    ],
    callbackURL: 'https://yourwebsite.com/callback',
    redirectURL: 'https://yourwebsite.com/home',
  })
  .then(r => {
    console.log('create linkAja payment detail:', r); // eslint-disable-line no-console
    return r;
  })
  .catch(e => {
    console.error(e); // eslint-disable-line no-console
    process.exit(1);
  });
