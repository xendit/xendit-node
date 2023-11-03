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

const response: Refund = await xenditRefundClient.createRefund({ })
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
})
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

const response: RefundList = await xenditRefundClient.getAllRefunds({ })
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
})
```

[[Back to README]](../README.md)