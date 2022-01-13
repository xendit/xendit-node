const x = require('../xendit');

const { Report } = x;
const r = new Report({});

function sleepFor(sleepDuration) {
  var now = new Date().getTime();
  while (new Date().getTime() < now + sleepDuration) {
    /* Do nothing */
  }
}

r.generateReport({
  type: 'BALANCE_HISTORY',
  filterDateFrom: new Date(new Date().getTime() - 24 * 60 * 60 * 1000), // Yesterday's Date
  filterDateTo: new Date(),
  format: 'CSV',
  currency: 'IDR',
})
  .then(r => {
    // eslint-disable-next-line no-console
    console.log('generate report:', r);
    return r;
  })
  .then(r => {
    sleepFor(1000);
    return r;
  })
  .then(({ id }) => r.getReport({ id }))
  .then(r => {
    // eslint-disable-next-line no-console
    console.log('get report', r);
    return r;
  })
  .catch(e => {
    console.error(e); // eslint-disable-line no-console
    process.exit(1);
  });
