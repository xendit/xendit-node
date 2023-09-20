## Invoice
You can use the APIs below to interface with Xendit's `Invoice` API.
To start using the API, you need to destruct instantiated Xendit client or directly import the module and set the secret key.

```typescript
import { Xendit, Invoice as InvoiceClient } from 'xendit-node';

const xenditClient = new Xendit({secretKey: YOUR_SECRET_KEY})
const { Invoice } = xenditClient

const xenditInvoiceClient = new InvoiceClient({secretKey: YOUR_SECRET_KEY})

// At this point, `Invoice` and `xenditInvoiceClient` will have no usage difference, for example:
// Invoice.
// or
// xenditInvoiceClient.
```
## Create an invoice


### Function Signature
| Name          |    Value 	     |
|--------------------|:-------------:|
| Function Name | `createInvoice` |
| Request Parameters  |  [CreateInvoiceOperationRequest](#request-parameters--CreateInvoiceOperationRequest)	 |
| Return Type  |  [Invoice](invoice/models/Invoice.md) |

### Request Parameters — `CreateInvoiceOperationRequest`
| Field Name |  Required  |   Type 	   |
|-----------|:----------:|:----------:|
|  data| ✅ | [CreateInvoiceRequest](invoice/models/CreateInvoiceRequest.md) |

### Usage Examples
#### Create Invoice Request

```typescript
import { CreateInvoiceRequest, Invoice } from 'xendit-node/invoice/models'

const data: CreateInvoiceRequest = {
  "amount" : 10000,
  "invoiceDuration" : 172800,
  "externalId" : "test1234",
  "description" : "Test Invoice",
  "currency" : "IDR",
  "reminderTime" : 1
}

const response: Invoice = await xenditInvoiceClient.createInvoice({
    data
})
```
## Manually expire an invoice


### Function Signature
| Name          |    Value 	     |
|--------------------|:-------------:|
| Function Name | `expireInvoice` |
| Request Parameters  |  [ExpireInvoiceRequest](#request-parameters--ExpireInvoiceRequest)	 |
| Return Type  |  [Invoice](invoice/models/Invoice.md) |

### Request Parameters — `ExpireInvoiceRequest`
| Field Name |  Required  |   Type 	   |
|-----------|:----------:|:----------:|
|  invoiceId| ✅ | string |
|  idempotencyKey|  | string |

### Usage Examples
#### Minimum API Usage
```typescript
import { Invoice } from 'xendit-node/invoice/models'

const response: Invoice = await xenditInvoiceClient.expireInvoice({ 
    invoiceId: "5f4708b7bd394b0400b96276",
})
```
## Get invoice by invoice id


### Function Signature
| Name          |    Value 	     |
|--------------------|:-------------:|
| Function Name | `getInvoiceById` |
| Request Parameters  |  [GetInvoiceByIdRequest](#request-parameters--GetInvoiceByIdRequest)	 |
| Return Type  |  [Invoice](invoice/models/Invoice.md) |

### Request Parameters — `GetInvoiceByIdRequest`
| Field Name |  Required  |   Type 	   |
|-----------|:----------:|:----------:|
|  invoiceId| ✅ | string |
|  idempotencyKey|  | string |

### Usage Examples
#### Minimum API Usage
```typescript
import { Invoice } from 'xendit-node/invoice/models'

const response: Invoice = await xenditInvoiceClient.getInvoiceById({ 
    invoiceId: "62efe4c33e45294d63f585f2",
})
```
## Get all Invoices


### Function Signature
| Name          |    Value 	     |
|--------------------|:-------------:|
| Function Name | `getInvoices` |
| Request Parameters  |  [GetInvoicesRequest](#request-parameters--GetInvoicesRequest)	 |
| Return Type  |  [[]Invoice](invoice/models/Invoice.md) |

### Request Parameters — `GetInvoicesRequest`
| Field Name |  Required  |   Type 	   |
|-----------|:----------:|:----------:|
|  externalId|  | string |
|  statuses|  | [[]InvoiceStatus](invoice/models/InvoiceStatus.md) |
|  limit|  | number |
|  createdAfter|  | Date |
|  createdBefore|  | Date |
|  paidAfter|  | Date |
|  paidBefore|  | Date |
|  expiredAfter|  | Date |
|  expiredBefore|  | Date |
|  lastInvoice|  | string |
|  clientTypes|  | [[]InvoiceClientType](invoice/models/InvoiceClientType.md) |
|  paymentChannels|  | []string |
|  onDemandLink|  | string |
|  recurringPaymentId|  | string |
|  idempotencyKey|  | string |

### Usage Examples
#### Minimum API Usage
```typescript
import { Invoice } from 'xendit-node/invoice/models'

const response: Invoice[] = await xenditInvoiceClient.getInvoices({ })
```
