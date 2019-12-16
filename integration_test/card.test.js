const x = require('./xendit.test');

const Card = x.Card;
const card = new Card({});

module.exports = function() {
  return card
    .createToken({
      cardNumber: '4000000000000002',
      expMonth: '12',
      expYear: '2020',
      cardCVN: '123',
      isSingleUse: false,
      shouldAuthenticate: false,
    })
    .then(() => {
      // eslint-disable-next-line no-console
      console.log('Card integration test done...');
    });
};
