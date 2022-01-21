const x = require('../xendit');

const { Report } = x;
const r = new Report({});

function sleepFor(sleepDuration) {
  var now = new Date().getTime();
  while (new Date().getTime() < now + sleepDuration) {
    /* Do nothing */
  }
}

(async function() {
  try {
    const genReport = await r.generateReport({
      type: 'BALANCE_HISTORY',
      // yesterday's date
      filterDateFrom: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
      filterDateTo: new Date(),
      format: 'CSV',
      currency: 'IDR',
    });
    // eslint-disable-next-line no-console
    console.log('generate report:', genReport);

    sleepFor(3000);

    const getReport = await r.getReport({
      id: genReport.id,
    });
    // eslint-disable-next-line no-console
    console.log('get report', getReport);
    process.exit(0);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    process.exit(1);
  }
})();
