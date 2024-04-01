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
| [**simulatePaymentRequestPayment()**](PaymentRequest.md#simulatepaymentrequestpayment-function) | **POST** /payment_requests/{paymentRequestId}/payments/simulate | Payment Request Simulate Payment |


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
)
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
)
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

const response: PaymentRequestListResponse = await xenditPaymentRequestClient.getAllPaymentRequests({ )
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
)
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
)
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
)
```
## `simulatePaymentRequestPayment()` Function


### Function Signature
| Name          |    Value 	     |
|--------------------|:-------------:|
| Function Name | `simulatePaymentRequestPayment` |
| Request Parameters  |  [SimulatePaymentRequestPaymentRequest](#request-parameters--SimulatePaymentRequestPaymentRequest)	 |
| Return Type  |  [PaymentSimulation](payment_request/PaymentSimulation.md) |

### Request Parameters - SimulatePaymentRequestPaymentRequest
| Field Name |   Type 	 |  Required  | Default |
|-----------|:----------:|:----------:|-----------|
| **paymentRequestId** | **string** | ☑️ |  |

### Usage Example
```typescript
import { PaymentSimulation } from 'xendit-node/payment_request/models'

const response: PaymentSimulation = await xenditPaymentRequestClient.simulatePaymentRequestPayment({ 
    paymentRequestId: "pr-1fdaf346-dd2e-4b6c-b938-124c7167a822",
)
```

## Callback Objects
Use the following callback objects provided by Xendit to receive callbacks (also known as webhooks) that Xendit sends you on events, such as successful payments. Note that the example is meant to illustrate the contents of the callback object -- you will not need to instantiate these objects in practice
### PaymentCallback Object
>Callback for successful or failed payments made via the Payments API

Model Documentation: [PaymentCallback](payment_request/PaymentCallback.md)
#### Usage Example
Note that the example is meant to illustrate the contents of the callback object -- you will not need to instantiate these objects in practice
```typescript
import { PaymentCallback } from 'xendit-node/payment_request/models'

const paymentCallback = {
  "apiVersion" : null,
  "data" : {
    "country" : "PH",
    "amount" : 1000,
    "metadata" : {
      "sku" : "ABCDEFGH"
    },
    "failureCode" : null,
    "created" : "2022-08-12T13:30:40.9209Z",
    "paymentRequestId" : "pr-5b26cae1-545b-49e9-855e-f85128f3e705",
    "description" : null,
    "referenceId" : "25cfd0f9-baee-44ca-9a12-6debe03f3c22",
    "paymentDetail" : null,
    "channelProperties" : null,
    "customerId" : "c832697e-a62d-46fa-a383-24930b155e81",
    "paymentMethod" : {
      "metadata" : {
        "sku" : "ABCDEFGH"
      },
      "created" : "2022-08-12T13:30:26.579048Z",
      "description" : null,
      "reusability" : "MULTIPLE_USE",
      "type" : "DIRECT_DEBIT",
      "directDebit" : {
        "bankAccount" : {
          "maskedBankAccountNumber" : "XXXXXX1234",
          "bankAccountHash" : "b4dfa99c9b60c77f2e3962b73c098945"
        },
        "channelProperties" : {
          "failureReturnUrl" : "https://your-redirect-website.com/failure",
          "successReturnUrl" : "https://your-redirect-website.com/success"
        },
        "debitCard" : null,
        "type" : "BANK_ACCOUNT",
        "channelCode" : "BPI"
      },
      "referenceId" : "620b9df4-fe69-4bfd-b9d4-5cba6861db8a",
      "ewallet" : null,
      "directBankTransfer" : null,
      "qrCode" : null,
      "overTheCounter" : null,
      "id" : "pm-951b1ad9-1fbb-4724-a744-8956ab6ed17f",
      "updated" : "2022-08-12T13:30:40.221525Z",
      "virtualAccount" : null,
      "card" : null,
      "status" : "ACTIVE"
    },
    "currency" : "PHP",
    "id" : "ddpy-3cd658ae-25b9-4659-aa36-596ae41a809f",
    "updated" : "2022-08-12T13:30:58.729373Z",
    "status" : "SUCCEEDED"
  },
  "created" : "2022-08-12T13:30:58.986Z",
  "businessId" : "5f27a14a9bf05c73dd040bc8",
  "event" : "payment.succeeded"
}
```

You may then use the callback object in your webhook or callback handler like so,
```typescript
function SimulatePaymentCallback(paymentCallback: PaymentCallback) {
    const { id } = paymentCallback
    // do things here with the callback
}
```

[[Back to README]](../README.md)