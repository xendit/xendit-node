const x = require('../xendit');

const { Transaction } = x;
const t = new Transaction({});

t.listTransactions({
  types: ['DISBURSEMENT', 'PAYMENT'],
  statuses: ['PENDING', 'SUCCESS'],
  channelCategories: ['BANK'],
  createdDateFrom: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000),
  createdDateTo: new Date(),
})
  .then(res => {
    // eslint-disable-next-line no-console
    console.log('list transactions:', res);
    return res;
  })
  // will fail if there are no transactions in this time period
  .then(res => t.getTransaction({ id: res.data[0].id }))
  .then(res => {
    // eslint-disable-next-line no-console
    console.log('get transaction', res);
    return res;
  })
  .catch(e => {
    console.error(e); // eslint-disable-line no-console
    process.exit(1);
  });
