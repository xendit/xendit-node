const x = require('../xendit');

const RegionalRetailOutlet = x.RegionalRetailOutlet;
const ro = new RegionalRetailOutlet({});

(async function() {
  try {
    const pmCode = await ro.createPaymentCode({
      referenceId: 'test_dharma_61',
      channelCode: 'CEBUANA',
      customerName: 'Dharma',
      amount: 50,
      currency: 'PHP',
      market: 'PH',
    });
    // eslint-disable-next-line no-console
    console.log('fixed payment code created:', pmCode);

    const { id } = pmCode;
    const retrievedPmCode = await ro.getPaymentCode({ id });
    // eslint-disable-next-line no-console
    console.log('fixed payment code details:', retrievedPmCode);

    const updatedPmCode = await ro.updatePaymentCode({
      id,
      customerName: 'DharmaLain',
    });
    // eslint-disable-next-line no-console
    console.log('updated payment code details:', updatedPmCode);

    process.exit(0);
  } catch (e) {
    console.error(e); // eslint-disable-line no-console
    process.exit(1);
  }
})();
