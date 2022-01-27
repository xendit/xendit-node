const x = require('../xendit');

const { Transaction } = x;
const t = new Transaction({});

(async function() {
  try {
    const listTransactions = await t.listTransactions({
      types: ['disbursement', 'payment'],
      statuses: ['pending', 'success'],
      channelCategories: ['bank'],
      createdDateFrom: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000),
      createdDateTo: new Date(),
    });
    // eslint-disable-next-line no-console
    console.log('list transactions', listTransactions);
    // // eslint-disable-next-line no-console
    // console.log('generate report:', genReport);

    // sleepFor(3000);

    // const getReport = await r.getReport({
    //   id: genReport.id,
    // });
    // // eslint-disable-next-line no-console
    // console.log('get report', getReport);
    process.exit(0);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    process.exit(1);
  }
})();
