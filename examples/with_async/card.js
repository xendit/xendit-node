const x = require('../xendit');

const Card = x.Card;
const card = new Card({});

// These IDs should be obtained using Xendit.js
// https://docs.xendit.co/xenpayments/payments-credit-cards-overview/credit-cards-integration-and-testing/collecting-card-details-tokenization/index.html
const tokenID = '5e0461a86113354249aab7ec';
const authID = '5e0461a96113354249aab7ee';

(async function() {
  try {
    const charge = await card.createCharge({
      tokenID,
      authID,
      amount: 10000,
      // eslint-disable-next-line max-len
      externalID: Date.now().toString(), // use your system's ID of the transaction
      capture: false,
    });
    console.log('charge created:', charge); // eslint-disable-line no-console

    const capture = await card.captureCharge({
      chargeID: id,
      amount: 10000,
    });
    console.log('charge captured:', capture); // eslint-disable-line no-console

    const refund = await card.createRefund({
      chargeID: id,
      externalID: external_id,
      amount: 5000,
    });
    console.log('refund created:', refund); // eslint-disable-line no-console

    process.exit(0);
  } catch (e) {
    console.error(e); // eslint-disable-line no-console
    process.exit(1);
  }
})();
