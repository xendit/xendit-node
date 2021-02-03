const x = require('../xendit');

const { QrCode } = x;
const q = new QrCode({});

(async function() {
  try {
    let qrcode = await q.createCode({
      externalID: Date.now().toString(),
      type: QrCode.Type.Dynamic,
      callbackURL: 'https://httpstat.us/200',
      amount: 10000,
    });
    console.log('created QR code', qrcode); // eslint-disable-line no-console

    qrcode = await q.getCode({ externalID: qrcode.external_id });
    console.log('retrieved QR code', qrcode); // eslint-disable-line no-console

    const payment = await q.simulate({ externalID: qrcode.external_id });
    console.log('simulated payment', payment); // eslint-disable-line no-console

    let payments = await q.getPayments({
      externalID: qrcode.external_id,
      from: '2021-01-04T08:09:30.000Z',
      to: new Date().toISOString(),
      limit: 10,
    });
    // eslint-disable-next-line no-console
    console.log('retrieved payments', payments);
  } catch (e) {
    console.error(e); // eslint-disable-line no-console
    process.exit(1);
  }
})();
