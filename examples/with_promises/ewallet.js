const x = require('../xendit');

const { EWallet, Customer } = x;
const ew = new EWallet({});
const c = new Customer({});

/*
 * The entire EWallet tokenization flow, at this time,
 *    cannot be replicated through an example
 * This is because of the system design,
 *    once a token is created it has
 *    to be verified manually by using the authorizer url.
 *    Subsequent methods `create payment method`,
 *    `get payment by ID`, and `unlink tokenization`
 *    can only be carried out after the manual authorization
 */

ew.createPayment({
  externalID: Date.now().toString(),
  amount: 1,
  phone: '081234567890',
  ewalletType: EWallet.Type.OVO,
})
  .then(r => {
    // eslint-disable-next-line no-console
    console.log('created payment detail:', r);
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
    console.log('EWallet payment detail:', r);
    return r;
  })
  .then(() =>
    ew.createEWalletCharge({
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
    }),
  )
  .then(r => {
    // eslint-disable-next-line no-console
    console.log('created ewallet payment charge:', r);
    return r;
  })
  .then(r =>
    ew.getEWalletChargeStatus({
      chargeID: r.id,
    }),
  )
  .then(r => {
    // eslint-disable-next-line no-console
    console.log('retrieved ewallet payment charge:', r);
    return r;
  })
  .then(r =>
    ew.voidEWalletCharge({
      chargeID: r.id,
    }),
  )
  .then(r => {
    // eslint-disable-next-line no-console
    console.log('voided ewallet payment charge:', r);
    return r;
  })
  .then(() =>
    c.createCustomer({
      referenceID: new Date().toISOString(),
      givenNames: 'customer 1',
      email: 'customer@website.com',
      mobileNumber: '+6281212345678',
      description: 'dummy customer',
      middleName: 'middle',
      surname: 'surname',
      addresses: [],
      apiVersion: '2020-05-19',
    }),
  )
  .then(r => {
    // eslint-disable-next-line no-console
    console.log('created customer:', r);
    return r;
  })
  .then(r =>
    ew.initializeTokenization({
      customerID: r.id,
      channelCode: 'PH_GRABPAY',
      properties: {
        successRedirectURL: 'https://www.google.com',
        failureRedirectURL: 'https://www.google.com',
        callbackURL: 'https://www.google.com',
      },
    }),
  )
  .then(r => {
    // eslint-disable-next-line no-console
    console.log('initialized tokenization:', r);
    return r;
  })
  .catch(e => {
    console.error(e); // eslint-disable-line no-console
    process.exit(1);
  });
