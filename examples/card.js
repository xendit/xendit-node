// For actual usage, this should be require('xendit')
const Xendit = require('../src/xendit');
const dotenv = require('dotenv');

dotenv.config();

const x = new Xendit({
  publicKey: process.env.PUBLIC_KEY,
  secretKey: process.env.SECRET_KEY,
  xenditURL: process.env.XENDIT_URL,
});
const Card = x.Card;
const card = new Card({});

card
  .createToken({
    cardNumber: '4000000000000002',
    expMonth: '12',
    expYear: '2020',
    cardCVN: '123',
    isSingleUse: true,
    amount: 10000,
  })
  .then(console.log) // eslint-disable-line no-console
  .catch(console.error); // eslint-disable-line no-console
