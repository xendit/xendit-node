const x = require('./xendit.test');

const { EWallet, Customer } = x;
const ew = new EWallet({});
const c = new Customer({});

/*
 * The entire EWallet tokenization flow, at this time,
 *    cannot be replicated through an integration test
 * This is because of the system design,
 *    once a token is created it has
 *    to be verified manually by using the authorizer url.
 *    Subsequent methods `create payment method`,
 *    `get payment by ID`, and `unlink tokenization`
 *    can only be carried out after the manual authorization
 */

module.exports = function() {
  return ew
    .createEWalletCharge({
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
    })
    .then(r =>
      ew.getEWalletChargeStatus({
        chargeID: r.id,
      }),
    )
    .then(r =>
      ew.voidEWalletCharge({
        chargeID: r.id,
      }),
    )
    .then(() =>
      c.createCustomer({
        referenceID: new Date().toISOString(),
        givenNames: 'Test Customer',
        email: 'customer_test@website.com',
        mobileNumber: '+6281212345678',
        description: 'dummy customer',
        middleName: 'middle',
        surname: 'surname',
        addresses: [],
        apiVersion: '2020-05-19',
      }),
    )
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
