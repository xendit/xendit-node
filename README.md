# Xendit API Node.js Client

This library is the abstraction of Xendit API for access from applications written with server-side Javascript.

**Note**: This library is only meant for usage from server-side with Xendit secret API key.
For PCI compliance to be maintained, tokenization of credt cards info should be done on client side with [Xendit.js](https://docs.xendit.co/xenpayments/payments-credit-cards-overview/credit-cards-integration-and-testing/collecting-card-details-tokenization/index.html).

<!-- toc -->

- [API Documentation](#api-documentation)
- [Installation](#installation)
- [Usage](#usage)
  * [Card Services](#card-services)
    + [Methods](#methods)
  * [Virtual Account Services](#virtual-account-services)
    + [Methods](#methods-1)
  * [Disbursement Services](#disbursement-services)
    + [Methods](#methods-2)
  * [Invoice Services](#invoice-services)
    + [Methods](#methods-3)
- [Contributing](#contributing)

<!-- tocstop -->

## API Documentation

Please check [Xendit Docs](https://docs.xendit.co/en/index.html)

## Installation

```bash
npm install --save xendit-node
```

## Usage

For the full documentation, please refer to [Xendit Node Client Docs](https://docs.xendit.co/en/libraries/xendit-node)

Configure package with your account's API keys

```js
const Xendit = require('xendit-node');
const x = new Xendit({
  publicKey: 'xnd_public...',
  secretKey: 'xnd_...',
});
```

### Card Services

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

#### Methods

- Create token

```ts
card.createToken(data: {
  cardNumber: string;
  expMonth: string;
  expYear: string;
  cardCVN: string;
  isSingleUse: boolean;
  amount?: number;
  shouldAuthenticate?: boolean;
})
```

- Create charge

```ts
card.createCharge(data: {
  tokenID: string;
  externalID: string;
  amount?: number;
  authID?: string;
  cardCVN?: string;
  capture?: boolean;
  descriptor?: string;
})
```

- Capture charge

```ts
card.captureCharge(data: {
  chargeID: string;
  amount: number;
})
```

- Get charge

```ts
card.getCharge(data: { chargeID: string })
```

- Create Authentication

```ts
card.createAuthetication(data: {
  amount: number;
  tokenID: string;
})
```

- Create authorization

```ts
card.createAuthorization(data: {
  tokenID: string;
  externalID: string;
  amount?: number;
  authID?: string;
  cardCVN?: string;
  descriptor?: string;
})
```

- Reverse authorization

```ts
card.reverseAuthorization(data: {
  chargeID: string;
  externalID: string;
})
```

- Create refund

```ts
card.createRefund(data: {
  chargeID: string;
  amount: number;
  externalID: string;
  xIdempotencyKey?: string;
})
```

### Virtual Account Services

Instanitiate VA service using constructor that has been injected with Xendit keys

```js
const { VirtualAcc } = x;
const vaSpecificOptions = {};
const va = new VirtualAcc(vaSpecificOptions);
```

Example: Create a fixed virtual account

```js
va.createFixedVA({
  externalID: 'your-external-id',
  bankCode: 'BCA',
  name: 'Stanley Nguyen',
})
  .then(({ id }) => {
    console.log(`Fixed VA created with ID: ${id}`);
  })
  .catch(e => {
    console.error(`VA creation failed with message: ${e.message}`);
  });
```

#### Methods

- Get banks with available virtual account service

```ts
va.getVABanks();
```

- Create a fixed virtual account

```ts
va.createFixedVA(data: {
  externalID: string;
  bankCode: string;
  name: string;
  virtualAccNumber?: string;
  suggestedAmt?: number;
  isClosed?: boolean;
  expectedAmt?: number;
  expirationDate?: Date;
  isSingleUse?: boolean;
  description?: string;
})
```

- Get details of your fixed virtual account

```ts
va.getFixedVA(data: { id: string })
```

- Update details of your fixed virtual account

```ts
va.updateFixedVA(data: {
  id: string;
  suggestedAmt?: number;
  expectedAmt?: number;
  expirationDate?: Date;
  isSingleUse?: boolean;
  description?: string;
})
```

- Get details of a VA payment

```ts
va.getVAPayment(data: { paymentID: string })
```

`paymentID`: ID of the payment that you obtained from your callback

### Disbursement Services

Instanitiate Disbursement service using constructor that has been injected with Xendit keys

```js
const { Disbursement } = x;
const disbursementSpecificOptions = {};
const d = new Disbursement(disbursementSpecificOptions);
```

Example: Create a disbursement

```js
d.create({
  externalID: 'your-external-tracking-ID',
  bankCode: 'BCA',
  accountHolderName: 'Stan',
  accountNumber: '1234567890',
  description: 'Payment for nasi padang',
  amount: 10000,
})
  .then(({ id }) => {
    console.log(`Disbursement created with ID: ${id}`);
  })
  .catch(e => {
    console.error(`Disbursement creation failed with message: ${e.message}`);
  });
```

#### Methods

- Get banks with available disbursement service

```ts
d.getBanks();
```

- Create a disbursement

```ts
d.create(data: {
  externalID: string;
  bankCode: string;
  accountHolderName: string;
  accountNumber: string;
  description: string;
  amount: number;
  emailTo?: string[];
  emailCC?: string[];
  emailBCC?: string[];
  xIdempotencyKey?: string;
})
```

- Create a batch of disbursements

```ts
d.createBatch(data: {
  reference: string;
  disbursements: Array<{
    externalID: string;
    bankCode: string;
    accountHolderName: string;
    accountNumber: string;
    description: string;
    amount: number;
    emailTo?: string[];
    emailCC?: string[];
    emailBCC?: string[];
  }>;
  xIdempotencyKey?: string;
})
```

- Get a disbursement by ID

```ts
d.getByID(data: { disbursementID: string })
```

- Get a disbursement by external ID

```ts
d.getByExtID(data: { externalID: string })
```

### Invoice Services

Instanitiate Invoice service using constructor that has been injected with Xendit keys

```js
const { Invoice } = x;
const invoiceSpecificOptions = {};
const i = new Invoice(invoiceSpecificOptions);
```

Example: Create an invoice

```js
i.createInvoice({
  externalID: 'your-external-id',
  payerEmail: 'stanley@xendit.co',
  description: 'Invoice for Shoes Purchase',
  amount: 100000,
}).then(({ id }) => {
  console.log(`Invoice created with ID: ${id}`);
});
```

#### Methods

- Create an invoice

```ts
i.createInvoice(data: {
    externalID: string;
    payerEmail: string;
    description: string;
    amount: number;
    shouldSendEmail?: boolean;
    callbackVirtualAccountID?: string;
    invoiceDuration?: number;
    successRedirectURL?: string;
    failureRedirectURL?: string;
    paymentMethods?: string[];
    currency?: string;
    midLabel?: string;
  })
```

- Get an invoice

```ts
i.getInvoice(data: { invoiceID: string })
```

- Expire an invoice

```ts
i.expireInvoice(data: { invoiceID: string })
```

- Get all invoices

```ts
i.getAllInvoices(data?: {
    statuses?: string[];
    limit?: number;
    createdAfter?: Date;
    createdBefore?: Date;
    paidAfter?: Date;
    paidBefore?: Date;
    expiredAfter?: Date;
    expiredBefore?: Date;
    lastInvoiceID?: string;
    clientTypes?: string[];
    paymentChannels?: string[];
    onDemandLink?: string;
    recurringPaymentID?: string;
  })
```

## Contributing

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
