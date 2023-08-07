const x = require('./xendit.test');

const { Customer } = x;
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
      apiVersion: '2020-05-19',
    })
    .then(r => c.getCustomer({ id: r.id }))
    .then(r => c.getCustomerByReferenceID({ referenceID: r.reference_id }))
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
