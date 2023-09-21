## PaymentMethod
You can use the APIs below to interface with Xendit's `PaymentMethod` API.
To start using the API, you need to destruct instantiated Xendit client or directly import the module and set the secret key.

```typescript
import { Xendit, PaymentMethod as PaymentMethodClient } from 'xendit-node';

const xenditClient = new Xendit({secretKey: YOUR_SECRET_KEY})
const { PaymentMethod } = xenditClient

const xenditPaymentMethodClient = new PaymentMethodClient({secretKey: YOUR_SECRET_KEY})

// At this point, `PaymentMethod` and `xenditPaymentMethodClient` will have no usage difference, for example:
// PaymentMethod.
// or
// xenditPaymentMethodClient.
```
## Validate a payment method\'s linking OTP


### Function Signature
| Name          |    Value 	     |
|--------------------|:-------------:|
| Function Name | `authPaymentMethod` |
| Request Parameters  |  [AuthPaymentMethodRequest](#request-parameters--AuthPaymentMethodRequest)	 |
| Return Type  |  [PaymentMethod](payment_method/models/PaymentMethod.md) |

### Request Parameters — `AuthPaymentMethodRequest`
| Field Name |  Required  |   Type 	   |
|-----------|:----------:|:----------:|
|  paymentMethodId| ✅ | string |
|  idempotencyKey|  | string |
|  data|  | [PaymentMethodAuthParameters](payment_method/models/PaymentMethodAuthParameters.md) |

### Usage Examples
#### Minimum API Usage
```typescript
import { PaymentMethod } from 'xendit-node/payment_method/models'

const response: PaymentMethod = await xenditPaymentMethodClient.authPaymentMethod({ 
    paymentMethodId: "pm-1fdaf346-dd2e-4b6c-b938-124c7167a822",
})
```
## Creates payment method


### Function Signature
| Name          |    Value 	     |
|--------------------|:-------------:|
| Function Name | `createPaymentMethod` |
| Request Parameters  |  [CreatePaymentMethodRequest](#request-parameters--CreatePaymentMethodRequest)	 |
| Return Type  |  [PaymentMethod](payment_method/models/PaymentMethod.md) |

### Request Parameters — `CreatePaymentMethodRequest`
| Field Name |  Required  |   Type 	   |
|-----------|:----------:|:----------:|
|  data|  | [PaymentMethodParameters](payment_method/models/PaymentMethodParameters.md) |

### Usage Examples
#### Minimum API Usage
```typescript
import { PaymentMethod } from 'xendit-node/payment_method/models'

const response: PaymentMethod = await xenditPaymentMethodClient.createPaymentMethod({ })
```
## Expires a payment method


### Function Signature
| Name          |    Value 	     |
|--------------------|:-------------:|
| Function Name | `expirePaymentMethod` |
| Request Parameters  |  [ExpirePaymentMethodRequest](#request-parameters--ExpirePaymentMethodRequest)	 |
| Return Type  |  [PaymentMethod](payment_method/models/PaymentMethod.md) |

### Request Parameters — `ExpirePaymentMethodRequest`
| Field Name |  Required  |   Type 	   |
|-----------|:----------:|:----------:|
|  paymentMethodId| ✅ | string |
|  idempotencyKey|  | string |
|  data|  | [PaymentMethodExpireParameters](payment_method/models/PaymentMethodExpireParameters.md) |

### Usage Examples
#### Minimum API Usage
```typescript
import { PaymentMethod } from 'xendit-node/payment_method/models'

const response: PaymentMethod = await xenditPaymentMethodClient.expirePaymentMethod({ 
    paymentMethodId: "pm-1fdaf346-dd2e-4b6c-b938-124c7167a822",
})
```
## Get all payment channels


### Function Signature
| Name          |    Value 	     |
|--------------------|:-------------:|
| Function Name | `getAllPaymentChannels` |
| Request Parameters  |  [GetAllPaymentChannelsRequest](#request-parameters--GetAllPaymentChannelsRequest)	 |
| Return Type  |  [PaymentChannelList](payment_method/models/PaymentChannelList.md) |

### Request Parameters — `GetAllPaymentChannelsRequest`
| Field Name |  Required  |   Type 	   |
|-----------|:----------:|:----------:|
|  isActivated|  | boolean |
|  type|  | string |
|  idempotencyKey|  | string |

### Usage Examples
#### Minimum API Usage
```typescript
import { PaymentChannelList } from 'xendit-node/payment_method/models'

const response: PaymentChannelList = await xenditPaymentMethodClient.getAllPaymentChannels({ })
```
## Get all payment methods by filters


### Function Signature
| Name          |    Value 	     |
|--------------------|:-------------:|
| Function Name | `getAllPaymentMethods` |
| Request Parameters  |  [GetAllPaymentMethodsRequest](#request-parameters--GetAllPaymentMethodsRequest)	 |
| Return Type  |  [PaymentMethodList](payment_method/models/PaymentMethodList.md) |

### Request Parameters — `GetAllPaymentMethodsRequest`
| Field Name |  Required  |   Type 	   |
|-----------|:----------:|:----------:|
|  id|  | []string |
|  type|  | []string |
|  status|  | [[]PaymentMethodStatus](payment_method/models/PaymentMethodStatus.md) |
|  reusability|  | [PaymentMethodReusability](payment_method/models/PaymentMethodReusability.md) |
|  customerId|  | string |
|  referenceId|  | string |
|  afterId|  | string |
|  beforeId|  | string |
|  limit|  | number |
|  idempotencyKey|  | string |

### Usage Examples
#### Minimum API Usage
```typescript
import { PaymentMethodList } from 'xendit-node/payment_method/models'

const response: PaymentMethodList = await xenditPaymentMethodClient.getAllPaymentMethods({ })
```
## Get payment method by ID


### Function Signature
| Name          |    Value 	     |
|--------------------|:-------------:|
| Function Name | `getPaymentMethodByID` |
| Request Parameters  |  [GetPaymentMethodByIDRequest](#request-parameters--GetPaymentMethodByIDRequest)	 |
| Return Type  |  [PaymentMethod](payment_method/models/PaymentMethod.md) |

### Request Parameters — `GetPaymentMethodByIDRequest`
| Field Name |  Required  |   Type 	   |
|-----------|:----------:|:----------:|
|  paymentMethodId| ✅ | string |
|  idempotencyKey|  | string |

### Usage Examples
#### Minimum API Usage
```typescript
import { PaymentMethod } from 'xendit-node/payment_method/models'

const response: PaymentMethod = await xenditPaymentMethodClient.getPaymentMethodByID({ 
    paymentMethodId: "pm-1fdaf346-dd2e-4b6c-b938-124c7167a822",
})
```
## Returns payments with matching PaymentMethodID.


### Function Signature
| Name          |    Value 	     |
|--------------------|:-------------:|
| Function Name | `getPaymentsByPaymentMethodId` |
| Request Parameters  |  [GetPaymentsByPaymentMethodIdRequest](#request-parameters--GetPaymentsByPaymentMethodIdRequest)	 |
| Return Type  |  object |

### Request Parameters — `GetPaymentsByPaymentMethodIdRequest`
| Field Name |  Required  |   Type 	   |
|-----------|:----------:|:----------:|
|  paymentMethodId| ✅ | string |
|  paymentRequestId|  | []string |
|  paymentMethodId2|  | []string |
|  referenceId|  | []string |
|  paymentMethodType|  | [[]PaymentMethodType](payment_method/models/PaymentMethodType.md) |
|  channelCode|  | []string |
|  status|  | []string |
|  currency|  | []string |
|  createdGte|  | Date |
|  createdLte|  | Date |
|  updatedGte|  | Date |
|  updatedLte|  | Date |
|  limit|  | number |
|  idempotencyKey|  | string |

### Usage Examples
#### Minimum API Usage
```typescript
import {  } from 'xendit-node/payment_method/models'

const response: object = await xenditPaymentMethodClient.getPaymentsByPaymentMethodId({ 
    paymentMethodId: "pm-1fdaf346-dd2e-4b6c-b938-124c7167a822",
})
```
## Patch payment methods


### Function Signature
| Name          |    Value 	     |
|--------------------|:-------------:|
| Function Name | `patchPaymentMethod` |
| Request Parameters  |  [PatchPaymentMethodRequest](#request-parameters--PatchPaymentMethodRequest)	 |
| Return Type  |  [PaymentMethod](payment_method/models/PaymentMethod.md) |

### Request Parameters — `PatchPaymentMethodRequest`
| Field Name |  Required  |   Type 	   |
|-----------|:----------:|:----------:|
|  paymentMethodId| ✅ | string |
|  idempotencyKey|  | string |
|  data|  | [PaymentMethodUpdateParameters](payment_method/models/PaymentMethodUpdateParameters.md) |

### Usage Examples
#### Minimum API Usage
```typescript
import { PaymentMethod } from 'xendit-node/payment_method/models'

const response: PaymentMethod = await xenditPaymentMethodClient.patchPaymentMethod({ 
    paymentMethodId: "pm-1fdaf346-dd2e-4b6c-b938-124c7167a822",
})
```
## Makes payment with matching PaymentMethodID.


### Function Signature
| Name          |    Value 	     |
|--------------------|:-------------:|
| Function Name | `simulatePayment` |
| Request Parameters  |  [SimulatePaymentOperationRequest](#request-parameters--SimulatePaymentOperationRequest)	 |
| Return Type  |   (void)  |

### Request Parameters — `SimulatePaymentOperationRequest`
| Field Name |  Required  |   Type 	   |
|-----------|:----------:|:----------:|
|  paymentMethodId| ✅ | string |
|  idempotencyKey|  | string |
|  data|  | [SimulatePaymentRequest](payment_method/models/SimulatePaymentRequest.md) |

### Usage Examples
#### Minimum API Usage
```typescript
import {  } from 'xendit-node/payment_method/models'

const response:  = await xenditPaymentMethodClient.simulatePayment({ 
    paymentMethodId: "pm-1fdaf346-dd2e-4b6c-b938-124c7167a822",
})
```
