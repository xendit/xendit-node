const x = require('./xendit.test');

const { Transaction } = x;
const t = new Transaction({});

module.exports = function() {
  return t
    .listTransactions({
      types: ['DISBURSEMENT', 'PAYMENT'],
      statuses: ['PENDING', 'SUCCESS'],
      channelCategories: ['BANK'],
      createdDateFrom: new Date('2022-01-01T00:00:00.000Z'),
      createdDateTo: new Date('2022-02-01T00:00:00.000Z'),
    })
    .then(res => {
      t.getTransaction({ id: res.data[0].id });
    })
    .then(() => {
      // eslint-disable-next-line no-console
      console.log('Transaction integration test done...');
    })
    .catch(e => {
      throw new Error(
        `Transaction integration tests failed with error: ${e.message}`,
      );
    });
};
