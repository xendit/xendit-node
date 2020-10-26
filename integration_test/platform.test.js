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
    .then(({ user_id }) =>
      p.setCallbackURL({
        forUserID: user_id,
        type: 'invoice',
        url: 'https://httpstat.us/200',
      }),
    )
    .then(({ user_id }) =>
      p.createTransfer({
        reference: `example+${Date.now().toString()}`,
        amount: 1,
        sourceUserID: '5df358652ebad7084a70ac6c',
        destinationUserID: user_id,
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
