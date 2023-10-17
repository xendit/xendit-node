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
|  forUserId|  | string |
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
|  forUserId|  | string |
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
|  forUserId|  | string |
|  data|  | [PaymentRequestParameters](payment_request/models/PaymentRequestParameters.md) |

### Usage Examples
#### E-Wallet One Time Payment via Redirect URL

```typescript
import { PaymentRequestParameters, PaymentRequest } from 'xendit-node/payment_request/models'

const data: PaymentRequestParameters = {
  "country" : "ID",
  "amount" : 15000,
  "paymentMethod" : {
    "ewallet" : {
      "channelProperties" : {
        "successReturnUrl" : "https://redirect.me/success"
      },
      "channelCode" : "SHOPEEPAY"
    },
    "reusability" : "ONE_TIME_USE",
    "type" : "EWALLET"
  },
  "currency" : "IDR",
  "referenceId" : "example-ref-1234"
}

const response: PaymentRequest = await xenditPaymentRequestClient.createPaymentRequest({
    data
})
```
#### Fixed amount dynamic QR

```typescript
import { PaymentRequestParameters, PaymentRequest } from 'xendit-node/payment_request/models'

const data: PaymentRequestParameters = {
  "amount" : 15000,
  "metadata" : {
    "sku" : "example-sku-1234"
  },
  "paymentMethod" : {
    "qrCode" : {
      "channelCode" : "“QRIS”"
    },
    "reusability" : "ONE_TIME_USE",
    "type" : "QR_CODE"
  },
  "currency" : "IDR",
  "referenceId" : "example-ref-1234"
}

const response: PaymentRequest = await xenditPaymentRequestClient.createPaymentRequest({
    data
})
```
#### Fixed amount single use Virtual Account

```typescript
import { PaymentRequestParameters, PaymentRequest } from 'xendit-node/payment_request/models'

const data: PaymentRequestParameters = {
  "country" : "ID",
  "amount" : 15000,
  "metadata" : {
    "sku" : "example-sku-1234"
  },
  "paymentMethod" : {
    "reusability" : "ONE_TIME_USE",
    "type" : "VIRTUAL_ACCOUNT",
    "virtualAccount" : {
      "channelProperties" : {
        "customerName" : "Ahmad Gunawan",
        "expiresAt" : "2023-01-03T17:00:00Z"
      },
      "channelCode" : "BNI"
    },
    "referenceId" : "example-1234"
  },
  "currency" : "IDR",
  "referenceId" : "example-ref-1234"
}

const response: PaymentRequest = await xenditPaymentRequestClient.createPaymentRequest({
    data
})
```
#### Subsequent PH Direct Debit payments after account linking

```typescript
import { PaymentRequestParameters, PaymentRequest } from 'xendit-node/payment_request/models'

const data: PaymentRequestParameters = {
  "amount" : 1500,
  "metadata" : {
    "sku" : "example-sku-1234"
  },
  "paymentMethodId" : "pm-9685a196-81e9-4c73-8d62-97df5aab2762",
  "currency" : "PHP",
  "referenceId" : "example-ref-1234"
}

const response: PaymentRequest = await xenditPaymentRequestClient.createPaymentRequest({
    data
})
```
#### Subsequent tokenized E-Wallet payments after account linking

```typescript
import { PaymentRequestParameters, PaymentRequest } from 'xendit-node/payment_request/models'

const data: PaymentRequestParameters = {
  "amount" : 15000,
  "metadata" : {
    "sku" : "example-sku-1234"
  },
  "paymentMethodId" : "pm-2b2c6092-2100-4843-a7fc-f5c7edac7efd",
  "currency" : "IDR",
  "referenceId" : "example-ref-1234"
}

const response: PaymentRequest = await xenditPaymentRequestClient.createPaymentRequest({
    data
})
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
|  forUserId|  | string |

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
|  forUserId|  | string |

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
|  idempotencyKey|  | string |
|  forUserId|  | string |

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
|  forUserId|  | string |

### Usage Examples
#### Minimum API Usage
```typescript
import { PaymentRequest } from 'xendit-node/payment_request/models'

const response: PaymentRequest = await xenditPaymentRequestClient.resendPaymentRequestAuth({ 
    paymentRequestId: "pr-1fdaf346-dd2e-4b6c-b938-124c7167a822",
})
```
