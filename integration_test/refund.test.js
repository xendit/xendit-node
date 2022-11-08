const x = require('./xendit.test');

const { Refund } = x;
const r = new Refund({});

module.exports = function() {
  return r
    .createRefund({
      invoice_id: '63676ed0eb10cf38ce0550b7',
      reason: 'FRAUDULENT',
      amount: 1,
    })
    .then(id => {
      r.getRefundById({ id });
    })
    .then(() => {
      r.listRefunds({});
    })
    .then(() => {
      // eslint-disable-next-line no-console
      console.log('QR Code integration test done...');
    })
    .catch(e => {
      throw new Error(
        `Recurring integration tests failed with error: ${e.message}`,
      );
    });
};
