# PaymentCallbackData

Represents the actual funds transaction/attempt made to a payment method

## Properties

| Name | Type | Required | Description | Examples |
|------------|:-------------:|:-------------:|-------------|:-------------:|
| **id** |string | ☑️ |  | | |
| **paymentRequestId** |string |  |  | | |
| **referenceId** |string | ☑️ |  | | |
| **customerId** |string |  |  | | |
| **currency** |string | ☑️ |  | | |
| **amount** |number | ☑️ |  | | |
| **country** |string | ☑️ |  | | |
| **status** |string | ☑️ |  | | |
| **paymentMethod** |[PaymentMethod](PaymentMethod.md) | ☑️ |  | | |
| **channelProperties** |[PaymentRequestChannelProperties](PaymentRequestChannelProperties.md) |  |  | | |
| **paymentDetail** |object |  |  | | |
| **failureCode** |string |  |  | | |
| **created** |string | ☑️ |  | | |
| **updated** |string | ☑️ |  | | |
| **metadata** |object |  |  | | |



[[Back to README]](../../README.md)