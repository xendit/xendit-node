const x = require('./xendit.test');

const { Payout } = x;
const p = new Payout({});

module.exports = function() {
  return p
    .createPayout({
      externalID: Date.now().toString(),
      amount: 10000,
      email: 'test@example.com',
    })
    .then(({ id }) => p.getPayout({ id }))
    .then(({ id }) => p.voidPayout({ id }))
    .then(() => {
      // eslint-disable-next-line no-console
      console.log('Payout integration test done...');
    })
    .catch(e => {
      throw new Error(
        `Payout integration tests failed with error: ${e.message}`,
      );
    });
};
