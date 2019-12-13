console.log('Starting integration test...'); // eslint-disable-line no-console
Promise.all([
  require('./card.test')(),
  require('./disbursement.test')(),
  require('./invoice.test')(),
  require('./va.test')(),
])
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Successful integation test!');
  })
  .catch(e => {
    console.error(e); // eslint-disable-line no-console
    process.exit(1);
  });
