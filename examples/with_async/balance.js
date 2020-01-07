const x = require('../xendit');

const { Balance } = x;
const b = new Balance({});

(async function() {
  try {
    const r = await b.getBalance({
      accountType: Balance.AccountType.Holding,
    });
    console.log('Holding balance:', r); // eslint-disable-line no-console
    process.exit(0);
  } catch (e) {
    console.error(e); // eslint-disable-line no-console
    process.exit(1);
  }
})();
