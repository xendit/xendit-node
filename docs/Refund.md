## Refund
You can use the APIs below to interface with Xendit's `Refund` API.
To start using the API, you need to destruct instantiated Xendit client or directly import the module and set the secret key.

```typescript
import { Xendit, Refund as RefundClient } from 'xendit-node';

const xenditClient = new Xendit({secretKey: YOUR_SECRET_KEY})
const { Refund } = xenditClient

const xenditRefundClient = new RefundClient({secretKey: YOUR_SECRET_KEY})

// At this point, `Refund` and `xenditRefundClient` will have no usage difference, for example:
// Refund.
// or
// xenditRefundClient.
```

All URIs are relative to https://api.xendit.co, except if the operation defines another base path.

| Method | HTTP request | Description |
| ------------- | ------------- | ------------- |
| [**createRefund()**](Refund.md#createrefund-function) | **POST** /refunds |  |
| [**getRefund()**](Refund.md#getrefund-function) | **GET** /refunds/{refundID} |  |
| [**getAllRefunds()**](Refund.md#getallrefunds-function) | **GET** /refunds |  |
| [**cancelRefund()**](Refund.md#cancelrefund-function) | **POST** /refunds/{refundID}/cancel |  |


## `createRefund()` Function


### Function Signature
| Name          |    Value 	     |
|--------------------|:-------------:|
| Function Name | `createRefund` |
| Request Parameters  |  [CreateRefundRequest](#request-parameters--CreateRefundRequest)	 |
| Return Type  |  [Refund](refund/Refund.md) |

### Request Parameters - CreateRefundRequest
| Field Name |   Type 	 |  Required  | Default |
|-----------|:----------:|:----------:|-----------|
| **idempotencyKey** | **string** |  |  |
| **forUserId** | **string** |  |  |
| **data** | [**CreateRefund**](refund/CreateRefund.md) |  |  |

### Usage Example
```typescript
import { Refund } from 'xendit-node/refund/models'

const response: Refund = await xenditRefundClient.createRefund({ )
```
## `getRefund()` Function


### Function Signature
| Name          |    Value 	     |
|--------------------|:-------------:|
| Function Name | `getRefund` |
| Request Parameters  |  [GetRefundRequest](#request-parameters--GetRefundRequest)	 |
| Return Type  |  [Refund](refund/Refund.md) |

### Request Parameters - GetRefundRequest
| Field Name |   Type 	 |  Required  | Default |
|-----------|:----------:|:----------:|-----------|
| **refundID** | **string** | ☑️ |  |
| **idempotencyKey** | **string** |  |  |
| **forUserId** | **string** |  |  |

### Usage Example
```typescript
import { Refund } from 'xendit-node/refund/models'

const response: Refund = await xenditRefundClient.getRefund({ 
    refundID: "rfd-1fdaf346-dd2e-4b6c-b938-124c7167a822",
)
```
## `getAllRefunds()` Function


### Function Signature
| Name          |    Value 	     |
|--------------------|:-------------:|
| Function Name | `getAllRefunds` |
| Request Parameters  |  [GetAllRefundsRequest](#request-parameters--GetAllRefundsRequest)	 |
| Return Type  |  [RefundList](refund/RefundList.md) |

### Request Parameters - GetAllRefundsRequest
| Field Name |   Type 	 |  Required  | Default |
|-----------|:----------:|:----------:|-----------|
| **forUserId** | **string** |  |  |
| **paymentRequestId** | **string** |  |  |
| **invoiceId** | **string** |  |  |
| **paymentMethodType** | **string** |  |  |
| **channelCode** | **string** |  |  |
| **limit** | **number** |  |  |
| **afterId** | **string** |  |  |
| **beforeId** | **string** |  |  |

### Usage Example
```typescript
import { RefundList } from 'xendit-node/refund/models'

const response: RefundList = await xenditRefundClient.getAllRefunds({ )
```
## `cancelRefund()` Function


### Function Signature
| Name          |    Value 	     |
|--------------------|:-------------:|
| Function Name | `cancelRefund` |
| Request Parameters  |  [CancelRefundRequest](#request-parameters--CancelRefundRequest)	 |
| Return Type  |  [Refund](refund/Refund.md) |

### Request Parameters - CancelRefundRequest
| Field Name |   Type 	 |  Required  | Default |
|-----------|:----------:|:----------:|-----------|
| **refundID** | **string** | ☑️ |  |
| **idempotencyKey** | **string** |  |  |
| **forUserId** | **string** |  |  |

### Usage Example
```typescript
import { Refund } from 'xendit-node/refund/models'

const response: Refund = await xenditRefundClient.cancelRefund({ 
    refundID: "rfd-1fdaf346-dd2e-4b6c-b938-124c7167a822",
)
```

## Callback Objects
Use the following callback objects provided by Xendit to receive callbacks (also known as webhooks) that Xendit sends you on events, such as successful payments. Note that the example is meant to illustrate the contents of the callback object -- you will not need to instantiate these objects in practice
### RefundCallback Object
>Callback for successful or failed Refunds made via the Payments API

Model Documentation: [RefundCallback](refund/RefundCallback.md)
#### Usage Example
Note that the example is meant to illustrate the contents of the callback object -- you will not need to instantiate these objects in practice
```typescript
import { RefundCallback } from 'xendit-node/refund/models'

const refundCallback = {
  "data" : {
    "reason" : "CANCELLATION",
    "amount" : 10000,
    "metadata" : null,
    "failureCode" : null,
    "created" : "2020-08-30T09:12:33.001Z",
    "referenceId" : "b2756a1e-e6cd-4352-9a68-0483aa2b6a2",
    "paymentId" : "ddpy-3cd658ae-25b9-4659-aa36-596ae41a809f",
    "refundFeeAmount" : null,
    "invoiceId" : null,
    "currency" : "PHP",
    "id" : "rfd-6f4a377d-a201-437f-9119-f8b00cbbe857",
    "paymentMethodType" : "DIRECT_DEBIT",
    "updated" : "2020-08-30T09:12:33.001Z",
    "channelCode" : "BPI",
    "status" : "SUCCEEDED"
  },
  "created" : "2020-08-29T09:12:33.001Z",
  "businessId" : "5f27a14a9bf05c73dd040bc8",
  "event" : "refund.succeeded"
}
```

You may then use the callback object in your webhook or callback handler like so,
```typescript
function SimulateRefundCallback(refundCallback: RefundCallback) {
    const { id } = refundCallback
    // do things here with the callback
}
```

[[Back to README]](../README.md)