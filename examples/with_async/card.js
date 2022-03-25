const x = require('../xendit');

const Card = x.Card;
const card = new Card({});

// These IDs should be obtained using Xendit.js
// https://docs.xendit.co/xenpayments/payments-credit-cards-overview/credit-cards-integration-and-testing/collecting-card-details-tokenization/index.html
// You can generate sample token/authentication data and replace it below
// https://js.xendit.co/test_tokenize.html
// https://js.xendit.co/test_authenticate.html
const tokenID = '623d394d672113001b79c1a1';
const authID = '623d394d672113001b79c1a2';

function sleepFor(sleepDuration) {
  var now = new Date().getTime();
  while (new Date().getTime() < now + sleepDuration) {
    /* Do nothing */
  }
}

(async function() {
  try {
    const charge = await card.createCharge({
      tokenID,
      authID,
      amount: 10000,
      // eslint-disable-next-line max-len
      externalID: Date.now().toString(), // use your system's ID of the transaction
      capture: false,
      metadata: {
        test: `data`,
      },
    });
    console.log('charge created:', charge); // eslint-disable-line no-console

    const capture = await card.captureCharge({
      chargeID: charge.id,
      amount: 10000,
    });
    console.log('charge captured:', capture); // eslint-disable-line no-console

    sleepFor(3000);

    const refund = await card.createRefund({
      chargeID: charge.id,
      externalID: charge.external_id,
      amount: 5000,
    });
    console.log('refund created:', refund); // eslint-disable-line no-console

    const promotion = await card.createPromotion({
      referenceId: Date.now().toString(),
      description: '20% discount applied for all BRI cards',
      binList: ['400000', '460000'],
      discountPercent: 20,
      channelCode: 'BRI',
      currency: 'IDR',
      minOriginalAmount: 25000,
      maxDiscountAmount: 5000,
      startTime: '2022-01-25T00:00:00.000Z',
      endTime: '2023-01-25T00:00:00.000Z',
    });
    // eslint-disable-next-line max-len
    console.log('promotion created:', promotion); // eslint-disable-line no-console

    process.exit(0);
  } catch (e) {
    console.error(e); // eslint-disable-line no-console
    process.exit(1);
  }
})();
