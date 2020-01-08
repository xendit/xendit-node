const x = require('../xendit');

const { Balance } = x;
const b = new Balance({});

b.getBalance({
  accountType: Balance.AccountType.Holding,
})
  .then(r => {
    console.log('Holding balance:', r); // eslint-disable-line no-console
    process.exit(0);
  })
  .catch(e => {
    console.error(e); // eslint-disable-line no-console
    process.exit(1);
  });
