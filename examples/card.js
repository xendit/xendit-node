// For actual usage, this should be require('xendit')
const Xendit = require('../src/xendit');
const dotenv = require('dotenv');
const readline = require('readline');

dotenv.config();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

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
    isSingleUse: false,
    shouldAuthenticate: false,
  })
  .then(({ id }) => {
    return Promise.all([
      card.createAuthentication({
        tokenID: id,
        amount: 10000,
      }),
      { tokenID: id },
    ]);
  })
  .then(([{ id, status, payer_authentication_url }, { tokenID }]) => {
    if (status === Card.Status.VERIFIED) {
      resolve({ authID: id, tokenID });
    } else if (status === Card.Status.IN_REVIEW) {
      return new Promise(resolve => {
        rl.question(
          `Please go to this URL ${payer_authentication_url} to authenticate. Once done, press enter to continue to create charge`, // eslint-disable-line max-len
          () => resolve({ authID: id, tokenID }),
        );
      });
    }
  })
  .then(({ authID, tokenID }) =>
    card.createCharge({
      tokenID,
      authID,
      amount: 10000,
      externalID: Date.now().toString(), // use your system's ID of the transaction
      capture: false,
    }),
  )
  .then(({ id }) =>
    card.captureCharge({
      chargeID: id,
      amount: 10000,
    }),
  )
  .then(({ id, external_id }) =>
    card.createRefund({ chargeID: id, externalID: external_id, amount: 5000 }),
  )
  .then(res => {
    console.log(res); // eslint-disable-line no-console
    process.exit(0);
  })
  .catch(e => {
    console.error(e); // eslint-disable-line no-console
    process.exit(1);
  });
