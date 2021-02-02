const x = require('../xendit');

const { Customer } = x;
const c = new Customer({});

c.createCustomer({
  referenceID: new Date().toISOString(),
  givenNames: 'customer 1',
  email: 'customer@website.com',
  mobileNumber: '+6281212345678',
  description: 'dummy customer',
  middleName: 'middle',
  surname: 'surname',
  addresses: [],
})
  .then(r => {
    console.log('created customer', r); // eslint-disable-line no-console
    return r;
  })
  .then(r => c.getCustomer({ id: r.id }))
  .then(r => {
    console.log('retrieved customer', r); // eslint-disable-line no-console
    return r;
  })
  .then(r => c.getCustomerByReferenceID({ referenceID: r.reference_id }))
  .then(r => {
    console.log('retrieved customers', r); // eslint-disable-line no-console
    return r[0];
  })
  .then(r =>
    c.updateCustomer({
      id: r.id,
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
  .then(r => {
    console.log('updated customer', r); // eslint-disable-line no-console
    return r;
  })
  .catch(e => {
    console.error(e); // eslint-disable-line no-console
    process.exit(1);
  });
