const x = require('../xendit');

const { Payout } = x;
const p = new Payout({});

(async function() {
  try {
    const payout = await p.createPayout({
      externalID: Date.now().toString(),
      amount: 10000,
      email: 'stanley@xendit.co',
    });
    console.log('created payout:', payout); // eslint-disable-line no-console

    const { id } = payout;
    const retrievedPayout = await p.getPayout({ id });
    // eslint-disable-next-line no-console
    console.log('retrieved payout:', retrievedPayout);

    const voidedPayout = await p.voidPayout({ id });
    // eslint-disable-next-line no-console
    console.log('payout voided:', voidedPayout.id);

    process.exit(0);
  } catch (e) {
    console.error(e); // eslint-disable-line no-console
    process.exit(1);
  }
})();
