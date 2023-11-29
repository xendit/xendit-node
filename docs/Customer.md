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

All URIs are relative to https://api.xendit.co, except if the operation defines another base path.

| Method | HTTP request | Description |
| ------------- | ------------- | ------------- |
| [**createCustomer()**](Customer.md#createcustomer-function) | **POST** /customers | Create Customer |
| [**getCustomer()**](Customer.md#getcustomer-function) | **GET** /customers/{id} | Get Customer By ID |
| [**getCustomerByReferenceID()**](Customer.md#getcustomerbyreferenceid-function) | **GET** /customers | GET customers by reference id |
| [**updateCustomer()**](Customer.md#updatecustomer-function) | **PATCH** /customers/{id} | Update End Customer Resource |


## `createCustomer()` Function


### Function Signature
| Name          |    Value 	     |
|--------------------|:-------------:|
| Function Name | `createCustomer` |
| Request Parameters  |  [CreateCustomerRequest](#request-parameters--CreateCustomerRequest)	 |
| Return Type  |  [Customer](customer/Customer.md) |

### Request Parameters - CreateCustomerRequest
| Field Name |   Type 	 |  Required  | Default |
|-----------|:----------:|:----------:|-----------|
| **idempotencyKey** | **string** |  |  |
| **forUserId** | **string** |  |  |
| **data** | [**CustomerRequest**](customer/CustomerRequest.md) |  |  |

### Usage Example
```typescript
import { Customer } from 'xendit-node/customer/models'

const response: Customer = await xenditCustomerClient.createCustomer({ )
```
## `getCustomer()` Function


### Function Signature
| Name          |    Value 	     |
|--------------------|:-------------:|
| Function Name | `getCustomer` |
| Request Parameters  |  [GetCustomerRequest](#request-parameters--GetCustomerRequest)	 |
| Return Type  |  [Customer](customer/Customer.md) |

### Request Parameters - GetCustomerRequest
| Field Name |   Type 	 |  Required  | Default |
|-----------|:----------:|:----------:|-----------|
| **id** | **string** | ☑️ |  |
| **forUserId** | **string** |  |  |

### Usage Example
```typescript
import { Customer } from 'xendit-node/customer/models'

const response: Customer = await xenditCustomerClient.getCustomer({ 
    id: "d290f1ee-6c54-4b01-90e6-d701748f0851",
)
```
## `getCustomerByReferenceID()` Function


### Function Signature
| Name          |    Value 	     |
|--------------------|:-------------:|
| Function Name | `getCustomerByReferenceID` |
| Request Parameters  |  [GetCustomerByReferenceIDRequest](#request-parameters--GetCustomerByReferenceIDRequest)	 |
| Return Type  |  [GetCustomerByReferenceID200Response](customer/GetCustomerByReferenceID200Response.md) |

### Request Parameters - GetCustomerByReferenceIDRequest
| Field Name |   Type 	 |  Required  | Default |
|-----------|:----------:|:----------:|-----------|
| **referenceId** | **string** | ☑️ |  |
| **forUserId** | **string** |  |  |

### Usage Example
```typescript
import { GetCustomerByReferenceID200Response } from 'xendit-node/customer/models'

const response: GetCustomerByReferenceID200Response = await xenditCustomerClient.getCustomerByReferenceID({ 
    referenceId: "referenceId_example",
)
```
## `updateCustomer()` Function


### Function Signature
| Name          |    Value 	     |
|--------------------|:-------------:|
| Function Name | `updateCustomer` |
| Request Parameters  |  [UpdateCustomerRequest](#request-parameters--UpdateCustomerRequest)	 |
| Return Type  |  [Customer](customer/Customer.md) |

### Request Parameters - UpdateCustomerRequest
| Field Name |   Type 	 |  Required  | Default |
|-----------|:----------:|:----------:|-----------|
| **id** | **string** | ☑️ |  |
| **forUserId** | **string** |  |  |
| **data** | [**PatchCustomer**](customer/PatchCustomer.md) |  |  |

### Usage Example
```typescript
import { Customer } from 'xendit-node/customer/models'

const response: Customer = await xenditCustomerClient.updateCustomer({ 
    id: "d290f1ee-6c54-4b01-90e6-d701748f0851",
)
```


[[Back to README]](../README.md)