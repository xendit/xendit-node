## Payout
You can use the APIs below to interface with Xendit's `Payout` API.
To start using the API, you need to destruct instantiated Xendit client or directly import the module and set the secret key.

```typescript
import { Xendit, Payout as PayoutClient } from 'xendit-node';

const xenditClient = new Xendit({secretKey: YOUR_SECRET_KEY})
const { Payout } = xenditClient

const xenditPayoutClient = new PayoutClient({secretKey: YOUR_SECRET_KEY})

// At this point, `Payout` and `xenditPayoutClient` will have no usage difference, for example:
// Payout.
// or
// xenditPayoutClient.
```

All URIs are relative to https://api.xendit.co, except if the operation defines another base path.

| Method | HTTP request | Description |
| ------------- | ------------- | ------------- |
| [**createPayout()**](Payout.md#createpayoutoperation-function) | **POST** /v2/payouts | API to send money at scale to bank accounts &amp; eWallets |
| [**getPayoutById()**](Payout.md#getpayoutbyid-function) | **GET** /v2/payouts/{id} | API to fetch the current status, or details of the payout |
| [**getPayoutChannels()**](Payout.md#getpayoutchannels-function) | **GET** /payouts_channels | API providing the current list of banks and e-wallets we support for payouts for both regions |
| [**getPayouts()**](Payout.md#getpayouts-function) | **GET** /v2/payouts | API to retrieve all matching payouts with reference ID |
| [**cancelPayout()**](Payout.md#cancelpayout-function) | **POST** /v2/payouts/{id}/cancel | API to cancel requested payouts that have not yet been sent to partner banks and e-wallets. Cancellation is possible if the payout has not been sent out via our partner and when payout status is ACCEPTED. |


## `createPayout()` Function


### Function Signature
| Name          |    Value 	     |
|--------------------|:-------------:|
| Function Name | `createPayout` |
| Request Parameters  |  [CreatePayoutOperationRequest](#request-parameters--CreatePayoutOperationRequest)	 |
| Return Type  |  [GetPayouts200ResponseDataInner](payout/GetPayouts200ResponseDataInner.md) |

### Request Parameters - CreatePayoutOperationRequest
| Field Name |   Type 	 |  Required  | Default |
|-----------|:----------:|:----------:|-----------|
| **idempotencyKey** | **string** | ☑️ |  |
| **forUserId** | **string** |  |  |
| **data** | [**CreatePayoutRequest**](payout/CreatePayoutRequest.md) |  |  |

### Usage Example
#### Bank or EWallet Payout

```typescript
import { CreatePayoutRequest, GetPayouts200ResponseDataInner } from 'xendit-node/payout/models'

const data: CreatePayoutRequest = {
  "amount" : 90000,
  "channelProperties" : {
    "accountNumber" : "000000",
    "accountHolderName" : "John Doe"
  },
  "description" : "Test Bank Payout",
  "currency" : "PHP",
  "type" : "DIRECT_DISBURSEMENT",
  "referenceId" : "DISB-001",
  "channelCode" : "PH_BDO"
}

const response: GetPayouts200ResponseDataInner = await xenditPayoutClient.createPayout({
    idempotencyKey: "DISB-1234",
    data
})
```
## `getPayoutById()` Function


### Function Signature
| Name          |    Value 	     |
|--------------------|:-------------:|
| Function Name | `getPayoutById` |
| Request Parameters  |  [GetPayoutByIdRequest](#request-parameters--GetPayoutByIdRequest)	 |
| Return Type  |  [GetPayouts200ResponseDataInner](payout/GetPayouts200ResponseDataInner.md) |

### Request Parameters - GetPayoutByIdRequest
| Field Name |   Type 	 |  Required  | Default |
|-----------|:----------:|:----------:|-----------|
| **id** | **string** | ☑️ |  |
| **forUserId** | **string** |  |  |

### Usage Example
```typescript
import { GetPayouts200ResponseDataInner } from 'xendit-node/payout/models'

const response: GetPayouts200ResponseDataInner = await xenditPayoutClient.getPayoutById({ 
    id: "disb-7baa7335-a0b2-4678-bb8c-318c0167f332",
)
```
## `getPayoutChannels()` Function


### Function Signature
| Name          |    Value 	     |
|--------------------|:-------------:|
| Function Name | `getPayoutChannels` |
| Request Parameters  |  [GetPayoutChannelsRequest](#request-parameters--GetPayoutChannelsRequest)	 |
| Return Type  |  [Channel[]](payout/Channel.md) |

### Request Parameters - GetPayoutChannelsRequest
| Field Name |   Type 	 |  Required  | Default |
|-----------|:----------:|:----------:|-----------|
| **currency** | **string** |  |  |
| **channelCategory** | [**ChannelCategory[]**](payout/ChannelCategory.md) |  |  |
| **channelCode** | **string** |  |  |
| **forUserId** | **string** |  |  |

### Usage Example
```typescript
import { Channel } from 'xendit-node/payout/models'

const response: Channel[] = await xenditPayoutClient.getPayoutChannels({ )
```
## `getPayouts()` Function


### Function Signature
| Name          |    Value 	     |
|--------------------|:-------------:|
| Function Name | `getPayouts` |
| Request Parameters  |  [GetPayoutsRequest](#request-parameters--GetPayoutsRequest)	 |
| Return Type  |  [GetPayouts200Response](payout/GetPayouts200Response.md) |

### Request Parameters - GetPayoutsRequest
| Field Name |   Type 	 |  Required  | Default |
|-----------|:----------:|:----------:|-----------|
| **referenceId** | **string** | ☑️ |  |
| **limit** | **number** |  |  |
| **afterId** | **string** |  |  |
| **beforeId** | **string** |  |  |
| **forUserId** | **string** |  |  |

### Usage Example
```typescript
import { GetPayouts200Response } from 'xendit-node/payout/models'

const response: GetPayouts200Response = await xenditPayoutClient.getPayouts({ 
    referenceId: "DISB-123",
)
```
## `cancelPayout()` Function


### Function Signature
| Name          |    Value 	     |
|--------------------|:-------------:|
| Function Name | `cancelPayout` |
| Request Parameters  |  [CancelPayoutRequest](#request-parameters--CancelPayoutRequest)	 |
| Return Type  |  [GetPayouts200ResponseDataInner](payout/GetPayouts200ResponseDataInner.md) |

### Request Parameters - CancelPayoutRequest
| Field Name |   Type 	 |  Required  | Default |
|-----------|:----------:|:----------:|-----------|
| **id** | **string** | ☑️ |  |
| **forUserId** | **string** |  |  |

### Usage Example
```typescript
import { GetPayouts200ResponseDataInner } from 'xendit-node/payout/models'

const response: GetPayouts200ResponseDataInner = await xenditPayoutClient.cancelPayout({ 
    id: "disb-7baa7335-a0b2-4678-bb8c-318c0167f332",
)
```


[[Back to README]](../README.md)