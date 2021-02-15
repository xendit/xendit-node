const x = require('../xendit');

const { Customer } = x;
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
    console.log('created customer', customer); // eslint-disable-line no-console

    customer = await c.getCustomer({ id: customer.id });
    // eslint-disable-next-line no-console
    console.log('retrieved customer', customer);

    const customers = await c.getCustomerByReferenceID({
      referenceID: customer.reference_id,
    });
    // eslint-disable-next-line no-console
    console.log('retrieved customers', customers);

    customer = await c.updateCustomer({
      id: customer.id,
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
    });
    console.log('updated customer', customer); //eslint-disable-line no-console
  } catch (e) {
    console.error(e); // eslint-disable-line no-console
    process.exit(1);
  }
})();
