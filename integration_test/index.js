console.log('Starting Integration Test...'); // eslint-disable-line no-console
Promise.all([
  require('./card.test')(),
  require('./disbursement.test')(),
  require('./invoice.test')(),
  require('./va.test')(),
  require('./payout.test')(),
  require('./recurring.test')(),
  require('./balance.test')(),
  require('./retail_outlet.test')(),
  // require('./ewallet.test')(),
  require('./qr_code.test')(),
  require('./platform.test')(),
  require('./regional_retail_outlet.test'),
  require('./customer.test')(),
  require('./direct_debit.test')(),
  require('./report.test')(),
  require('./transaction.test')(),
  require('./payment_request.test')(),
  require('./payment_method_v2.test'),
  // require('./refund.test')() //test disabled until refunds endpoint is fixed
])
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Successful Integration Test!');
  })
  .catch(e => {
    console.error(e); // eslint-disable-line no-console
    process.exit(1);
  });
