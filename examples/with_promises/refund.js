const x = require('../xendit');

const Refund = x.Refund;
const ref = new Refund();

ref
  .createRefund({
    invoice_id: '63676ed0eb10cf38ce0550b7',
    reason: 'OTHERS',
    amount: 1,
  })
  .then(r => {
    // eslint-disable-next-line no-console
    console.log('refund created:', r);
    return r;
  })
  .then(({ id }) => ref.getRefundById({ id }))
  .then(r => {
    // eslint-disable-next-line no-console
    console.log('refund details:', r);
    return r;
  })
  .then(() => {
    return ref.listRefunds({});
  })
  .then(r => {
    // eslint-disable-next-line no-console
    console.log(':', r);
    return r;
  })
  .catch(e => {
    console.error(e); // eslint-disable-line no-console
    process.exit(1);
  });
