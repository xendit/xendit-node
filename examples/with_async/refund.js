const x = require('../xendit');

const { Refund } = x;
const r = new Refund({});

(async function() {
  try {
    let refund = await r.createRefund({
      invoice_id: '63676ed0eb10cf38ce0550b7',
      reason: 'OTHERS',
      amount: 1,
    });
    console.log('created refund', refund); // eslint-disable-line no-console

    const refundDetails = await r.getRefundById({ id: refund.id });
    // eslint-disable-next-line no-console
    console.log('retrieved refund', refundDetails);

    const refundList = await r.listRefunds({});
    // eslint-disable-next-line no-console
    console.log('list of refunds', refundList);

    process.exit(0);
  } catch (e) {
    console.error(e); // eslint-disable-line no-console
    process.exit(1);
  }
})();
