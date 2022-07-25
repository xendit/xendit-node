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

    let customer = await c.createCustomer({
      referenceID: new Date().toISOString(),
      givenNames: 'customer 1',
      email: 'customer@website.com',
      mobileNumber: '+6281212345678',
      description: 'dummy customer',
      middleName: 'middle',
      surname: 'surname',
      addresses: [],
      apiVersion: '2020-05-19',
    });
    // eslint-disable-next-line no-console
    console.log('created customer', customer);

    let tokenization = await ew.initializeTokenization({
      customerID: customer.id,
      channelCode: 'PH_GRABPAY',
      properties: {
        successRedirectURL: 'https://www.google.com',
        failureRedirectURL: 'https://www.google.com',
        callbackURL: 'https://www.google.com',
      },
    });
    // eslint-disable-next-line no-console
    console.log('initialized tokenization', tokenization);
    process.exit(0);
  } catch (e) {
    console.error(e); // eslint-disable-line no-console
    process.exit(1);
  }
})();
