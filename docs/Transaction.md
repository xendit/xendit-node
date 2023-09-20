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
## Get a list of transactions


### Function Signature
| Name          |    Value 	     |
|--------------------|:-------------:|
| Function Name | `getAllTransactions` |
| Request Parameters  |  [GetAllTransactionsRequest](#request-parameters--GetAllTransactionsRequest)	 |
| Return Type  |  [TransactionsResponse](balance_and_transaction/models/TransactionsResponse.md) |

### Request Parameters — `GetAllTransactionsRequest`
| Field Name |  Required  |   Type 	   |
|-----------|:----------:|:----------:|
|  forUserId|  | string |
|  types|  | [[]TransactionTypes](balance_and_transaction/models/TransactionTypes.md) |
|  statuses|  | [[]TransactionStatuses](balance_and_transaction/models/TransactionStatuses.md) |
|  channelCategories|  | [[]ChannelsCategories](balance_and_transaction/models/ChannelsCategories.md) |
|  referenceId|  | string |
|  productId|  | string |
|  accountIdentifier|  | string |
|  amount|  | number |
|  currency|  | [Currency](balance_and_transaction/models/Currency.md) |
|  created|  | [DateRangeFilter](balance_and_transaction/models/DateRangeFilter.md) |
|  updated|  | [DateRangeFilter](balance_and_transaction/models/DateRangeFilter.md) |
|  limit|  | number |
|  afterId|  | string |
|  beforeId|  | string |
|  idempotencyKey|  | string |

### Usage Examples
#### Minimum API Usage
```typescript
import { TransactionsResponse } from 'xendit-node/balance_and_transaction/models'

const response: TransactionsResponse = await xenditTransactionClient.getAllTransactions({ })
```
## Get a transaction based on its id


### Function Signature
| Name          |    Value 	     |
|--------------------|:-------------:|
| Function Name | `getTransactionByID` |
| Request Parameters  |  [GetTransactionByIDRequest](#request-parameters--GetTransactionByIDRequest)	 |
| Return Type  |  [TransactionResponse](balance_and_transaction/models/TransactionResponse.md) |

### Request Parameters — `GetTransactionByIDRequest`
| Field Name |  Required  |   Type 	   |
|-----------|:----------:|:----------:|
|  id| ✅ | string |
|  forUserId|  | string |
|  idempotencyKey|  | string |

### Usage Examples
#### Minimum API Usage
```typescript
import { TransactionResponse } from 'xendit-node/balance_and_transaction/models'

const response: TransactionResponse = await xenditTransactionClient.getTransactionByID({ 
    id: "id_example",
})
```
