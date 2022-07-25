const x = require('./xendit.test');

const Card = x.Card;
const card = new Card({});
//  5e046a736113354249aab8bd old charge
module.exports = function() {
  return card
    .getCharge({ chargeID: '623d397a360c32001b0aeeda' })
    .then(() =>
      card.createPromotion({
        referenceId: Date.now().toString(),
        description: '20% discount applied for all BRI cards',
        binList: ['400000', '460000'],
        discountPercent: 20,
        channelCode: 'BRI',
        currency: 'IDR',
        minOriginalAmount: 25000,
        maxDiscountAmount: 5000,
        startTime: '2022-03-25T00:00:00.000Z',
        endTime: '2025-05-25T00:00:00.000Z',
      }),
    )
    .then(() => {
      // eslint-disable-next-line no-console
      console.log('Card integration test done...');
    })
    .catch(e => {
      throw new Error(`Card integration tests failed with error: ${e.message}`);
    });
};
