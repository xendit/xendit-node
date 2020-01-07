const x = require('../xendit');

const { Disbursement } = x;
const d = new Disbursement({});

(async function() {
  try {
    const banks = await d.getBanks();
    console.log('available banks:', banks); // eslint-disable-line no-console

    const disbursements = banks.slice(0, 5).map(b => ({
      externalID: `${b.name} - ${b.code}`,
      bankCode: b.code,
      accountHolderName: 'Stan',
      accountNumber: '1234567890',
      description: `purchase paid from ${b.name}`,
      amount: 10000,
    }));
    const batch = await d.createBatch({ reference: '111', disbursements });
    console.log('batch created:', batch); // eslint-disable-line no-console

    let disb = await d.create({
      externalID: `${banks[0].name} - ${banks[0].code} single disbursement`,
      bankCode: banks[0].code,
      accountHolderName: 'Stan',
      accountNumber: '1234567890',
      description: `purchase paid from ${banks[0].name}`,
      amount: 10000,
    });
    // eslint-disable-next-line no-console
    console.log('disbursement created:', disb);

    disb = await d.getByID({ disbursementID: disb.id });
    // eslint-disable-next-line no-console
    console.log('disbursement retrieved from ID:', disb);

    disb = await d.getByExtID({ externalID: disb.external_id });
    // eslint-disable-next-line no-console
    console.log('disbursement retrieved from extID:', disb);

    process.exit(0);
  } catch (e) {
    console.error(e); // eslint-disable-line no-console
    process.exit(1);
  }
})();
