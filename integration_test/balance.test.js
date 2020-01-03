const x = require('./xendit.test');

const { Balance } = x;
const b = new Balance({});

module.exports = function() {
  return b.getBalance().then(() => {
    // eslint-disable-next-line no-console
    console.log('Balance integration test done...');
  });
};
