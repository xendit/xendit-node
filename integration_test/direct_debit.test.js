const x = require('./xendit.test');

const { DirectDebit, Customer } = x;
const dd = new DirectDebit({});
const c = new Customer({});

module.exports = function() {
  return c
    .createCustomer({
      referenceID: new Date().toISOString(),
      givenNames: 'customer 1',
      email: 'customer@website.com',
      mobileNumber: '+6281212345678',
      description: 'dummy customer',
      middleName: 'middle',
      surname: 'surname',
      addresses: [],
    })
    .then(r =>
      dd.initializeTokenization({
        customerID: r.id,
        channelCode: 'DC_BRI',
        properties: {
          accountMobileNumber: '+62818555988',
          cardLastFour: '8888',
          cardExpiry: '06/24',
          accountEmail: 'test.email@xendit.co',
        },
      }),
    )
    .then(r =>
      dd.validateOTPforLinkedAccount({
        tokenID: r.id,
        otpCode: '333000',
      }),
    )
    .then(r =>
      Promise.all([
        r.customer_id,
        dd.retrieveAccountsByTokenID({ tokenID: r.id }),
      ]),
    )
    .then(([customerID, r]) =>
      dd.createPaymentMethod({
        customerID: customerID,
        type: 'DEBIT_CARD',
        properties: {
          id: r[0].id,
        },
      }),
    )
    .then(r =>
      dd.getPaymentMethodsByCustomerID({
        customerID: r.customer_id,
      }),
    )
    .then(r =>
      dd.createDirectDebitPayment({
        idempotencyKey: new Date().toISOString(),
        referenceID: 'merchant-ref-id-ex-1',
        paymentMethodID: r[0].id,
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
      }),
    )
    .then(r =>
      dd.validateOTPforPayment({
        directDebitID: r.id,
        otpCode: '222000',
      }),
    )
    .then(r =>
      dd.getDirectDebitPaymentStatusByID({
        directDebitID: r.id,
      }),
    )
    .then(r =>
      dd.getDirectDebitPaymentStatusByReferenceID({
        referenceID: r.reference_id,
      }),
    )
    .then(() => {
      // eslint-disable-next-line no-console
      console.log('Direct debit integration test done...');
    })
    .catch(e => {
      throw new Error(
        `Direct debit integration tests failed with error: ${e.message}`,
      );
    });
};
