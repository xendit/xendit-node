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
  apiVersion: '2020-05-19',
})
  .then(r => {
    console.log('created customer', r); // eslint-disable-line no-console
    return r;
  })
  .then(r => c.getCustomer({ id: r.id, apiVersion: '2020-05-19' }))
  .then(r => {
    console.log('retrieved customer', r); // eslint-disable-line no-console
    return r;
  })
  .then(r =>
    c.getCustomerByReferenceID({
      referenceID: r.reference_id,
      apiVersion: '2020-05-19',
    }),
  )
  .then(r => {
    console.log('retrieved customers', r); // eslint-disable-line no-console
    return r[0];
  })
  .catch(e => {
    console.error(e); // eslint-disable-line no-console
    process.exit(1);
  });

c.createCustomer({
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
  .then(r => {
    console.log('created customer', r); // eslint-disable-line no-console
    return r;
  })
  .then(r => c.getCustomer({ id: r.id, apiVersion: '2020-10-31' }))
  .then(r => {
    console.log('retrieved customer', r); // eslint-disable-line no-console
    return r;
  })
  .then(r =>
    c.getCustomerByReferenceID({
      referenceID: r.reference_id,
      apiVersion: '2020-10-31',
    }),
  )
  .then(r => {
    console.log('retrieved customers', r); // eslint-disable-line no-console
    return r[0];
  })
  .catch(e => {
    console.error(e); // eslint-disable-line no-console
    process.exit(1);
  });
