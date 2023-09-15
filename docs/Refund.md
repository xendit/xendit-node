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
## 


### Function Signature
| Name          |    Value 	     |
|--------------------|:-------------:|
| Function Name | `cancelRefund` |
| Request Parameters  |  [CancelRefundRequest](#request-parameters--CancelRefundRequest)	 |
| Return Type  |  [Refund](refund/models/Refund.md) |

### Request Parameters — `CancelRefundRequest`
| Field Name |  Required  |   Type 	   |
|-----------|:----------:|:----------:|
|  refundID| ✅ | string |
|  idempotencyKey|  | string |

### Usage Examples
#### Minimum API Usage
```typescript
import { Refund } from 'xendit-node/refund/models'

const response: Refund = await xenditRefundClient.cancelRefund({ 
    refundID: "rfd-1fdaf346-dd2e-4b6c-b938-124c7167a822",
})
```
## 


### Function Signature
| Name          |    Value 	     |
|--------------------|:-------------:|
| Function Name | `createRefund` |
| Request Parameters  |  [CreateRefundRequest](#request-parameters--CreateRefundRequest)	 |
| Return Type  |  [Refund](refund/models/Refund.md) |

### Request Parameters — `CreateRefundRequest`
| Field Name |  Required  |   Type 	   |
|-----------|:----------:|:----------:|
|  idempotencyKey|  | string |
|  data|  | [CreateRefund](refund/models/CreateRefund.md) |

### Usage Examples
#### Minimum API Usage
```typescript
import { Refund } from 'xendit-node/refund/models'

const response: Refund = await xenditRefundClient.createRefund({ })
```
## 


### Function Signature
| Name          |    Value 	     |
|--------------------|:-------------:|
| Function Name | `getAllRefunds` |
| Request Parameters  |  [GetAllRefundsRequest](#request-parameters--GetAllRefundsRequest)	 |
| Return Type  |  [RefundList](refund/models/RefundList.md) |

### Request Parameters — `GetAllRefundsRequest`
| Field Name |  Required  |   Type 	   |
|-----------|:----------:|:----------:|

### Usage Examples
#### Minimum API Usage
```typescript
import { RefundList } from 'xendit-node/refund/models'

const response: RefundList = await xenditRefundClient.getAllRefunds({ })
```
## 


### Function Signature
| Name          |    Value 	     |
|--------------------|:-------------:|
| Function Name | `getRefund` |
| Request Parameters  |  [GetRefundRequest](#request-parameters--GetRefundRequest)	 |
| Return Type  |  [Refund](refund/models/Refund.md) |

### Request Parameters — `GetRefundRequest`
| Field Name |  Required  |   Type 	   |
|-----------|:----------:|:----------:|
|  refundID| ✅ | string |
|  idempotencyKey|  | string |

### Usage Examples
#### Minimum API Usage
```typescript
import { Refund } from 'xendit-node/refund/models'

const response: Refund = await xenditRefundClient.getRefund({ 
    refundID: "rfd-1fdaf346-dd2e-4b6c-b938-124c7167a822",
})
```
