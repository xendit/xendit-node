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
      apiVersion: '2020-05-19',
    });
    console.log('created customer', customer); // eslint-disable-line no-console

    customer = await c.getCustomer({
      id: customer.id,
      apiVersion: '2020-05-19',
    });
    // eslint-disable-next-line no-console
    console.log('retrieved customer', customer);

    const customers = await c.getCustomerByReferenceID({
      referenceID: customer.reference_id,
      apiVersion: '2020-05-19',
    });
    // eslint-disable-next-line no-console
    console.log('retrieved customers', customers);
  } catch (e) {
    console.error(e); // eslint-disable-line no-console
    process.exit(1);
  }
})();

(async function() {
  try {
    let customer = await c.createCustomer({
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
    });
    console.log('created customer', customer); // eslint-disable-line no-console

    customer = await c.getCustomer({
      id: customer.id,
      apiVersion: '2020-10-31',
    });
    // eslint-disable-next-line no-console
    console.log('retrieved customer', customer);

    const customers = await c.getCustomerByReferenceID({
      referenceID: customer.reference_id,
      apiVersion: '2020-10-31',
    });
    // eslint-disable-next-line no-console
    console.log('retrieved customers', customers);
  } catch (e) {
    console.error(e); // eslint-disable-line no-console
    process.exit(1);
  }
})();
