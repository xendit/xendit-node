const x = require('./xendit.test');

const { Payout } = x;
const p = new Payout({});

module.exports = function() {
  return p
    .createPayout({
      externalID: Date.now().toString(),
      amount: 10000,
    })
    .then(({ id }) => p.getPayout({ id }))
    .then(({ id }) => p.voidPayout({ id }))
    .then(() => {
      // eslint-disable-next-line no-console
      console.log('Payout integration test done...');
    });
};
