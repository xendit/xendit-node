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

All URIs are relative to https://api.xendit.co, except if the operation defines another base path.

| Method | HTTP request | Description |
| ------------- | ------------- | ------------- |
| [**createInvoice()**](Invoice.md#createinvoiceoperation-function) | **POST** /v2/invoices/ | Create an invoice |
| [**getInvoiceById()**](Invoice.md#getinvoicebyid-function) | **GET** /v2/invoices/{invoice_id} | Get invoice by invoice id |
| [**getInvoices()**](Invoice.md#getinvoices-function) | **GET** /v2/invoices | Get all Invoices |
| [**expireInvoice()**](Invoice.md#expireinvoice-function) | **POST** /invoices/{invoice_id}/expire! | Manually expire an invoice |


## `createInvoice()` Function


### Function Signature
| Name          |    Value 	     |
|--------------------|:-------------:|
| Function Name | `createInvoice` |
| Request Parameters  |  [CreateInvoiceOperationRequest](#request-parameters--CreateInvoiceOperationRequest)	 |
| Return Type  |  [Invoice](invoice/Invoice.md) |

### Request Parameters - CreateInvoiceOperationRequest
| Field Name |   Type 	 |  Required  | Default |
|-----------|:----------:|:----------:|-----------|
| **data** | [**CreateInvoiceRequest**](invoice/CreateInvoiceRequest.md) | ☑️ |  |
| **forUserId** | **string** |  |  |

### Usage Example
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
## `getInvoiceById()` Function


### Function Signature
| Name          |    Value 	     |
|--------------------|:-------------:|
| Function Name | `getInvoiceById` |
| Request Parameters  |  [GetInvoiceByIdRequest](#request-parameters--GetInvoiceByIdRequest)	 |
| Return Type  |  [Invoice](invoice/Invoice.md) |

### Request Parameters - GetInvoiceByIdRequest
| Field Name |   Type 	 |  Required  | Default |
|-----------|:----------:|:----------:|-----------|
| **invoiceId** | **string** | ☑️ |  |
| **forUserId** | **string** |  |  |

### Usage Example
```typescript
import { Invoice } from 'xendit-node/invoice/models'

const response: Invoice = await xenditInvoiceClient.getInvoiceById({ 
    invoiceId: "62efe4c33e45294d63f585f2",
)
```
## `getInvoices()` Function


### Function Signature
| Name          |    Value 	     |
|--------------------|:-------------:|
| Function Name | `getInvoices` |
| Request Parameters  |  [GetInvoicesRequest](#request-parameters--GetInvoicesRequest)	 |
| Return Type  |  [Invoice[]](invoice/Invoice.md) |

### Request Parameters - GetInvoicesRequest
| Field Name |   Type 	 |  Required  | Default |
|-----------|:----------:|:----------:|-----------|
| **forUserId** | **string** |  |  |
| **externalId** | **string** |  |  |
| **statuses** | [**InvoiceStatus[]**](invoice/InvoiceStatus.md) |  |  |
| **limit** | **number** |  |  |
| **createdAfter** | **Date** |  |  |
| **createdBefore** | **Date** |  |  |
| **paidAfter** | **Date** |  |  |
| **paidBefore** | **Date** |  |  |
| **expiredAfter** | **Date** |  |  |
| **expiredBefore** | **Date** |  |  |
| **lastInvoice** | **string** |  |  |
| **clientTypes** | [**InvoiceClientType[]**](invoice/InvoiceClientType.md) |  |  |
| **paymentChannels** | **string[]** |  |  |
| **onDemandLink** | **string** |  |  |
| **recurringPaymentId** | **string** |  |  |

### Usage Example
```typescript
import { Invoice } from 'xendit-node/invoice/models'

const response: Invoice[] = await xenditInvoiceClient.getInvoices({ )
```
## `expireInvoice()` Function


### Function Signature
| Name          |    Value 	     |
|--------------------|:-------------:|
| Function Name | `expireInvoice` |
| Request Parameters  |  [ExpireInvoiceRequest](#request-parameters--ExpireInvoiceRequest)	 |
| Return Type  |  [Invoice](invoice/Invoice.md) |

### Request Parameters - ExpireInvoiceRequest
| Field Name |   Type 	 |  Required  | Default |
|-----------|:----------:|:----------:|-----------|
| **invoiceId** | **string** | ☑️ |  |
| **forUserId** | **string** |  |  |

### Usage Example
```typescript
import { Invoice } from 'xendit-node/invoice/models'

const response: Invoice = await xenditInvoiceClient.expireInvoice({ 
    invoiceId: "5f4708b7bd394b0400b96276",
)
```

## Callback Objects
Use the following callback objects provided by Xendit to receive callbacks (also known as webhooks) that Xendit sends you on events, such as successful payments. Note that the example is meant to illustrate the contents of the callback object -- you will not need to instantiate these objects in practice
### InvoiceCallback Object
>Invoice Callback Object

Model Documentation: [InvoiceCallback](invoice/InvoiceCallback.md)
#### Usage Example
Note that the example is meant to illustrate the contents of the callback object -- you will not need to instantiate these objects in practice
```typescript
import { InvoiceCallback } from 'xendit-node/invoice/models'

const invoiceCallback = {
  "amount" : 2000000,
  "paymentDestination" : "TEST815",
  "created" : "2020-01-13T02:32:49.827Z",
  "externalId" : "testing-invoice",
  "description" : "Invoice webhook test",
  "userId" : "5848fdf860053555135587e7",
  "merchantName" : "Xendit",
  "paymentChannel" : "ALFAMART",
  "paymentMethod" : "RETAIL_OUTLET",
  "paidAt" : "2020-01-14T02:32:50.912Z",
  "currency" : "IDR",
  "id" : "593f4ed1c3d3bb7f39733d83",
  "paidAmount" : 2000000,
  "payerEmail" : "test@xendit.co",
  "updated" : "2020-01-13T02:32:50.912Z",
  "status" : "PAID"
}
```

You may then use the callback object in your webhook or callback handler like so,
```typescript
function SimulateInvoiceCallback(invoiceCallback: InvoiceCallback) {
    const { id } = invoiceCallback
    // do things here with the callback
}
```

[[Back to README]](../README.md)