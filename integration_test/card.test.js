const x = require('./xendit.test');

const Card = x.Card;
const card = new Card({});

module.exports = function() {
  return card
    .getCharge({ chargeID: '5e046a736113354249aab8bd' })
    .then(() => {
      // eslint-disable-next-line no-console
      console.log('Card integration test done...');
    })
    .catch(e => {
      throw new Error(`Card integration tests failed with error: ${e.message}`);
    });
};
