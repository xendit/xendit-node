# Xendit API Node.js Client

![Code Linting Badge](https://github.com/xendit/xendit-node/workflows/Code%20Linting/badge.svg)
![Integration Tests Badge](https://github.com/xendit/xendit-node/workflows/Integration%20Tests/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/xendit/xendit-node/badge.svg)](https://coveralls.io/github/xendit/xendit-node)

This library is the abstraction of Xendit API for access from applications written with server-side Javascript.

[![NPM](https://nodei.co/npm/xendit-node.png)](https://nodei.co/npm/xendit-node/)

**Note**: This library is only meant for usage from server-side with Xendit secret API key.
For PCI compliance to be maintained, tokenization of credit cards info should be done on client side with [Xendit.js](https://docs.xendit.co/credit-cards/integrations/tokenization).

<!-- toc -->

- [API Documentation](#api-documentation)
- [Installation](#installation)
- [Usage](#usage)
  - [Card Services](#card-services)
    - [Create charge](#create-charge)
    - [Capture charge](#capture-charge)
    - [Get charge](#get-charge)
    - [Create authorization](#create-authorization)
    - [Reverse authorization](#reverse-authorization)
    - [Create refund](#create-refund)
    - [Create promotion](#create-promotion)
  - [Virtual Account Services](#virtual-account-services)
    - [Get banks with available virtual account service](#get-banks-with-available-virtual-account-service)
    - [Create a fixed virtual account](#create-a-fixed-virtual-account)
    - [Get details of your fixed virtual account](#get-details-of-your-fixed-virtual-account)
    - [Update details of your fixed virtual account](#update-details-of-your-fixed-virtual-account)
    - [Get details of a VA payment](#get-details-of-a-va-payment)
  - [Disbursement Services](#disbursement-services)
    - [Get banks with available disbursement service](#get-banks-with-available-disbursement-service)
    - [Create a disbursement](#create-a-disbursement)
    - [Create a batch of disbursements](#create-a-batch-of-disbursements)
    - [Get a disbursement by ID](#get-a-disbursement-by-id)
  - [Invoice Services](#invoice-services)
    - [Create an invoice](#create-an-invoice)
    - [Get an invoice](#get-an-invoice)
    - [Expire an invoice](#expire-an-invoice)
    - [Get all invoices](#get-all-invoices)
  - [Recurring Payments Services](#recurring-payments-services)
    - [Create recurring payment](#create-recurring-payment)
    - [Get recurring payment](#get-recurring-payment)
    - [Edit recurring payment](#edit-recurring-payment)
    - [Stop recurring payment](#stop-recurring-payment)
    - [Pause recurring payment](#pause-recurring-payment)
    - [Resume recurring payment](#resume-recurring-payment)
  - [Recurring Services](#recurring-services)
    - [Create recurring schedule](#create-recurring-schedule)
    - [Edit recurring schedule](#edit-recurring-schedule)
    - [Get recurring schedule](#get-recurring-schedule)
    - [Create recurring plan](#create-recurring-plan)
    - [Create recurring plan with schedule](#create-recurring-plan-with-schedule)
    - [Edit recurring plan](#edit-recurring-plan)
    - [Get recurring plan](#get-recurring-plan)
    - [Deactivate recurring plan](#deactivate-recurring-plan)
    - [Edit recurring cycle](#edit-recurring-cycle)
    - [Get recurring cycle](#get-recurring-cycle)
    - [Get all recurring cycles](#get-all-recurring-cycles)
    - [Cancel recurring cycle](#cancel-recurring-cycle)
  - [Payout Services](#payout-services)
    - [Create a payout](#create-a-payout)
    - [Get a payout](#get-a-payout)
    - [Void a payout](#void-a-payout)
  - [EWallet Services](#ewallet-services)
    - [Create payment](#create-payment)
    - [Get payment](#get-payment)
    - [Create an ewallet charge](#create-an-ewallet-charge)
    - [Get an ewallet charge status](#get-an-ewallet-charge-status)
    - [Void an ewallet charge](#void-an-ewallet-charge)
    - [Initialize tokenization](#initialize-tokenization)
    - [Unlink tokenization](#unlink-tokenization)
    - [Create payment method (E-Wallet)](#create-payment-method-e-wallet)
    - [Get payment methods by customer ID (E-Wallet)](#get-payment-methods-by-customer-id-e-wallet)
  - [Balance Services](#balance-services)
    - [Get balance](#get-balance)
  - [Retail Outlet Services](#retail-outlet-services)
    - [Create fixed payment code](#create-fixed-payment-code)
    - [Get fixed payment code](#get-fixed-payment-code)
    - [Get payments by fixed payment code ID](#get-payments-by-fixed-payment-code-id)
    - [Update fixed payment code](#update-fixed-payment-code)
    - [Simulate payment for RO (only in dev mode)](#simulate-payment-for-ro-only-in-dev-mode)
  - [QR Code Services](#qr-code-services)
    - [Create code](#create-code)
    - [Get code](#get-code)
    - [Simulate payment for QR (only in dev mode)](#simulate-payment-for-qr-only-in-dev-mode)
    - [Get payments by external ID](#get-payments-by-external-id)
  - [Customer services](#customer-services)
    - [Create customer](#create-customer)
    - [Get customer](#get-customer)
    - [Get customer by reference ID](#get-customer-by-reference-id)
    - [Update customer](#update-customer)
  - [Direct debit services](#direct-debit-services)
    - [Initialize linked account tokenization](#initialize-linked-account-tokenization)
    - [Validate OTP for Linked Account Token](#validate-otp-for-linked-account-token)
    - [Retrieve accessible accounts by linked account token](#retrieve-accessible-accounts-by-linked-account-token)
    - [Create payment method (Direct Debit)](#create-payment-method-direct-debit)
    - [Get payment methods by customer ID (Direct Debit)](#get-payment-methods-by-customer-id-direct-debit)
    - [Create direct debit payment](#create-direct-debit-payment)
    - [Validate OTP for direct debit payment](#validate-otp-for-direct-debit-payment)
    - [Get direct debit payment status by ID](#get-direct-debit-payment-status-by-id)
    - [Get direct debit payment status by reference ID](#get-direct-debit-payment-status-by-reference-id)
  - [Report Service](#report-service)
    - [Generate Report](#generate-report)
    - [Get Report](#get-report)
  - [Transaction Service](#transaction-service)
    - [Get Transaction](#get-transaction)
    - [List Transactions](#list-transactions)
  - [XenPlatform Service](#xenplatform-service)
    - [Create sub-account](#create-sub-account)
    - [Create sub-account using V2](#create-sub-account-using-v2)
    - [Get sub-account by ID](#get-sub-account-by-id)
    - [Update sub-account](#update-sub-account)
    - [Set Callback URL](#set-callback-url)
    - [Create transfers](#create-transfers)
    - [Create fee rules](#create-fee-rules)
  - [Payment Request](#payment-request)
    - [Create payment request](#create-payment-request)
    - [List payment requests](#list-payment-requests)
    - [Get payment request details by ID](#get-payment-request-details-by-id)
    - [confirm payment request](#confirm-payment-request)
    - [resend auth for payment request](#resend-auth-for-payment-request)
  - [Payment Method](#payment-method)
    - [Create payment method](#create-payment-method)
    - [List payment methods](#list-payment-methods)
    - [Get payment method details by ID](#get-payment-method-details-by-id)
    - [Authorize Payment method](#authorize-payment-method)
    - [Update Payment method](#update-payment-method)
    - [Expire Payment method](#expire-payment-method)
    - [List payments by payment method id](#list-payments-by-payment-method-id)
  - [Refund Services](#refund-services)
    - [Create refund](#create-refund-1)
    - [List refunds](#list-refunds)
    - [Get refund details by ID](#get-refund-details-by-id)
- [Contributing](#contributing)

<!-- tocstop -->

## API Documentation

Please check [Xendit API Reference](https://xendit.github.io/apireference/).

## Installation

```bash
npm install --save xendit-node
```

## Usage

Configure package with your account's **secret key** obtained from your [Xendit Dashboard](https://dashboard.xendit.co/settings/developers#api-keys).

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

Refer to [Xendit API Reference](https://developers.xendit.co/api-reference/#credit-cards) for more info about methods' parameters

#### Create charge

```ts
card.createCharge(data: {
  tokenID: string;
  externalID: string;
  amount?: number;
  authID?: string;
  cardCVN?: string;
  capture?: boolean;
  descriptor?: string;
  currency?: string;
  midLabel?: string;
  billingDetails?: object;
  promotion?: object;
  installment?: object;
  forUserID?: string;
  metadata?: object;
  isRecurring?: boolean;
})
```

#### Capture charge

```ts
card.captureCharge(data: {
  chargeID: string;
  amount: number;
  forUserID?: string;
})
```

#### Get charge

```ts
card.getCharge(data: { chargeID: string; forUserID?: string })
```

#### Create authorization

```ts
card.createAuthorization(data: {
  tokenID: string;
  externalID: string;
  amount?: number;
  authID?: string;
  cardCVN?: string;
  descriptor?: string;
  currency?: string;
  midLabel?: string;
  billingDetails?: object;
  promotion?: object;
  installment?: object;
  forUserID?: string;
})
```

#### Reverse authorization

```ts
card.reverseAuthorization(data: {
  chargeID: string;
  externalID: string;
  forUserID?: string;
})
```

#### Create refund

```ts
card.createRefund(data: {
  chargeID: string;
  amount: number;
  externalID: string;
  xIdempotencyKey?: string;
  forUserID?: string;
})
```

#### Create promotion

```ts
card.createPromotion(data: {
  referenceId: string;
  description: string;
  promoCode?: string;
  binList?: string[];
  channelCode?: string;
  discountPercent?: number;
  discountAmount?: number;
  currency: string;
  startTime: Date;
  endTime: Date;
  minOriginalAmount?: number;
  maxDiscountAmount?: number;
})
```

### Virtual Account Services

Instantiate VA service using constructor that has been injected with Xendit keys

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

Refer to [Xendit API Reference](https://developers.xendit.co/api-reference/#virtual-accounts) for more info about methods' parameters

#### Get banks with available virtual account service

```ts
va.getVABanks(data?: {
  forUserID?: string;
});
```

#### Create a fixed virtual account

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
  currency?: string;
  country?: string;
  alternativeDisplayTypes?: string[];
  forUserID?: string;
})
```

#### Get details of your fixed virtual account

```ts
va.getFixedVA(data: {
  id: string;
  forUserID?: string;
})
```

#### Update details of your fixed virtual account

```ts
va.updateFixedVA(data: {
  id: string;
  suggestedAmt?: number;
  expectedAmt?: number;
  expirationDate?: Date;
  isSingleUse?: boolean;
  description?: string;
  forUserID?: string;
})
```

#### Get details of a VA payment

```ts
va.getVAPayment(data: {
  paymentID: string;
  forUserID?: string;
})
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

Refer to [Xendit API Reference](https://developers.xendit.co/api-reference/#disbursements) for more info about methods' parameters

#### Get banks with available disbursement service

```ts
d.getBanks();
```

#### Create a disbursement

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
  forUserID?: string;
  withFeeRule?: string;
})
```

#### Create a batch of disbursements

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
    forUserID?: string;
    withFeeRule?: string;
  }>;
  xIdempotencyKey?: string;
})
```

#### Get a disbursement by ID

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

Refer to [Xendit API Reference](https://developers.xendit.co/api-reference/#invoices) for more info about methods' parameters

#### Create an invoice

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
  forUserID?: string;
})
```

#### Get an invoice

```ts
i.getInvoice(data: { invoiceID: string; forUserID?: string })
```

#### Expire an invoice

```ts
i.expireInvoice(data: {
  invoiceID: string;
  forUserID?: string;
})
```

#### Get all invoices

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
  forUserID?: string;
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

Refer to [Xendit API Reference](https://developers.xendit.co/api-reference/#recurring-payments) for more info about methods' parameters

#### Create recurring payment

```ts
rp.createPayment(data: {
  externalID: string;
  payerEmail?: string;
  description?: string;
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
  currency?: string;
  rescheduleAt?: Date;
  customer?: object;
  customerNotificationPreference?: object;
  reminderTimeUnit?: string;
  reminderTime?: number;
  paymentMethodId?: string;
})
```

#### Get recurring payment

```ts
rp.getPayment(data: { id: string })
```

#### Edit recurring payment

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
  rescheduleAt?: Date;
  customerId?: string;
  reminderTimeUnit?: string;
  reminderTime?: number;
  paymentMethodId?: string;
})
```

#### Stop recurring payment

```ts
rp.stopPayment(data: { id: string })
```

#### Pause recurring payment

```ts
rp.pausePayment(data: { id: string })
```

#### Resume recurring payment

```ts
rp.resumePayment(data: { id: string })
```

### Recurring Services

Instantiate Recurring service using constructor that has been injected with Xendit keys

```js
const { Recurring } = x;
const rSpecificOptions = {};
const r = new Recurring(rSpecificOptions);
```

Example: Create a recurring plan

```js
r.createPlan({
  businessId: '6066ebf68204c740b61aa3c6',
  referenceId: 'ref-123',
  customerId: 'cus-123',
  recurringAction: 'PAYMENT',
  currency: 'IDR',
  amount: 1000,
  paymentMethods: [
    { paymentMethodId: 'pm-123', rank: 1 },
  ],
  scheduleId: 'resc-123',
  immediateActionType: 'FULL_AMOUNT',
  notificationConfig: {
    recurringCreated: ['EMAIL'],
    recurringSucceeded: ['SMS'],
    recurringFailed: ['WHATSAPP']
  },
  failedCycleAction: 'RESUME'
})
  .then(({ id }) => {
    console.log(`Recurring plan created with ID: ${id}`);
  })
  .catch(e => {
    console.error(
      `Recurring plan creation failed with message: ${e.message}`,
    );
  });
```

Refer to [Xendit API Reference](https://developers.xendit.co/api-reference/#recurring-plans) for more info about methods' parameters

#### Create recurring schedule

```ts
r.createSchedule(data: {
  referenceId: string;
  businessId: string;
  interval: string;
  intervalCount: number;
  totalRecurrence?: number;
  anchorDate?: string;
  retryInterval?: string;
  retryIntervalCount?: number;
  totalRetry?: number;
  failedAttemptNotifications?: number[];
});
```

#### Edit recurring schedule

```ts
r.editSchedule(data: {
  id: string;
  businessId: string;
  interval: string;
  intervalCount: number;
  totalRecurrence?: number;
  anchorDate?: string;
  retryInterval?: string;
  updateScheduledCycle?: boolean;
  retryIntervalCount?: number;
  totalRetry?: number;
  failedAttemptNotifications?: number[];
});
```

#### Get recurring schedule

```ts
r.getSchedule(data: {
  id: string;
  businessId: string;
});
```

#### Create recurring plan

```ts
r.createPlan(data: {
  businessId: string;
  referenceId: string;
  customerId: string;
  recurringAction: RecurringAction;
  currency: Currency;
  amount: number;
  paymentMethods?: Array<PaymentMethodIdRanked>;
  scheduleId: string;
  immediateActionType?: ImmediateActionType | null;
  notificationConfig?: NotificationConfig | null;
  failedCycleAction?: FailingCycleAction;
  metadata?: object | null;
})
```

#### Create recurring plan with schedule

```ts
r.createPlan(data: {
  businessId: string;
  referenceId: string;
  customerId: string;
  recurringAction: RecurringAction;
  currency: Currency;
  amount: number;
  paymentMethods?: Array<PaymentMethodIdRanked>;
  schedule: RecurringSchedule;
  immediateActionType?: ImmediateActionType | null;
  notificationConfig?: NotificationConfig | null;
  failedCycleAction?: FailingCycleAction;
  metadata?: object | null;
})
```

#### Edit recurring plan

```ts
r.editPlan(data: {
  businessId: string;
  customerId?: string;
  currency?: Currency;
  amount?: number;
  paymentMethods?: Array<PaymentMethodIdRanked>;
  notificationConfig?: NotificationConfig | null;
  updateScheduledCycle?: boolean;
  metadata?: object | null;
  description?: string;
})
```

#### Get recurring plan

```ts
r.getPlan(data: { id: string; businessId: string; })
```

#### Deactivate recurring plan

```ts
r.deactivatePlan(data: { id: string; businessId: string; })
```

#### Edit recurring cycle

```ts
r.editCycle(data: {
  id: string;
  businessId: string;
  planId: string;
  scheduledTimestamp: string;
  currency: Currency;
  amount: number;
  metadata?: object | null;
})
```

#### Get recurring cycle

```ts
r.getCycle(data: {
  id: string;
  planId: string;
  businessId: string;
})
```

#### Get all recurring cycles

```ts
r.getAllCycles(data: {
  planId: string;
  businessId: string;
  limit?: number;
  beforeId?: string;
  afterId?: string;
  searchType?: CycleDashboardSearchType;
  searchValue?: string;
})
```

#### Cancel recurring cycle

```ts
r.cancelCycle(data: {
  id: string;
  planId: string;
  businessId: string;
})
```

### Payout Services

Instantiate Payout service using constructor that has been injected with Xendit keys

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
  email: 'stanley@xendit.co',
}).then(({ id }) => {
  console.log(`Invoice created with ID: ${id}`);
});
```

Refer to [Xendit API Reference](https://developers.xendit.co/api-reference/#payouts) for more info about methods' parameters

#### Create a payout

```ts
p.createPayout(data: {
  externalID: string;
  amount: string;
  email: string;
})
```

#### Get a payout

```ts
p.getPayout(data: { id: string })
```

#### Void a payout

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

Example: Create an ewallet charge

```js
ew.createEWalletCharge({
  referenceID: 'test-reference-id',
  currency: 'IDR',
  amount: 50000,
  checkoutMethod: 'ONE_TIME_PAYMENT',
  channelCode: 'ID_OVO',
  channelProperties: {
    mobileNumber: '+6281234567890',
  },
}).then(r => {
  console.log('created ewallet payment charge:', r);
  return r;
});
```

Refer to [Xendit API Reference](https://developers.xendit.co/api-reference/#ewallets) for more info about methods' parameters

#### Create payment

```ts
ew.createPayment(data: {
  externalID: string;
  amount: number;
  phone?: string;
  expirationDate?: Date;
  callbackURL?: string;
  redirectURL?: string;
  items?: PaymentItem[];
  ewalletType: CreateSupportWalletTypes;
  xApiVersion?: string;
})
```

#### Get payment

```ts
ew.getPayment(data: {
  externalID: string;
  ewalletType: GetSupportWalletTypes;
})
```

#### Create an ewallet charge

```ts
ew.createEWalletCharge(data: {
  referenceID: string;
  currency: Currency;
  amount: number;
  checkoutMethod: string;
  channelCode?: ChannelCode;
  channelProperties?: ChannelProps;
  paymentMethodId?: string;
  customerID?: string;
  basket?: Basket[];
  metadata?: object;
  forUserID?: string;
  withFeeRule?: string;
})
```

#### Get an ewallet charge status

```ts
ew.getEWalletChargeStatus(data: {
  chargeID: string;
  forUserID?: string;
})
```

#### Void an ewallet charge

```ts
ew.voidEWalletCharge(data: {
  chargeID: string;
  forUserID?: string;
})
```

#### Initialize tokenization

```ts
ew.initializeTokenization(data: {
  customerID: string;
  channelCode: ChannelCode;
  properties?: OnlineBankingAccessProperties;
  metadata?: object;
})
```

#### Unlink tokenization

```ts
ew.unlinkTokenization(data: {
  linkedAccTokenID: string;
})
```

#### Create payment method (E-Wallet)

```ts
ew.createPaymentMethod(data: {
  customerID: string;
  type: PaymentMethodType;
  properties: PaymentMethodProperties;
  metadata?: object;
})
```

#### Get payment methods by customer ID (E-Wallet)

```ts
ew.getPaymentMethodsByCustomerID(data: {
    customerID: string;
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

Refer to [Xendit API Reference](https://developers.xendit.co/api-reference/#balances) for more info about methods' parameters

#### Get balance

```ts
b.getBalance(data: {
  accountType: AccountType;
  forUserID?: string;
})
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

Refer to [Xendit API Reference](https://developers.xendit.co/api-reference/#retail-outlets) for more info about methods' parameters

#### Create fixed payment code

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

#### Get fixed payment code

```ts
ro.getFixedPaymentCode(data: { id: string })
```

#### Get payments by fixed payment code ID

```ts
ro.getPaymentsByFixedPaymentCodeId(data: { id: string })
```

#### Update fixed payment code

```ts
ro.updateFixedPaymentCode(data: {
  id: string
  name?: string;
  expectedAmt?: number;
  expirationDate?: Date;
})
```

#### Simulate payment for RO (only in dev mode)

```ts
ro.simulatePayment(data: {
  retailOutletName: string;
  paymentCode: string;
  transferAmount: number;
})
```

### QR Code Services

Instanitiate QR Code service using constructor that has been injected with Xendit keys

```js
const { QrCode } = x;
const qrcodeSpecificOptions = {};
const q = new QrCode(qrcodeSpecificOptions);
```

Example: create a QR code

```js
q.createCode({
  externalID: 'your-system-tracking-id',
  amount: 10000,
  type: QrCode.Type.Dynamic,
  callback_url: 'https://yourwebsite/callback',
})
  .then(({ id }) => {
    console.log(`QR code created with ID: ${id}`);
  })
  .catch(e => {
    console.error(`QR code creation failed with message: ${e.message}`);
  });
```

Refer to [Xendit API Reference](https://developers.xendit.co/api-reference/#qr-codes) for more info about methods' parameters

#### Create code

```ts
q.createCode(data: {
  externalID: string;
  type: QrCodeTypes;
  callbackURL: string;
  amount?: number;
});
```

#### Get code

```ts
q.getCode(data: { externalID: string });
```

#### Simulate payment for QR (only in dev mode)

```ts
q.simulate(data: { externalID: string; amount?: number });
```

#### Get payments by external ID

```ts
q.getPayments(data: {
  externalID: string;
  from?: string;
  to?: string;
  limit?: number;
});
```

### Customer services

Instanitiate customer service using constructor that has been injected with Xendit keys

```js
const { Customer } = x;
const customerSpecificOptions = {};
const c = new Customer(customerSpecificOptions);
```

Example: create a customer

```js
c.createCustomer({
  referenceID: 'ref-id-example-1',
  givenNames: 'customer 1',
  email: 'customer@website.com',
  mobileNumber: '+6281212345678',
  description: 'dummy customer',
  middleName: 'middle',
  surname: 'surname',
  addresses: [],
})
  .then(({ id }) => {
    console.log(`Customer created with ID: ${id}`);
  })
  .catch(e => {
    console.error(`Customer creation failed with message: ${e.message}`);
  });
```

Refer to [Xendit API Reference](https://developers.xendit.co/api-reference/#customers) for more info about methods' parameters

#### Create customer

```ts
c.createCustomer(data: {
  referenceID: string;
  mobileNumber?: string;
  email?: string;
  givenNames: string;
  middleName?: string;
  surname?: string;
  description?: string;
  phoneNumber?: string;
  nationality?: string;
  addresses?: Address[];
  dateOfBirth?: string;
  metadata?: object;
});
```

#### Get customer

```ts
c.getCustomer(data: { id: string });
```

#### Get customer by reference ID

```ts
c.getCustomerByReferenceID(data: { referenceID: string });
```

#### Update customer

```ts
c.updateCustomer(data: {
  id: string;
  referenceID?: string;
  givenNames?: string;
  mobileNumber?: string;
  addresses?: Address[];
  description?: string;
  middleName?: string;
  surname?: string;
  phoneNumber?: string;
  nationality?: string;
  dateOfBirth?: string;
  metadata?: object;
  })
```

### Direct debit services

Instanitiate direct debit service using constructor that has been injected with Xendit keys

```js
const { DirectDebit } = x;
const directDebitSpecificOptions = {};
const dd = new DirectDebit(directDebitSpecificOptions);
```

Example: create a direct debit payment

```js
dd.createDirectDebitPayment({
  idempotencyKey: '7960e3fd-9a1d-469d-8b3e-2f88df139c50',
  referenceID: 'merchant-ref-id-ex-1',
  paymentMethodID: 'pm-8c09656d-09fe-4bdd-bd8d-87495a71d231',
  currency: 'IDR',
  amount: 15000,
  callbackURL: 'https://payment-callback-listener/',
  enableOTP: true,
})
  .then(({ id }) => {
    console.log(`Direct debit payment created with ID: ${id}`);
  })
  .catch(e => {
    console.error(`Direct debit creation failed with message: ${e.message}`);
  });
```

Refer to [Xendit API Reference](https://developers.xendit.co/api-reference/#direct-debit) for more info about methods' parameters

#### Initialize linked account tokenization

```ts
dd.initializeTokenization(data: {
  customerID: string;
  channelCode: ChannelCode;
  properties?: DebitCardProperties | OnlineBankingAccessProperties;
  device?: object;
  metadata?: object;
});
```

#### Validate OTP for Linked Account Token

```ts
dd.validateOTPforLinkedAccount(data: {
  tokenID: string;
  otpCode: string;
});
```

#### Retrieve accessible accounts by linked account token

```ts
dd.retrieveAccountsByTokenID(data: {
  tokenID: string;
});
```

#### Create payment method (Direct Debit)

```ts
dd.createPaymentMethod(data: {
  customerID: string;
  type: PaymentMethodType;
  properties: PaymentMethodProperties;
  metadata?: object;
});
```

#### Get payment methods by customer ID (Direct Debit)

```ts
dd.getPaymentMethodsByCustomerID(data: {
  customerID: string;
});
```

#### Create direct debit payment

```ts
dd.createDirectDebitPayment(data: {
  idempotencyKey: string;
  apiVersion?: string;
  referenceID: string;
  paymentMethodID: string;
  currency: string;
  amount: number;
  callbackURL: string;
  enableOTP?: boolean;
  description?: string;
  basket?: Basket[];
  device?: object;
  metadata?: object;
  successRedirectUrl?: string;
  failureRedirectUrl?: string;
});
```

#### Validate OTP for direct debit payment

```ts
dd.validateOTPforPayment(data: {
  directDebitID: string;
  otpCode: string;
  apiVersion?: string;
})
```

#### Get direct debit payment status by ID

```ts
dd.getDirectDebitPaymentStatusByID(data: {
  directDebitID: string;
});
```

#### Get direct debit payment status by reference ID

```ts
dd.getDirectDebitPaymentStatusByReferenceID(data: {
  referenceID: string;
```

### Report Service

Instantiate the Report service using a constructor which has been injected with Xendit keys.

```js
const { Report } = x;
const reportSpecificOptions = {};
const r = new Report(reportSpecificOptions);
```

Example: Generating a report

```js
r.generateReport({
  type: 'BALANCE_HISTORY',
  filterDateFrom: new Date(new Date().getTime() - 24 * 60 * 60 * 1000), // Yesterday's Date
  filterDateTo: new Date(),
  format: 'CSV',
  currency: 'IDR',
})
  .then(res => {
    console.log('Generated report:', res);
  })
  .catch(e => {
    console.error(`Generate Report Failed with Error: ${e.message}`);
  });
```

#### Generate Report

```ts
r.generateReport(data: {
  type: reportTypes;
  filterDateFrom?: Date;
  filterDateTo?: Date;
  format?: formatTypes;
  currency?: currencyTypes;
})
```

#### Get Report

```ts
r.getReport(data: {
  id: string
})
```

### Transaction Service

Instantiate the Transaction service using a constructor which has been injected with Xendit keys.

```js
const { Transaction } = x;
const transactionSpecificOptions = {};
const t = new Transaction(transactionSpecificOptions);
```

Example: Getting a transaction

```js
t.getTransaction({
  id: 'txn_123',
})
  .then(res => {
    console.log('Get Transaction:', res);
  })
  .catch(e => {
    console.error(`Get Transaction Failed with Error: ${e.message}`);
  });
```

#### Get Transaction

```ts
t.getTransaction(data: {
  id: string;
})
```

#### List Transactions

```ts
t.listTransactions(data: {
  types?: Array<string>;
  statuses?: Array<string>;
  channelCategories?: Array<string>;
  referenceId?: string;
  productId?: string;
  accountIdentifier?: string;
  currency?: string;
  amount?: number;
  limit?: number;
  afterId?: string;
  beforeId?: string;
  createdDateFrom?: Date;
  createdDateTo?: Date;
  updatedDateFrom?: Date;
  updatedDateTo?: Date;
})
```

### XenPlatform Service

Instanitiate Platform service using constructor that has been injected with Xendit keys

```js
const { Platform } = x;
const platformSpecificOptions = {};
const p = new Platform(platformSpecificOptions);
```

Example: Creating a sub-account

```js
p.createAccount({
  accountEmail: 'example@gmail.com',
  type: 'MANAGED',
})
  .then(({ user_id }) => {
    console.log(`Account created with ID: ${user_id}`);
  })
  .catch(e => {
    console.error(`Account creation failed with message: ${e.message}`);
  });
```

Refer to [Xendit API Reference](https://developers.xendit.co/api-reference/#xenplatform) for more info about methods' parameters

#### Create sub-account

```ts
p.createAccount(data: {
  accountEmail: string;
  type: AccountTypes;
  businessProfile?: {
    businessName: string;
  };
})
```

#### Create sub-account using V2

```ts
p.createV2Account(data: {
  email: string;
  type: string;
  publicProfile?: {
    businessName: string;
  };
})
```

#### Get sub-account by ID

```ts
p.getAccountByID(data: {
  id: string;
})
```

#### Update sub-account

```ts
p.updateAccount(data: {
  id: string;
  email: string;
  publicProfile?: {
    businessName: string;
  };
})
```

#### Set Callback URL

```ts
p.setCallbackURL(data: {
  type: string;
  url: string;
  forUserID?: string;
})
```

#### Create transfers

```ts
p.createTransfer(data: {
  reference: string;
  amount: number;
  sourceUserID: string;
  destinationUserID: string;
})
```

#### Create fee rules

```ts
p.createFeeRule(data: {
  name: string;
  description?: string;
  routes: Array<{
    unit: string;
    amount: number;
    currency: string;
  }>;
})

```
### Payment Request

Instanitiate Payment Request using constructor that has been injected with Xendit keys

```js
const { PaymentRequest } = x;
const r = new PaymentRequest();
```

Example: Create a Payment Request

```js


r.createPaymentRequest({
      amount: 1500,
      currency: 'PHP',
      payment_method: {
        type: 'EWALLET',
        ewallet: {
          channel_code: 'GRABPAY',
          channel_properties: {
            success_return_url: 'https://redirect.me/goodstuff',
            failure_return_url: 'https://redirect.me/badstuff',
          },
        },
        reusability: 'ONE_TIME_USE',
      }
}).then(({ id }) => {
  console.log(`payment request created with ID: ${id}`);
});
```

Refer to [Xendit API Reference](https://developers.xendit.co/api-reference/#payment-requests) for more info about methods' parameters


#### Create payment request

```ts
r.createPaymentRequest(data: {
    currency: PaymentRequestCurrencies;
    amount: number;
    reference_id?: string;
    customer_id?: string;
    country: PaymentRequestCountries;
    description?: string;
    payment_method: object;
    channel_properties?: PaymentRequestChannelProperties;
    metadata?: object;
    payment_method_id?: string;
    shipping_information?: object;
    initiator?: PaymentRequestInitiator;
    capture_method?: PaymentRequestCaptureMethod;
    idempotency_key?: string;
    for_user_id?: string;
})
```

#### List payment requests

```ts
r.listpaymentrequests(data: {
    id?: string;
    reference_id?: string;
    customer_id?: string;
    type?: PaymentRequestType;
    channel_code?: string;
    status?: PaymentRequestStatuses;
    limit?: number;
    after_id?: string;
    before_id?: string;
    for_user_id?: string;
})
```

#### Get payment request details by ID

```ts
r.getPaymentRequestByID(data: {
    id: string;
    for_user_id?: string;
})
```

#### confirm payment request

```ts
r.confirmPaymentRequest(data: {
    id: string;
    auth_code: string;
    idempotency_key?: string;
    for_user_id?: string;
})
```

#### resend auth for payment request

```ts
r.resendAuthForPaymentRequest(data: {
    id: string;
    idempotency_key?: string;
    for_user_id?: string;
})
```


### Payment Method 

Instanitiate Payment Method using constructor that has been injected with Xendit keys

```js
const { PaymentMethod } = x;
const r = new PaymentMethod();
```

Example: Create a Payment Method

```js
r.createPaymentMethod({
      type: 'DIRECT_DEBIT',
      reusability: 'ONE_TIME_USE',
      customer_id: '16f72571-9b3a-43dc-b241-5b71f470202f',
      country: 'ID',
      direct_debit: {
        channel_code: 'BRI',
        channel_properties: {
          mobile_number: '+6281299640904',
          card_last_four: '8888',
          card_expiry: '10/29',
          email: 'dharma@xendit.co',
        },
      },
}).then(({ id }) => {
  console.log(`payment method created with ID: ${id}`);
});
```

Refer to [Xendit API Reference](https://developers.xendit.co/api-reference/#payment-methods) for more info about methods' parameters


#### Create payment method

```ts
r.createPaymentMethodV2(data: {
  type: PaymentMethodV2Types;
  reusability: PaymentMenthodV2Reusabilities;
  reference_id?: string;
  customer_id?: string;
  country?: CreatePaymentMenthodV2Countries;
  description?: string;
  billing_information?: BillingInformationItems;
  metadata?: object;
  ewallet?: EwalletItems;
  direct_debit?: DirectDebitItems;
  card?: CardItems;
  over_the_counter?: OverTheCounterItems;
  virtual_account?: VirtualAccountItems;
  qr_code?: QRISItems;
  for_user_id?: string;
  idempotency_key?: string;
})
```

#### List payment methods

```ts
r.listPaymentMethodV2(data: {
  payment_method_id?: string;
  payment_method_type?: string;
  channel_code?: string;
  limit?: number;
  after_id?: string;
  before_id?: string;
  for_user_id?: string;
})
```

#### Get payment method details by ID

```ts
r.getPaymentMethodByIdV2(data: {
    id: string;
    for_user_id?: string;
})
```

#### Authorize Payment method

```ts
r.authorizePaymentMethodV2(data: {
    id: string;
    auth_code: string;
    for_user_id?: string;
    idempotency_key?: string;
})
```

#### Update Payment method

```ts
r.updatePaymentMethodV2(data: {
    id: string;
    reference_id?: string;
    description?: string;
    metadata?: object;
    status?: string;
    reusability?: PaymentMenthodV2Reusabilities;
    over_the_counter?: UpdateOverTheCounterItems;
    virtual_account?: UpdateVirtualAccountItems;
    for_user_id?: string;
})
```

#### Expire Payment method

```ts
r.expirePaymentMethodV2(data: {
    id: string;
    for_user_id?: string;
    idempotency_key?: string;
})
```

#### List payments by payment method id

```ts
r.listPaymentsByPaymentMethodIdV2(data: {
    id: string;
    payment_request_id?: string;
    reference_id?: string;
    status?: ListPaymentMethodV2StatusItems;
    limit?: number;
    after_id?: string;
    before_id?: string;
    created?: string;
    updated?: string;
    for_user_id?: string;
})
```


### Refund Services

Instanitiate Refund service using constructor that has been injected with Xendit keys

```js
const { Refund } = x;
const r = new Refund();
```

Example: Create a refund

```js
r.createRefund({
      invoice_id: 'your-invoice-id',
      reason: 'FRAUDULENT',
      amount: 1000,
}).then(({ id }) => {
  console.log(`refund created with ID: ${id}`);
});
```

Refer to [Xendit API Reference](https://developers.xendit.co/api-reference/#refunds) for more info about methods' parameters

#### Create refund

```ts
r.createRefund(data: {
  payment_request_id?: string;
  reference_id?: string;
  invoice_id?: string;
  currency?: string;
  amount?: number;
  reason: RefundReasons;
  metadata?: object;
  idempotency_key?: string;
  for_user_id?: string;
})
```

#### List refunds

```ts
r.listRefunds(data: {
  payment_request_id?: string;
  invoice_id?: string;
  payment_method_type?: string;
  channel_code?: string;
  limit?: number;
  after_id?: string;
  before_id?: string;
  for_user_id?: string;
})
```

#### Get refund details by ID

```ts
r.getRefundById(data: {
  id: string;
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

For any requests, bug or comments, please [open an issue](https://github.com/xendit/xendit-node/issues) or [submit a pull request](https://github.com/xendit/xendit-node/pulls).
