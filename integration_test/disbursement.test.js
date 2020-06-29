const x = require('./xendit.test');

const { Disbursement } = x;
const d = new Disbursement({});

module.exports = function() {
  return d
    .getBanks()
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
    .then(() => d.getBanks())
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
    .then(r => d.getByID({ disbursementID: r.id }))
    .then(r => d.getByExtID({ externalID: r.external_id }))
    .then(() => {
      // eslint-disable-next-line no-console
      console.log('Disbursement integration test done...');
    })
    .catch(e => {
      throw new Error(
        `Disbursement integration tests failed with error: ${e.message}`,
      );
    });
};
