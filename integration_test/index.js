console.log('Starting integration test...'); // eslint-disable-line no-console
Promise.all([
  require('./card.test')(),
  require('./disbursement.test')(),
  require('./invoice.test')(),
  require('./va.test')(),
  require('./payout.test')(),
  require('./recurring.test')(),
  require('./balance.test')(),
  require('./retail_outlet.test')(),
  require('./ewallet.test')(),
])
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Successful integation test!');
  })
  .catch(e => {
    console.error(e); // eslint-disable-line no-console
    process.exit(1);
  });
