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
## Retrieves balances for a business, default to CASH type


### Function Signature
| Name          |    Value 	     |
|--------------------|:-------------:|
| Function Name | `getBalance` |
| Request Parameters  |  [GetBalanceRequest](#request-parameters--GetBalanceRequest)	 |
| Return Type  |  [Balance](balance_and_transaction/models/Balance.md) |

### Request Parameters — `GetBalanceRequest`
| Field Name |  Required  |   Type 	   |
|-----------|:----------:|:----------:|
|  accountType|  | &#39;CASH&#39; | &#39;HOLDING&#39; | &#39;TAX&#39; |
|  currency|  | string |
|  forUserId|  | string |
|  idempotencyKey|  | string |

### Usage Examples
#### Minimum API Usage
```typescript
import { Balance } from 'xendit-node/balance_and_transaction/models'

const response: Balance = await xenditBalanceClient.getBalance({ })
```
