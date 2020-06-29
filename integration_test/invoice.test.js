const x = require('./xendit.test');

const { Invoice } = x;
const i = new Invoice({});

module.exports = function() {
  return i
    .createInvoice({
      externalID: Date.now().toString(),
      payerEmail: 'example@gmail.com',
      description: 'Invoice for Shoes Purchase',
      amount: 100000,
    })
    .then(r => i.getInvoice({ invoiceID: r.id }))
    .then(r => i.expireInvoice({ invoiceID: r.id }))
    .then(() => i.getAllInvoices())
    .then(() => {
      // eslint-disable-next-line no-console
      console.log('Invoice integration test done...');
    })
    .catch(e => {
      throw new Error(
        `Invoice integration tests failed with error: ${e.message}`,
      );
    });
};
