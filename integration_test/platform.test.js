const x = require('./xendit.test');

const { Platform } = x;
const p = new Platform({});

module.exports = function() {
  return p
    .createAccount({
      accountEmail: `example+${Date.now().toString()}@gmail.com`,
      type: 'OWNED',
      businessProfile: {
        businessName: `example+${Date.now().toString()}`,
      },
    })
    .then(r =>
      p.setCallbackURL({
        forUserID: r.user_id,
        type: 'invoice',
        url: 'https://httpstat.us/200',
      }),
    )
    .then(r =>
      p.createTransfer({
        reference: `example+${Date.now().toString()}`,
        amount: 1,
        sourceUserID: '623d3cda7012f7478e9a7e69',
        destinationUserID: r.user_id,
      }),
    )
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
    .then(() =>
      p.createV2Account({
        email: `example+${Date.now().toString()}@gmail.com`,
        type: 'OWNED',
        publicProfile: {
          businessName: `example+${Date.now().toString()}`,
        },
      }),
    )
    .then(r =>
      p.getAccountByID({
        id: r.id,
      }),
    )
    .then(r =>
      p.updateAccount({
        id: r.id,
        email: `example_updated+${Date.now().toString()}@gmail.com`,
        publicProfile: {
          businessName: `example_updated+${Date.now().toString()}`,
        },
      }),
    )
    .then(() => {
      // eslint-disable-next-line no-console
      console.log('Platform integration test done...');
    })
    .catch(e => {
      throw new Error(
        `Platform integration tests failed with error: ${e.message}`,
      );
    });
};
