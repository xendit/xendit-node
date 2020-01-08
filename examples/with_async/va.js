const x = require('../xendit');

const VirtualAcc = x.VirtualAcc;
const va = new VirtualAcc({});

(async function() {
  try {
    const banks = await va.getVABanks();
    console.log('available va banks:', banks); // eslint-disable-line no-console

    const fixedAcc = await va.createFixedVA({
      externalID: '123',
      bankCode: banks[0].code,
      name: 'Stanley Nguyen',
    });
    // eslint-disable-next-line no-console
    console.log('fixed va created:', fixedAcc);

    const { id } = fixedAcc;
    const retrievedAcc = await va.getFixedVA({ id });
    // eslint-disable-next-line no-console
    console.log('fixed va details:', retrievedAcc);

    const updatedAcc = await va.updateFixedVA({
      id,
      suggestedAmt: 20,
      expectedAmt: 30,
    });
    // eslint-disable-next-line no-console
    console.log('updated va details:', updatedAcc);

    process.exit(0);
  } catch (e) {
    console.error(e); // eslint-disable-line no-console
    process.exit(1);
  }
})();
