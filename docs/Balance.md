## Balance
You can use the APIs below to interface with Xendit's `Balance` API.
To start using the API, you need to destruct instantiated Xendit client or directly import the module and set the secret key.

```typescript
import { Xendit, Balance as BalanceClient } from 'xendit-node';

const xenditClient = new Xendit({secretKey: YOUR_SECRET_KEY})
const { Balance } = xenditClient

const xenditBalanceClient = new BalanceClient({secretKey: YOUR_SECRET_KEY})

// At this point, `Balance` and `xenditBalanceClient` will have no usage difference, for example:
// Balance.
// or
// xenditBalanceClient.
```

All URIs are relative to https://api.xendit.co, except if the operation defines another base path.

| Method | HTTP request | Description |
| ------------- | ------------- | ------------- |
| [**getBalance()**](Balance.md#getbalance-function) | **GET** /balance | Retrieves balances for a business, default to CASH type |


## `getBalance()` Function


### Function Signature
| Name          |    Value 	     |
|--------------------|:-------------:|
| Function Name | `getBalance` |
| Request Parameters  |  [GetBalanceRequest](#request-parameters--GetBalanceRequest)	 |
| Return Type  |  [Balance](balance_and_transaction/Balance.md) |

### Request Parameters - GetBalanceRequest
| Field Name |   Type 	 |  Required  | Default |
|-----------|:----------:|:----------:|-----------|
| **accountType** | [CASH, HOLDING, TAX] |  | [&#39;CASH&#39;] |
| **currency** | **string** |  |  |
| **atTimestamp** | **Date** |  |  |
| **forUserId** | **string** |  |  |

### Usage Example
```typescript
import { Balance } from 'xendit-node/balance_and_transaction/models'

const response: Balance = await xenditBalanceClient.getBalance({ )
```


[[Back to README]](../README.md)