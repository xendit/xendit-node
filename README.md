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
  * [Recurring Payments Services](#recurring-payments-services)
    + [Methods](#methods-4)
  * [Payout Services](#payout-services)
    + [Methods](#methods-5)
  * [EWallet Services](#ewallet-services)
    + [Methods](#methods-6)
  * [Balance Services](#balance-services)
    + [Methods](#methods-7)
  * [Retail Outlet Services](#retail-outlet-services)
    + [Methods](#methods-8)
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
  secretKey: 'xnd_...',
});
```

Usage examples:

- With promises, please check [here](./examples/with_promises)
- With async/await, please check [here](./examples/with_async)

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

### Recurring Payments Services

Instanitiate Recurring Payments service using constructor that has been injected with Xendit keys

```js
const { RecurringPayment } = x;
const rpSpecificOptions = {};
const rp = new RecurringPayment(rpSpecificOptions);
```

Example: Create a recurring payment

```js
rp.createPayment({
  externalID: '123',
  payerEmail: 'stanley@xendit.co',
  description: 'Payment for something',
  amount: 10000,
  interval: RecurringPayment.Interval.Month,
  intervalCount: 1,
})
  .then(({ id }) => {
    console.log(`Recurring payment created with ID: ${id}`);
  })
  .catch(e => {
    console.error(
      `Recurring payment creation failed with message: ${e.message}`,
    );
  });
```

#### Methods

- Create recurring payment

```ts
rp.createPayment(data: {
  externalID: string;
  payerEmail: string;
  description: string;
  amount: number;
  interval: Interval;
  intervalCount: number;
  totalRecurrence?: number;
  invoiceDuration?: number;
  shouldSendEmail?: boolean;
  missedPaymentAction?: Action;
  creditCardToken?: string;
  startDate?: Date;
  successRedirectURL?: string;
  failureRedirectURL?: string;
  recharge?: boolean;
  chargeImmediately?: boolean;
})
```

- Get recurring payment

```ts
rp.getPayment(data: { id: string })
```

- Edit recurring payment

```ts
rp.editPayment(data: {
  id: string;
  amount?: number;
  creditCardToken?: string;
  interval?: Interval;
  intervalCount?: number;
  shouldSendEmail?: boolean;
  invoiceDuration?: number;
  missedPaymentAction?: Action;
})
```

- Stop recurring payment

```ts
rp.stopPayment(data: { id: string })
```

- Pause recurring payment

```ts
rp.pausePayment(data: { id: string })
```

- Resume recurring payment

```ts
rp.resumePayment(data: { id: string })
```

### Payout Services

Instanitiate Payout service using constructor that has been injected with Xendit keys

```js
const { Payout } = x;
const payoutSpecificOptions = {};
const p = new Payout(payoutSpecificOptions);
```

Example: Create a payout

```js
p.createPayout({
  externalID: 'your-external-id',
  amount: 100000,
}).then(({ id }) => {
  console.log(`Invoice created with ID: ${id}`);
});
```

#### Methods

- Create a payout

```ts
p.createPayout(data: { externalID: string; amount: string })
```

- Get a payout

```ts
p.getPayout(data: { id: string })
```

- Void a payout

```ts
p.voidPayout(data: { id: string })
```

### EWallet Services

Instanitiate EWallet service using constructor that has been injected with Xendit keys

```js
const { EWallet } = x;
const ewalletSpecificOptions = {};
const ew = new EWallet(ewalletSpecificOptions);
```

Example: Create an ewallet payment

```js
ew.createPayment({
  externalID: 'my-ovo-payment',
  amount: 1,
  phone: '081234567890',
  ewalletType: EWallet.Type.OVO,
}).then(r => {
  console.log('create ewallet payment detail:', r);
  return r;
});
```

#### Methods

- Create an ewallet payment

```ts
ew.createPayment(data: {
  externalID: string;
  amount: number;
  phone?: string;
  expirationDate?: Date;
  callbackURL?: string;
  redirectURL?: string;
  items?: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  ewalletType: CreateSupportWalletTypes;
})
```

- Get an ewallet Payment Status

```ts
ew.getPayment(data: {
  externalID: string:
  ewalletType: GetSupportWalletTypes;
})
```

### Balance Services

Instanitiate Balance service using constructor that has been injected with Xendit keys

```js
const { Balance } = x;
const balanceSpecificOptions = {};
const i = new Balance(balanceSpecificOptions);
```

Example: Get balance of holding account

```js
b.getBalance({
  accountType: Balance.AccountType.Holding,
}).then(({ balance }) => {
  console.log('Holding balance amount:', balance);
});
```

#### Methods

- Get balance

```ts
b.getBalance(data: { accountType: AccountType })
```

### Retail Outlet Services

Instanitiate Retail outlet service using constructor that has been injected with Xendit keys

```js
const { RetailOutlet } = x;
const retailOutletSpecificOptions = {};
const ro = new RetailOutlet(retailOutletSpecificOptions);
```

Example: Example: Create a fixed payment code

```js
ro.createFixedPaymentCode({
  externalID: '123',
  retailOutletName: 'ALFAMART',
  name: 'Ervan Adetya',
  expectedAmt: 10000,
}).then(({ id }) => {
  console.log(`Fixed Payment Code created with ID: ${id}`);
});
```

#### Methods

- Create fixed payment code

```ts
ro.createFixedPaymentCode(data: {
  externalID: string;
  retailOutletName: string;
  name: string;
  expectedAmt: number;
  paymentCode?: string;
  expirationDate?: Date;
  isSingleUse?: boolean;
})
```

- Get fixed payment code

```ts
ro.getFixedPaymentCode(data: { id: string })
```

- Update fixed payment code

```ts
ro.updateFixedPaymentCode(data: {
  id: string
  name?: string;
  expectedAmt?: number;
  expirationDate?: Date;
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
