const x = require('../xendit');

const Card = x.Card;
const card = new Card({});

// These IDs should be obtained using Xendit.js
// https://docs.xendit.co/xenpayments/payments-credit-cards-overview/credit-cards-integration-and-testing/collecting-card-details-tokenization/index.html
// You can generate sample token/authentication data and replace it below
// https://js.xendit.co/test_tokenize.html
// https://js.xendit.co/test_authenticate.html
const tokenID = '6201f056382ab2001b4bc3d6';
const authID = '6205f8dcca71c0001bc26ae6';

function sleepFor(sleepDuration) {
  var now = new Date().getTime();
  while (new Date().getTime() < now + sleepDuration) {
    /* Do nothing */
  }
}

card
  .createCharge({
    tokenID,
    authID,
    amount: 10000,
    // eslint-disable-next-line max-len
    externalID: Date.now().toString(), // use your system's ID of the transaction
    capture: false,
  })
  .then(r => {
    console.log('charge created:', r); // eslint-disable-line no-console
    return r;
  })
  .then(({ id }) =>
    card.captureCharge({
      chargeID: id,
      amount: 10000,
    }),
  )
  .then(r => {
    console.log('charge captured:', r); // eslint-disable-line no-console
    sleepFor(3000);
    return r;
  })
  .then(({ id, external_id }) =>
    card.createRefund({ chargeID: id, externalID: external_id, amount: 5000 }),
  )
  .then(res => {
    console.log('refund created:', res); // eslint-disable-line no-console
    process.exit(0);
  })
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
      endTime: '2022-05-25T00:00:00.000Z',
    }),
  )
  .then(res => {
    console.log('promotion created:', res); // eslint-disable-line no-console
    process.exit(0);
  })
  .catch(e => {
    console.error(e); // eslint-disable-line no-console
    process.exit(1);
  });
