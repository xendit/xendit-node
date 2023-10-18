## Customer
You can use the APIs below to interface with Xendit's `Customer` API.
To start using the API, you need to destruct instantiated Xendit client or directly import the module and set the secret key.

```typescript
import { Xendit, Customer as CustomerClient } from 'xendit-node';

const xenditClient = new Xendit({secretKey: YOUR_SECRET_KEY})
const { Customer } = xenditClient

const xenditCustomerClient = new CustomerClient({secretKey: YOUR_SECRET_KEY})

// At this point, `Customer` and `xenditCustomerClient` will have no usage difference, for example:
// Customer.
// or
// xenditCustomerClient.
```
## Create Customer


### Function Signature
| Name          |    Value 	     |
|--------------------|:-------------:|
| Function Name | `createCustomer` |
| Request Parameters  |  [CreateCustomerRequest](#request-parameters--CreateCustomerRequest)	 |
| Return Type  |  [Customer](customer/models/Customer.md) |

### Request Parameters — `CreateCustomerRequest`
| Field Name |  Required  |   Type 	   |
|-----------|:----------:|:----------:|
|  idempotencyKey|  | string |
|  forUserId|  | string |
|  data|  | [CustomerRequest](customer/models/CustomerRequest.md) |

### Usage Examples
#### Minimum API Usage
```typescript
import { Customer } from 'xendit-node/customer/models'

const response: Customer = await xenditCustomerClient.createCustomer({ })
```
## Get Customer By ID


### Function Signature
| Name          |    Value 	     |
|--------------------|:-------------:|
| Function Name | `getCustomer` |
| Request Parameters  |  [GetCustomerRequest](#request-parameters--GetCustomerRequest)	 |
| Return Type  |  [Customer](customer/models/Customer.md) |

### Request Parameters — `GetCustomerRequest`
| Field Name |  Required  |   Type 	   |
|-----------|:----------:|:----------:|
|  id| ✅ | string |
|  forUserId|  | string |

### Usage Examples
#### Minimum API Usage
```typescript
import { Customer } from 'xendit-node/customer/models'

const response: Customer = await xenditCustomerClient.getCustomer({ 
    id: "d290f1ee-6c54-4b01-90e6-d701748f0851",
})
```
## GET customers by reference id


### Function Signature
| Name          |    Value 	     |
|--------------------|:-------------:|
| Function Name | `getCustomerByReferenceID` |
| Request Parameters  |  [GetCustomerByReferenceIDRequest](#request-parameters--GetCustomerByReferenceIDRequest)	 |
| Return Type  |  [GetCustomerByReferenceID200Response](customer/models/GetCustomerByReferenceID200Response.md) |

### Request Parameters — `GetCustomerByReferenceIDRequest`
| Field Name |  Required  |   Type 	   |
|-----------|:----------:|:----------:|
|  referenceId| ✅ | string |
|  forUserId|  | string |

### Usage Examples
#### Minimum API Usage
```typescript
import { GetCustomerByReferenceID200Response } from 'xendit-node/customer/models'

const response: GetCustomerByReferenceID200Response = await xenditCustomerClient.getCustomerByReferenceID({ 
    referenceId: "referenceId_example",
})
```
## Update End Customer Resource


### Function Signature
| Name          |    Value 	     |
|--------------------|:-------------:|
| Function Name | `updateCustomer` |
| Request Parameters  |  [UpdateCustomerRequest](#request-parameters--UpdateCustomerRequest)	 |
| Return Type  |  [Customer](customer/models/Customer.md) |

### Request Parameters — `UpdateCustomerRequest`
| Field Name |  Required  |   Type 	   |
|-----------|:----------:|:----------:|
|  id| ✅ | string |
|  forUserId|  | string |
|  data|  | [PatchCustomer](customer/models/PatchCustomer.md) |

### Usage Examples
#### Minimum API Usage
```typescript
import { Customer } from 'xendit-node/customer/models'

const response: Customer = await xenditCustomerClient.updateCustomer({ 
    id: "d290f1ee-6c54-4b01-90e6-d701748f0851",
})
```
