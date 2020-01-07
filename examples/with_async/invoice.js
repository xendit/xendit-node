const x = require('../xendit');

const { Invoice } = x;
const i = new Invoice({});

(async function() {
  try {
    let invoice = await i.createInvoice({
      externalID: Date.now().toString(),
      payerEmail: 'example@gmail.com',
      description: 'Invoice for Shoes Purchase',
      amount: 100000,
    });
    console.log('created invoice', invoice); // eslint-disable-line no-console

    const retrievedInvoice = await i.getInvoice({ invoiceID: invoice.id });
    // eslint-disable-next-line no-console
    console.log('retrieved invoice', retrievedInvoice);

    const expiredInvoice = await i.expireInvoice({
      invoiceID: retrievedInvoice.id,
    });
    // eslint-disable-next-line no-console
    console.log('expired invoice', expiredInvoice);

    const invoices = await i.getAllInvoices();
    // eslint-disable-next-line no-console
    console.log('first 10 invoices', invoices);

    process.exit(0);
  } catch (e) {
    console.error(e); // eslint-disable-line no-console
    process.exit(1);
  }
})();
