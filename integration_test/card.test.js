const x = require('./xendit.test');

const Card = x.Card;
const card = new Card({});

module.exports = function() {
  return card.getCharge({ chargeID: '5e0461c615e99e428efad4bc' }).then(() => {
    // eslint-disable-next-line no-console
    console.log('Card integration test done...');
  });
};
