const x = require('../xendit');

const { Platform } = x;
const p = new Platform({});

(async function() {
  try {
    const account = await p.createAccount({
      accountEmail: `example+${Date.now().toString()}@gmail.com`,
      type: 'OWNED',
      businessProfile: {
        businessName: `example+${Date.now().toString()}`,
      },
    });
    // eslint-disable-next-line no-console
    console.log('created account details:', account);

    const cbResponse = await p.setCallbackURL({
      forUserID: account.user_id,
      type: 'invoice',
      url: 'https://httpstat.us/200',
    });

    //eslint-disable-next-line no-console
    console.log('callback setting response: ', cbResponse);

    const transfer = await p.createTransfer({
      reference: `example+${Date.now().toString()}`,
      amount: 1,
      sourceUserID: '5df358652ebad7084a70ac6c',
      destinationUserID: account.user_id,
    });

    // eslint-disable-next-line no-console
    console.log('created transfer details: ', transfer);

    const feeRule = await p.createFeeRule({
      name: `example+${Date.now().toString()}`,
      description: `Fee rule created on ${Date.now().toString()}`,
      routes: [
        {
          unit: 'flat',
          amount: 1,
          currency: 'IDR',
        },
      ],
    });

    // eslint-disable-next-line no-console
    console.log('created fee rule detail:', feeRule);

    process.exit(0);
  } catch (e) {
    console.error(e); // eslint-disable-line no-console
    process.exit(1);
  }
})();
