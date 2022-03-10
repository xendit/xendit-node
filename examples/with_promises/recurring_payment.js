const x = require('../xendit');

const RecurringPayment = x.RecurringPayment;
const rp = new RecurringPayment({});

rp.createPayment({
  externalID: '123',
  payerEmail: 'stanley@xendit.co',
  description: 'Payment for something',
  amount: 10000,
  interval: RecurringPayment.Interval.Month,
  intervalCount: 1,
})
  .then(r => {
    // eslint-disable-next-line no-console
    console.log('recurring payment created:', r);
    return r;
  })
  .then(({ id }) => rp.getPayment({ id }))
  .then(r => {
    // eslint-disable-next-line no-console
    console.log('recurring payment details:', r);
    return r;
  })
  .then(({ id }) => rp.editPayment({ id, amount: 20000 }))
  .then(r => {
    // eslint-disable-next-line no-console
    console.log('recurring payment updated:', r.id);
    return r;
  })
  .then(({ id }) => rp.pausePayment({ id }))
  .then(r => {
    // eslint-disable-next-line no-console
    console.log('recurring payment paused:', r.id);
    return r;
  })
  .then(({ id }) => rp.resumePayment({ id }))
  .then(r => {
    // eslint-disable-next-line no-console
    console.log('recurring payment resumed:', r.id);
    return r;
  })
  .then(({ id }) => rp.stopPayment({ id }))
  .then(r => {
    // eslint-disable-next-line no-console
    console.log('recurring payment stopped:', r.id);
    return r;
  })
  .catch(e => {
    console.error(e); // eslint-disable-line no-console
    process.exit(1);
  });
