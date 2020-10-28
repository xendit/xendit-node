const x = require('../xendit');

const { Platform } = x;
const p = new Platform({});

p.createAccount({
  accountEmail: `example+${Date.now().toString()}@gmail.com`,
  type: 'OWNED',
  businessProfile: {
    businessName: `example+${Date.now().toString()}`,
  },
})
  .then(r => {
    // eslint-disable-next-line no-console
    console.log('created account details:', r);
    return r;
  })
  .then(({ user_id }) =>
    p.setCallbackURL({
      forUserID: user_id,
      type: 'invoice',
      url: 'https://httpstat.us/200',
    }),
  )
  .then(r => {
    //eslint-disable-next-line no-console
    console.log('callback setting response: ', r);
    return r;
  })
  .then(({ user_id }) =>
    p.createTransfer({
      reference: `example+${Date.now().toString()}`,
      amount: 1,
      sourceUserID: '5df358652ebad7084a70ac6c',
      destinationUserID: user_id,
    }),
  )
  .then(r => {
    // eslint-disable-next-line no-console
    console.log('created transfer details: ', r);
    return r;
  })
  .then(() =>
    p.createFeeRule({
      name: `example+${Date.now().toString()}`,
      description: `Fee rule created on ${Date.now().toString()}`,
      routes: [
        {
          unit: 'flat',
          amount: 1,
          currency: 'IDR',
        },
      ],
    }),
  )
  .then(r => {
    // eslint-disable-next-line no-console
    console.log('created fee rule detail:', r);
    return r;
  })
  .catch(e => {
    console.error(e); // eslint-disable-line no-console
    process.exit(1);
  });
