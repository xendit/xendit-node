const x = require('./xendit.test');

const { Report } = x;
const r = new Report({});

function sleepFor(sleepDuration) {
  var now = new Date().getTime();
  while (new Date().getTime() < now + sleepDuration) {
    /* Do nothing */
  }
}

module.exports = function() {
  return r
    .generateReport({
      type: 'BALANCE_HISTORY',
      filterDateFrom: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
      filterDateTo: new Date(),
      format: 'CSV',
      currency: 'IDR',
    })
    .then(res => {
      sleepFor(3000);
      return res;
    })
    .then(res => {
      r.getReport({ id: res.id });
    })
    .then(() => {
      // eslint-disable-next-line no-console
      console.log('Report integration test done...');
    })
    .catch(e => {
      throw new Error(
        `Report integration tests failed with error: ${e.message}`,
      );
    });
};
