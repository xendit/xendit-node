# PaymentRequestParameters



## Properties

| Name | Type | Required | Description | Examples |
|------------|:-------------:|:-------------:|-------------|:-------------:|
| **referenceId** |string |  |  | | |
| **amount** |number |  |  | | |
| **currency** |[PaymentRequestCurrency](PaymentRequestCurrency.md) | ☑️ |  | | |
| **paymentMethod** |[PaymentMethodParameters](PaymentMethodParameters.md) |  |  | | |
| **description** |string |  |  | | |
| **captureMethod** |[PaymentRequestCaptureMethod](PaymentRequestCaptureMethod.md) |  |  | | |
| **initiator** |[PaymentRequestInitiator](PaymentRequestInitiator.md) |  |  | | |
| **paymentMethodId** |string |  |  | | |
| **channelProperties** |[PaymentRequestParametersChannelProperties](PaymentRequestParametersChannelProperties.md) |  |  | | |
| **shippingInformation** |[PaymentRequestShippingInformation](PaymentRequestShippingInformation.md) |  |  | | |
| **items** |[PaymentRequestBasketItem[]](PaymentRequestBasketItem.md) |  |  | | |
| **customerId** |string |  |  | | |
| **customer** |object |  |  | | |
| **metadata** |object |  |  | | |



[[Back to README]](../../README.md)