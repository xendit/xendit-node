## Transaction
You can use the APIs below to interface with Xendit's `Transaction` API.
To start using the API, you need to destruct instantiated Xendit client or directly import the module and set the secret key.

```typescript
import { Xendit, Transaction as TransactionClient } from 'xendit-node';

const xenditClient = new Xendit({secretKey: YOUR_SECRET_KEY})
const { Transaction } = xenditClient

const xenditTransactionClient = new TransactionClient({secretKey: YOUR_SECRET_KEY})

// At this point, `Transaction` and `xenditTransactionClient` will have no usage difference, for example:
// Transaction.
// or
// xenditTransactionClient.
```

All URIs are relative to https://api.xendit.co, except if the operation defines another base path.

| Method | HTTP request | Description |
| ------------- | ------------- | ------------- |
| [**getTransactionByID()**](Transaction.md#gettransactionbyid-function) | **GET** /transactions/{id} | Get a transaction based on its id |
| [**getAllTransactions()**](Transaction.md#getalltransactions-function) | **GET** /transactions | Get a list of transactions |


## `getTransactionByID()` Function


### Function Signature
| Name          |    Value 	     |
|--------------------|:-------------:|
| Function Name | `getTransactionByID` |
| Request Parameters  |  [GetTransactionByIDRequest](#request-parameters--GetTransactionByIDRequest)	 |
| Return Type  |  [TransactionResponse](balance_and_transaction/TransactionResponse.md) |

### Request Parameters - GetTransactionByIDRequest
| Field Name |   Type 	 |  Required  | Default |
|-----------|:----------:|:----------:|-----------|
| **id** | **string** | ☑️ |  |
| **forUserId** | **string** |  |  |

### Usage Example
```typescript
import { TransactionResponse } from 'xendit-node/balance_and_transaction/models'

const response: TransactionResponse = await xenditTransactionClient.getTransactionByID({ 
    id: "id_example",
)
```
## `getAllTransactions()` Function


### Function Signature
| Name          |    Value 	     |
|--------------------|:-------------:|
| Function Name | `getAllTransactions` |
| Request Parameters  |  [GetAllTransactionsRequest](#request-parameters--GetAllTransactionsRequest)	 |
| Return Type  |  [TransactionsResponse](balance_and_transaction/TransactionsResponse.md) |

### Request Parameters - GetAllTransactionsRequest
| Field Name |   Type 	 |  Required  | Default |
|-----------|:----------:|:----------:|-----------|
| **forUserId** | **string** |  |  |
| **types** | [**TransactionTypes[]**](balance_and_transaction/TransactionTypes.md) |  |  |
| **statuses** | [**TransactionStatuses[]**](balance_and_transaction/TransactionStatuses.md) |  |  |
| **channelCategories** | [**ChannelsCategories[]**](balance_and_transaction/ChannelsCategories.md) |  |  |
| **referenceId** | **string** |  |  |
| **productId** | **string** |  |  |
| **accountIdentifier** | **string** |  |  |
| **amount** | **number** |  |  |
| **currency** | [**Currency**](balance_and_transaction/Currency.md) |  |  |
| **created** | [**DateRangeFilter**](balance_and_transaction/DateRangeFilter.md) |  |  |
| **updated** | [**DateRangeFilter**](balance_and_transaction/DateRangeFilter.md) |  |  |
| **limit** | **number** |  |  |
| **afterId** | **string** |  |  |
| **beforeId** | **string** |  |  |

### Usage Example
```typescript
import { TransactionsResponse } from 'xendit-node/balance_and_transaction/models'

const response: TransactionsResponse = await xenditTransactionClient.getAllTransactions({ )
```


[[Back to README]](../README.md)