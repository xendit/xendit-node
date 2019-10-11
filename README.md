# Xendit API Node.js Client

This library is the abstraction of Xendit API for access from applications written with server-side Javascript.

**Note**: This library is only meant for usage from server-side with Xendit secret API key.
For PCI compliance to be maintained, tokenization of credt cards info should be done on client side with [Xendit.js](https://docs.xendit.co/en/cards-tokenization.html/).

### API Documentation

Please check [Xendit Docs](https://docs.xendit.co/en/index.html)

### Installation

```bash
npm install --save xendit-node
```

### Usage

For the full documentation, please refer to [Xendit Node Client Docs](https://docs.xendit.co/en/libraries/xendit-node)

Configure package with your account's API keys

```js
const Xendit = require('xendit-node');
const x = new Xendit({
  publicKey: 'xnd_public...',
  secretKey: 'xnd_...',
});
```

##### Card Services

Instanitiate Card service using constructor that has been injected with Xendit keys

```js
const { Card } = x;
const cardSpecificOptions = {};
const card = new Card(cardSpecificOptions);
```

Example: Capturing a charge

```js
card
  .captureCharge({
    chargeID: 'charge-id-from-create-charge-endpoint',
    externalID: 'your-system-tracking-id',
  })
  .then(({ id }) => {
    console.log(`Charge created with ID: ${id}`);
  })
  .catch(e => {
    console.error(`Charge creation failed with message: ${e.message}`);
  });
```

### Contributing

Running test suite

```bash
npm install
npm run test
```

Running examples

```bash
cp .env.sample .env # then fill in required environment variables
node examples/card.js # or whichever example you would like to run
```

There are a commit hook to run linting and formatting and push hook to run all tests.
Please make sure they pass before making commits/pushes.
