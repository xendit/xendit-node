const x = require('../xendit');

const { Transaction } = x;
const t = new Transaction({});

(async function() {
  try {
    const listTransactions = await t.listTransactions({
      types: ['DISBURSEMENT', 'PAYMENT'],
      statuses: ['PENDING', 'SUCCESS'],
      channelCategories: ['BANK'],
      createdDateFrom: new Date(
        new Date().getTime() - 30 * 24 * 60 * 60 * 1000,
      ),
      createdDateTo: new Date(),
    });
    // eslint-disable-next-line no-console
    console.log('list transactions', listTransactions);

    /* Will fail if there is no transaction data in the time period */
    const getTransaction = await t.getTransaction({
      id: listTransactions.data[0].id,
    });
    // eslint-disable-next-line no-console
    console.log('get transaction', getTransaction);
    process.exit(0);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    process.exit(1);
  }
})();
