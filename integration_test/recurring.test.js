const x = require('./xendit.test');

const { RecurringPayment } = x;
const rp = new RecurringPayment({});

module.exports = function() {
  return rp
    .createPayment({
      externalID: '123',
      payerEmail: 'stanley@xendit.co',
      description: 'Payment for something',
      amount: 10000,
      interval: RecurringPayment.Interval.Month,
      intervalCount: 1,
    })
    .then(({ id }) => rp.getPayment({ id }))
    .then(({ id }) => rp.editPayment({ id, amount: 20000 }))
    .then(({ id }) => rp.pausePayment({ id }))
    .then(({ id }) => rp.resumePayment({ id }))
    .then(({ id }) => rp.stopPayment({ id }))
    .then(() => {
      // eslint-disable-next-line no-console
      console.log('Recurring payments integration test done...');
    })
    .catch(e => {
      throw new Error(
        `Recurring integration tests failed with error: ${e.message}`,
      );
    });
};
