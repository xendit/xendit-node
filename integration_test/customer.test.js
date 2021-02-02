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
    })
    .then(r => c.getCustomer({ id: r.id }))
    .then(r => c.getCustomerByReferenceID({ referenceID: r.reference_id }))
    .then(r =>
      c.updateCustomer({
        id: r[0].id,
        description: 'customer dummy',
        phoneNumber: '+628987654321',
        nationality: 'ID',
        dateOfBirth: '2000-06-13',
        addresses: [
          {
            streetLine1: 'jalan raya',
            country: 'ID',
            city: 'Jakarta',
          },
          {
            streetLine1: 'jalan raya 2',
            country: 'ID',
            city: 'Jakarta',
          },
        ],
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
