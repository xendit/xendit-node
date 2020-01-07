const x = require('../xendit');

const { Disbursement } = x;
const d = new Disbursement({});

d.getBanks()
  .then(r => {
    console.log('available banks:', r); // eslint-disable-line no-console
    return r;
  })
  .then(r =>
    r.slice(0, 5).map(b => ({
      externalID: `${b.name} - ${b.code}`,
      bankCode: b.code,
      accountHolderName: 'Stan',
      accountNumber: '1234567890',
      description: `purchase paid from ${b.name}`,
      amount: 10000,
    })),
  )
  .then(disbursements => d.createBatch({ reference: '111', disbursements }))
  .then(r => {
    console.log('batch created:', r); // eslint-disable-line no-console
    return d.getBanks();
  })
  .then(b =>
    d.create({
      externalID: `${b[0].name} - ${b[0].code} single disbursement`,
      bankCode: b[0].code,
      accountHolderName: 'Stan',
      accountNumber: '1234567890',
      description: `purchase paid from ${b[0].name}`,
      amount: 10000,
    }),
  )
  .then(r => {
    console.log('disbursement created:', r); // eslint-disable-line no-console
    return r;
  })
  .then(r => d.getByID({ disbursementID: r.id }))
  .then(r => {
    // eslint-disable-next-line no-console
    console.log('disbursement retrieved from ID:', r);
    return r;
  })
  .then(r => d.getByExtID({ externalID: r.external_id }))
  .then(r => {
    // eslint-disable-next-line no-console
    console.log('disbursement retrieved from extID:', r);
    return r;
  })
  .catch(e => {
    console.error(e); // eslint-disable-line no-console
    process.exit(1);
  });
