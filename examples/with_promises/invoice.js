const x = require('../xendit');

const { Invoice } = x;
const i = new Invoice({});

i.createInvoice({
  externalID: Date.now().toString(),
  payerEmail: 'example@gmail.com',
  description: 'Invoice for Shoes Purchase',
  amount: 100000,
})
  .then(r => {
    console.log('created invoice', r); // eslint-disable-line no-console
    return r;
  })
  .then(r => i.getInvoice({ invoiceID: r.id }))
  .then(r => {
    console.log('retrieved invoice', r); // eslint-disable-line no-console
    return r;
  })
  .then(r => i.expireInvoice({ invoiceID: r.id }))
  .then(r => {
    console.log('expired invoice', r); // eslint-disable-line no-console
    return r;
  })
  .then(() => i.getAllInvoices())
  .then(r => {
    console.log('first 10 invoices', r); // eslint-disable-line no-console
    return r;
  })
  .catch(e => {
    console.error(e); // eslint-disable-line no-console
    process.exit(1);
  });
