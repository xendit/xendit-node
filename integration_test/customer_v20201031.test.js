const x = require('./xendit.test');

const { Customer } = x;
const c = new Customer({});

module.exports = function() {
  return c
    .createCustomer({
      referenceID: new Date().toISOString(),
      type: 'INDIVIDUAL',
      individualDetail: {
        givenNames: 'customer 1',
        surname: 'surname',
      },
      email: 'customer@website.com',
      mobileNumber: '+6281212345678',
      description: 'dummy customer',
      addresses: [],
      apiVersion: '2020-10-31',
    })
    .then(r => c.getCustomer({ id: r.id, apiVersion: '2020-10-31' }))
    .then(r =>
      c.getCustomerByReferenceID({
        referenceID: r.reference_id,
        apiVersion: '2020-10-31',
      }),
    )
    .then(() => {
      // eslint-disable-next-line no-console
      console.log('Customer integration test done...');
    })
    .catch(e => {
      throw new Error(
        `Customer integration tests failed with error: ${e.message}`,
      );
    });
};
