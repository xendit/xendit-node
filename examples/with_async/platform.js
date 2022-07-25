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
      sourceUserID: '623d3cda7012f7478e9a7e69',
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

    const accountV2 = await p.createV2Account({
      email: `example+${Date.now().toString()}@gmail.com`,
      type: 'OWNED',
      publicProfile: {
        businessName: `example+${Date.now().toString()}`,
      },
    });

    // eslint-disable-next-line no-console
    console.log('created account details (using V2):', accountV2);

    const getAccount = await p.getAccountByID({
      id: accountV2.id,
    });

    // eslint-disable-next-line no-console
    console.log('get account details: ', getAccount);

    const updateAccount = await p.updateAccount({
      id: accountV2.id,
      email: `example_updated+${Date.now().toString()}@gmail.com`,
      publicProfile: {
        businessName: `example_updated+${Date.now().toString()}`,
      },
    });

    // eslint-disable-next-line no-console
    console.log('update account details: ', updateAccount);

    process.exit(0);
  } catch (e) {
    console.error(e); // eslint-disable-line no-console
    process.exit(1);
  }
})();
