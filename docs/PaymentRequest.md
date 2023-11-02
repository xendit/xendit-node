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

All URIs are relative to https://api.xendit.co, except if the operation defines another base path.

| Method | HTTP request | Description |
| ------------- | ------------- | ------------- |
| [**createPaymentRequest()**](PaymentRequest.md#createpaymentrequest-function) | **POST** /payment_requests | Create Payment Request |
| [**getPaymentRequestByID()**](PaymentRequest.md#getpaymentrequestbyid-function) | **GET** /payment_requests/{paymentRequestId} | Get payment request by ID |
| [**getPaymentRequestCaptures()**](PaymentRequest.md#getpaymentrequestcaptures-function) | **GET** /payment_requests/{paymentRequestId}/captures | Get Payment Request Capture |
| [**getAllPaymentRequests()**](PaymentRequest.md#getallpaymentrequests-function) | **GET** /payment_requests | Get all payment requests by filter |
| [**capturePaymentRequest()**](PaymentRequest.md#capturepaymentrequest-function) | **POST** /payment_requests/{paymentRequestId}/captures | Payment Request Capture |
| [**authorizePaymentRequest()**](PaymentRequest.md#authorizepaymentrequest-function) | **POST** /payment_requests/{paymentRequestId}/auth | Payment Request Authorize |
| [**resendPaymentRequestAuth()**](PaymentRequest.md#resendpaymentrequestauth-function) | **POST** /payment_requests/{paymentRequestId}/auth/resend | Payment Request Resend Auth |


## `createPaymentRequest()` Function


### Function Signature
| Name          |    Value 	     |
|--------------------|:-------------:|
| Function Name | `createPaymentRequest` |
| Request Parameters  |  [CreatePaymentRequestRequest](#request-parameters--CreatePaymentRequestRequest)	 |
| Return Type  |  [PaymentRequest](payment_request/PaymentRequest.md) |

### Request Parameters - CreatePaymentRequestRequest
| Field Name |   Type 	 |  Required  | Default |
|-----------|:----------:|:----------:|-----------|
| **idempotencyKey** | **string** |  |  |
| **forUserId** | **string** |  |  |
| **data** | [**PaymentRequestParameters**](payment_request/PaymentRequestParameters.md) |  |  |

### Usage Example
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
## `getPaymentRequestByID()` Function


### Function Signature
| Name          |    Value 	     |
|--------------------|:-------------:|
| Function Name | `getPaymentRequestByID` |
| Request Parameters  |  [GetPaymentRequestByIDRequest](#request-parameters--GetPaymentRequestByIDRequest)	 |
| Return Type  |  [PaymentRequest](payment_request/PaymentRequest.md) |

### Request Parameters - GetPaymentRequestByIDRequest
| Field Name |   Type 	 |  Required  | Default |
|-----------|:----------:|:----------:|-----------|
| **paymentRequestId** | **string** | ☑️ |  |
| **forUserId** | **string** |  |  |

### Usage Example
```typescript
import { PaymentRequest } from 'xendit-node/payment_request/models'

const response: PaymentRequest = await xenditPaymentRequestClient.getPaymentRequestByID({ 
    paymentRequestId: "pr-1fdaf346-dd2e-4b6c-b938-124c7167a822",
})
```
## `getPaymentRequestCaptures()` Function


### Function Signature
| Name          |    Value 	     |
|--------------------|:-------------:|
| Function Name | `getPaymentRequestCaptures` |
| Request Parameters  |  [GetPaymentRequestCapturesRequest](#request-parameters--GetPaymentRequestCapturesRequest)	 |
| Return Type  |  [CaptureListResponse](payment_request/CaptureListResponse.md) |

### Request Parameters - GetPaymentRequestCapturesRequest
| Field Name |   Type 	 |  Required  | Default |
|-----------|:----------:|:----------:|-----------|
| **paymentRequestId** | **string** | ☑️ |  |
| **forUserId** | **string** |  |  |
| **limit** | **number** |  |  |

### Usage Example
```typescript
import { CaptureListResponse } from 'xendit-node/payment_request/models'

const response: CaptureListResponse = await xenditPaymentRequestClient.getPaymentRequestCaptures({ 
    paymentRequestId: "pr-1fdaf346-dd2e-4b6c-b938-124c7167a822",
})
```
## `getAllPaymentRequests()` Function


### Function Signature
| Name          |    Value 	     |
|--------------------|:-------------:|
| Function Name | `getAllPaymentRequests` |
| Request Parameters  |  [GetAllPaymentRequestsRequest](#request-parameters--GetAllPaymentRequestsRequest)	 |
| Return Type  |  [PaymentRequestListResponse](payment_request/PaymentRequestListResponse.md) |

### Request Parameters - GetAllPaymentRequestsRequest
| Field Name |   Type 	 |  Required  | Default |
|-----------|:----------:|:----------:|-----------|
| **forUserId** | **string** |  |  |
| **referenceId** | **string[]** |  |  |
| **id** | **string[]** |  |  |
| **customerId** | **string[]** |  |  |
| **limit** | **number** |  |  |
| **beforeId** | **string** |  |  |
| **afterId** | **string** |  |  |

### Usage Example
```typescript
import { PaymentRequestListResponse } from 'xendit-node/payment_request/models'

const response: PaymentRequestListResponse = await xenditPaymentRequestClient.getAllPaymentRequests({ })
```
## `capturePaymentRequest()` Function


### Function Signature
| Name          |    Value 	     |
|--------------------|:-------------:|
| Function Name | `capturePaymentRequest` |
| Request Parameters  |  [CapturePaymentRequestRequest](#request-parameters--CapturePaymentRequestRequest)	 |
| Return Type  |  [Capture](payment_request/Capture.md) |

### Request Parameters - CapturePaymentRequestRequest
| Field Name |   Type 	 |  Required  | Default |
|-----------|:----------:|:----------:|-----------|
| **paymentRequestId** | **string** | ☑️ |  |
| **forUserId** | **string** |  |  |
| **data** | [**CaptureParameters**](payment_request/CaptureParameters.md) |  |  |

### Usage Example
```typescript
import { Capture } from 'xendit-node/payment_request/models'

const response: Capture = await xenditPaymentRequestClient.capturePaymentRequest({ 
    paymentRequestId: "pr-1fdaf346-dd2e-4b6c-b938-124c7167a822",
})
```
## `authorizePaymentRequest()` Function


### Function Signature
| Name          |    Value 	     |
|--------------------|:-------------:|
| Function Name | `authorizePaymentRequest` |
| Request Parameters  |  [AuthorizePaymentRequestRequest](#request-parameters--AuthorizePaymentRequestRequest)	 |
| Return Type  |  [PaymentRequest](payment_request/PaymentRequest.md) |

### Request Parameters - AuthorizePaymentRequestRequest
| Field Name |   Type 	 |  Required  | Default |
|-----------|:----------:|:----------:|-----------|
| **paymentRequestId** | **string** | ☑️ |  |
| **forUserId** | **string** |  |  |
| **data** | [**PaymentRequestAuthParameters**](payment_request/PaymentRequestAuthParameters.md) |  |  |

### Usage Example
```typescript
import { PaymentRequest } from 'xendit-node/payment_request/models'

const response: PaymentRequest = await xenditPaymentRequestClient.authorizePaymentRequest({ 
    paymentRequestId: "pr-1fdaf346-dd2e-4b6c-b938-124c7167a822",
})
```
## `resendPaymentRequestAuth()` Function


### Function Signature
| Name          |    Value 	     |
|--------------------|:-------------:|
| Function Name | `resendPaymentRequestAuth` |
| Request Parameters  |  [ResendPaymentRequestAuthRequest](#request-parameters--ResendPaymentRequestAuthRequest)	 |
| Return Type  |  [PaymentRequest](payment_request/PaymentRequest.md) |

### Request Parameters - ResendPaymentRequestAuthRequest
| Field Name |   Type 	 |  Required  | Default |
|-----------|:----------:|:----------:|-----------|
| **paymentRequestId** | **string** | ☑️ |  |
| **forUserId** | **string** |  |  |

### Usage Example
```typescript
import { PaymentRequest } from 'xendit-node/payment_request/models'

const response: PaymentRequest = await xenditPaymentRequestClient.resendPaymentRequestAuth({ 
    paymentRequestId: "pr-1fdaf346-dd2e-4b6c-b938-124c7167a822",
})
```

[[Back to README]](../README.md)