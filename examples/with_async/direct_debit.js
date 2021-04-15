const x = require('../xendit');

const { DirectDebit, Customer } = x;
const dd = new DirectDebit({});
const c = new Customer({});

(async function() {
  try {
    let customer = await c.createCustomer({
      referenceID: new Date().toISOString(),
      givenNames: 'customer 1',
      email: 'customer@website.com',
      mobileNumber: '+6281212345678',
      description: 'dummy customer',
      middleName: 'middle',
      surname: 'surname',
      addresses: [],
    });

    let tokenization = await dd.initializeTokenization({
      customerID: customer.id,
      channelCode: 'DC_BRI',
      properties: {
        accountMobileNumber: '+62818555988',
        cardLastFour: '8888',
        cardExpiry: '06/24',
        accountEmail: 'test.email@xendit.co',
      },
    });
    // eslint-disable-next-line no-console
    console.log('initialized tokenization', tokenization);

    let validateOTP = await dd.validateOTPforLinkedAccount({
      tokenID: tokenization.id,
      otpCode: '333000',
    });
    // eslint-disable-next-line no-console
    console.log('validated account', validateOTP);

    let accounts = await dd.retrieveAccountsByTokenID({
      tokenID: tokenization.id,
    });
    // eslint-disable-next-line no-console
    console.log('retrieved accounts', accounts);

    let paymentMethod = await dd.createPaymentMethod({
      customerID: customer.id,
      type: 'DEBIT_CARD',
      properties: {
        id: accounts[0].id,
      },
    });
    // eslint-disable-next-line no-console
    console.log('created payment method', paymentMethod);

    let paymentMethods = await dd.getPaymentMethodsByCustomerID({
      customerID: customer.id,
    });
    // eslint-disable-next-line no-console
    console.log('retrieved payment methods', paymentMethods);

    let ddPayment = await dd.createDirectDebitPayment({
      idempotencyKey: new Date().toISOString(),
      referenceID: 'merchant-ref-id-ex-1',
      paymentMethodID: paymentMethod.id,
      currency: 'IDR',
      amount: 15000,
      callbackURL: 'https://payment-callback-listener/',
      enableOTP: true,
      basket: [
        {
          referenceID: 'product-ref-id-ex-1',
          name: 'product 1',
          market: 'ID',
          type: 'good type',
          description: 'good quality',
          category: 'category',
          subCategory: 'subcategory',
          price: '10000',
          url: 'https://product-url/',
          metadata: {
            meta: 'data',
          },
          quantity: 15,
        },
        {
          referenceID: 'product-ref-id-ex-2',
          name: 'product 2',
          market: 'ID',
          type: 'good type',
        },
      ],
      metadata: {
        meta: 'data',
      },
    });
    // eslint-disable-next-line no-console
    console.log('created direct debit payment', ddPayment);

    validateOTP = await dd.validateOTPforPayment({
      directDebitID: ddPayment.id,
      otpCode: '222000',
    });
    // eslint-disable-next-line no-console
    console.log('validated payment', validateOTP);

    ddPayment = await dd.getDirectDebitPaymentStatusByID({
      directDebitID: ddPayment.id,
    });
    // eslint-disable-next-line no-console
    console.log('retrieved direct debit payment', ddPayment);

    let ddPayments = await dd.getDirectDebitPaymentStatusByReferenceID({
      referenceID: ddPayment.reference_id,
    });
    // eslint-disable-next-line no-console
    console.log('retrieved direct debit payments', ddPayments);
  } catch (e) {
    console.error(e); // eslint-disable-line no-console
    process.exit(1);
  }
})();
