## PaymentRequest
You can use the APIs below to interface with Xendit's `PaymentRequest` API.
To start using the API, you need to destruct instantiated Xendit client or directly import the module and set the secret key.

```typescript
import { Xendit, PaymentRequest as PaymentRequestClient } from 'xendit-node';

const xenditClient = new Xendit({secretKey: YOUR_SECRET_KEY})
const { PaymentRequest } = xenditClient

const xenditPaymentRequestClient = new PaymentRequestClient({secretKey: YOUR_SECRET_KEY})

// At this point, `PaymentRequest` and `xenditPaymentRequestClient` will have no usage difference, for example:
// PaymentRequest.
// or
// xenditPaymentRequestClient.
```
## Payment Request Authorize


### Function Signature
| Name          |    Value 	     |
|--------------------|:-------------:|
| Function Name | `authorizePaymentRequest` |
| Request Parameters  |  [AuthorizePaymentRequestRequest](#request-parameters--AuthorizePaymentRequestRequest)	 |
| Return Type  |  [PaymentRequest](payment_request/models/PaymentRequest.md) |

### Request Parameters — `AuthorizePaymentRequestRequest`
| Field Name |  Required  |   Type 	   |
|-----------|:----------:|:----------:|
|  paymentRequestId| ✅ | string |
|  idempotencyKey|  | string |
|  data|  | [PaymentRequestAuthParameters](payment_request/models/PaymentRequestAuthParameters.md) |

### Usage Examples
#### Minimum API Usage
```typescript
import { PaymentRequest } from 'xendit-node/payment_request/models'

const response: PaymentRequest = await xenditPaymentRequestClient.authorizePaymentRequest({ 
    paymentRequestId: "pr-1fdaf346-dd2e-4b6c-b938-124c7167a822",
})
```
## Payment Request Capture


### Function Signature
| Name          |    Value 	     |
|--------------------|:-------------:|
| Function Name | `capturePaymentRequest` |
| Request Parameters  |  [CapturePaymentRequestRequest](#request-parameters--CapturePaymentRequestRequest)	 |
| Return Type  |  [Capture](payment_request/models/Capture.md) |

### Request Parameters — `CapturePaymentRequestRequest`
| Field Name |  Required  |   Type 	   |
|-----------|:----------:|:----------:|
|  paymentRequestId| ✅ | string |
|  idempotencyKey|  | string |
|  data|  | [CaptureParameters](payment_request/models/CaptureParameters.md) |

### Usage Examples
#### Minimum API Usage
```typescript
import { Capture } from 'xendit-node/payment_request/models'

const response: Capture = await xenditPaymentRequestClient.capturePaymentRequest({ 
    paymentRequestId: "pr-1fdaf346-dd2e-4b6c-b938-124c7167a822",
})
```
## Create Payment Request


### Function Signature
| Name          |    Value 	     |
|--------------------|:-------------:|
| Function Name | `createPaymentRequest` |
| Request Parameters  |  [CreatePaymentRequestRequest](#request-parameters--CreatePaymentRequestRequest)	 |
| Return Type  |  [PaymentRequest](payment_request/models/PaymentRequest.md) |

### Request Parameters — `CreatePaymentRequestRequest`
| Field Name |  Required  |   Type 	   |
|-----------|:----------:|:----------:|
|  idempotencyKey|  | string |
|  data|  | [PaymentRequestParameters](payment_request/models/PaymentRequestParameters.md) |

### Usage Examples
#### Minimum API Usage
```typescript
import { PaymentRequest } from 'xendit-node/payment_request/models'

const response: PaymentRequest = await xenditPaymentRequestClient.createPaymentRequest({ })
```
## Get all payment requests by filter


### Function Signature
| Name          |    Value 	     |
|--------------------|:-------------:|
| Function Name | `getAllPaymentRequests` |
| Request Parameters  |  [GetAllPaymentRequestsRequest](#request-parameters--GetAllPaymentRequestsRequest)	 |
| Return Type  |  [PaymentRequestListResponse](payment_request/models/PaymentRequestListResponse.md) |

### Request Parameters — `GetAllPaymentRequestsRequest`
| Field Name |  Required  |   Type 	   |
|-----------|:----------:|:----------:|
|  referenceId|  | []string |
|  id|  | []string |
|  customerId|  | []string |
|  limit|  | number |
|  beforeId|  | string |
|  afterId|  | string |
|  idempotencyKey|  | string |

### Usage Examples
#### Minimum API Usage
```typescript
import { PaymentRequestListResponse } from 'xendit-node/payment_request/models'

const response: PaymentRequestListResponse = await xenditPaymentRequestClient.getAllPaymentRequests({ })
```
## Get payment request by ID


### Function Signature
| Name          |    Value 	     |
|--------------------|:-------------:|
| Function Name | `getPaymentRequestByID` |
| Request Parameters  |  [GetPaymentRequestByIDRequest](#request-parameters--GetPaymentRequestByIDRequest)	 |
| Return Type  |  [PaymentRequest](payment_request/models/PaymentRequest.md) |

### Request Parameters — `GetPaymentRequestByIDRequest`
| Field Name |  Required  |   Type 	   |
|-----------|:----------:|:----------:|
|  paymentRequestId| ✅ | string |
|  idempotencyKey|  | string |

### Usage Examples
#### Minimum API Usage
```typescript
import { PaymentRequest } from 'xendit-node/payment_request/models'

const response: PaymentRequest = await xenditPaymentRequestClient.getPaymentRequestByID({ 
    paymentRequestId: "pr-1fdaf346-dd2e-4b6c-b938-124c7167a822",
})
```
## Get Payment Request Capture


### Function Signature
| Name          |    Value 	     |
|--------------------|:-------------:|
| Function Name | `getPaymentRequestCaptures` |
| Request Parameters  |  [GetPaymentRequestCapturesRequest](#request-parameters--GetPaymentRequestCapturesRequest)	 |
| Return Type  |  [CaptureListResponse](payment_request/models/CaptureListResponse.md) |

### Request Parameters — `GetPaymentRequestCapturesRequest`
| Field Name |  Required  |   Type 	   |
|-----------|:----------:|:----------:|
|  paymentRequestId| ✅ | string |
|  limit|  | number |
|  afterId|  | string |
|  beforeId|  | string |
|  idempotencyKey|  | string |

### Usage Examples
#### Minimum API Usage
```typescript
import { CaptureListResponse } from 'xendit-node/payment_request/models'

const response: CaptureListResponse = await xenditPaymentRequestClient.getPaymentRequestCaptures({ 
    paymentRequestId: "pr-1fdaf346-dd2e-4b6c-b938-124c7167a822",
})
```
## Payment Request Resend Auth


### Function Signature
| Name          |    Value 	     |
|--------------------|:-------------:|
| Function Name | `resendPaymentRequestAuth` |
| Request Parameters  |  [ResendPaymentRequestAuthRequest](#request-parameters--ResendPaymentRequestAuthRequest)	 |
| Return Type  |  [PaymentRequest](payment_request/models/PaymentRequest.md) |

### Request Parameters — `ResendPaymentRequestAuthRequest`
| Field Name |  Required  |   Type 	   |
|-----------|:----------:|:----------:|
|  paymentRequestId| ✅ | string |
|  idempotencyKey|  | string |

### Usage Examples
#### Minimum API Usage
```typescript
import { PaymentRequest } from 'xendit-node/payment_request/models'

const response: PaymentRequest = await xenditPaymentRequestClient.resendPaymentRequestAuth({ 
    paymentRequestId: "pr-1fdaf346-dd2e-4b6c-b938-124c7167a822",
})
```
