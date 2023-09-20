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
## API to cancel requested payouts that have not yet been sent to partner banks and e-wallets. Cancellation is possible if the payout has not been sent out via our partner and when payout status is ACCEPTED.


### Function Signature
| Name          |    Value 	     |
|--------------------|:-------------:|
| Function Name | `cancelPayout` |
| Request Parameters  |  [CancelPayoutRequest](#request-parameters--CancelPayoutRequest)	 |
| Return Type  |  [GetPayouts200ResponseDataInner](payout/models/GetPayouts200ResponseDataInner.md) |

### Request Parameters — `CancelPayoutRequest`
| Field Name |  Required  |   Type 	   |
|-----------|:----------:|:----------:|
|  id| ✅ | string |
|  idempotencyKey|  | string |

### Usage Examples
#### Minimum API Usage
```typescript
import { GetPayouts200ResponseDataInner } from 'xendit-node/payout/models'

const response: GetPayouts200ResponseDataInner = await xenditPayoutClient.cancelPayout({ 
    id: "disb-7baa7335-a0b2-4678-bb8c-318c0167f332",
})
```
## API to send money at scale to bank accounts & eWallets


### Function Signature
| Name          |    Value 	     |
|--------------------|:-------------:|
| Function Name | `createPayout` |
| Request Parameters  |  [CreatePayoutOperationRequest](#request-parameters--CreatePayoutOperationRequest)	 |
| Return Type  |  [GetPayouts200ResponseDataInner](payout/models/GetPayouts200ResponseDataInner.md) |

### Request Parameters — `CreatePayoutOperationRequest`
| Field Name |  Required  |   Type 	   |
|-----------|:----------:|:----------:|
|  idempotencyKey| ✅ | string |
|  forUserId|  | string |
|  data|  | [CreatePayoutRequest](payout/models/CreatePayoutRequest.md) |

### Usage Examples
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
## API to fetch the current status, or details of the payout


### Function Signature
| Name          |    Value 	     |
|--------------------|:-------------:|
| Function Name | `getPayoutById` |
| Request Parameters  |  [GetPayoutByIdRequest](#request-parameters--GetPayoutByIdRequest)	 |
| Return Type  |  [GetPayouts200ResponseDataInner](payout/models/GetPayouts200ResponseDataInner.md) |

### Request Parameters — `GetPayoutByIdRequest`
| Field Name |  Required  |   Type 	   |
|-----------|:----------:|:----------:|
|  id| ✅ | string |
|  idempotencyKey|  | string |

### Usage Examples
#### Minimum API Usage
```typescript
import { GetPayouts200ResponseDataInner } from 'xendit-node/payout/models'

const response: GetPayouts200ResponseDataInner = await xenditPayoutClient.getPayoutById({ 
    id: "disb-7baa7335-a0b2-4678-bb8c-318c0167f332",
})
```
## API providing the current list of banks and e-wallets we support for payouts for both regions


### Function Signature
| Name          |    Value 	     |
|--------------------|:-------------:|
| Function Name | `getPayoutChannels` |
| Request Parameters  |  [GetPayoutChannelsRequest](#request-parameters--GetPayoutChannelsRequest)	 |
| Return Type  |  [[]Channel](payout/models/Channel.md) |

### Request Parameters — `GetPayoutChannelsRequest`
| Field Name |  Required  |   Type 	   |
|-----------|:----------:|:----------:|
|  currency|  | string |
|  channelCategory|  | [[]ChannelCategory](payout/models/ChannelCategory.md) |
|  channelCode|  | string |
|  idempotencyKey|  | string |

### Usage Examples
#### Minimum API Usage
```typescript
import { Channel } from 'xendit-node/payout/models'

const response: Channel[] = await xenditPayoutClient.getPayoutChannels({ })
```
## API to retrieve all matching payouts with reference ID


### Function Signature
| Name          |    Value 	     |
|--------------------|:-------------:|
| Function Name | `getPayouts` |
| Request Parameters  |  [GetPayoutsRequest](#request-parameters--GetPayoutsRequest)	 |
| Return Type  |  [GetPayouts200Response](payout/models/GetPayouts200Response.md) |

### Request Parameters — `GetPayoutsRequest`
| Field Name |  Required  |   Type 	   |
|-----------|:----------:|:----------:|
|  referenceId| ✅ | string |
|  limit|  | number |
|  afterId|  | string |
|  beforeId|  | string |
|  idempotencyKey|  | string |

### Usage Examples
#### Minimum API Usage
```typescript
import { GetPayouts200Response } from 'xendit-node/payout/models'

const response: GetPayouts200Response = await xenditPayoutClient.getPayouts({ 
    referenceId: "DISB-123",
})
```
