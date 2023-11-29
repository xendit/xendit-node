# PaymentMethod



## Properties

| Name | Type | Required | Description | Examples |
|------------|:-------------:|:-------------:|-------------|:-------------:|
| **id** |string | ☑️ |  | | |
| **type** |[PaymentMethodType](PaymentMethodType.md) | ☑️ |  | | |
| **created** |string |  |  | | |
| **updated** |string |  |  | | |
| **description** |string |  |  | | |
| **referenceId** |string |  |  | | |
| **card** |[Card](Card.md) |  |  | | |
| **directDebit** |[DirectDebit](DirectDebit.md) |  |  | | |
| **ewallet** |[EWallet](EWallet.md) |  |  | | |
| **overTheCounter** |[OverTheCounter](OverTheCounter.md) |  |  | | |
| **virtualAccount** |[VirtualAccount](VirtualAccount.md) |  |  | | |
| **qrCode** |[QRCode](QRCode.md) |  |  | | |
| **reusability** |[PaymentMethodReusability](PaymentMethodReusability.md) | ☑️ |  | | |
| **status** |[PaymentMethodStatus](PaymentMethodStatus.md) | ☑️ |  | | |
| **metadata** |object |  |  | | |



[[Back to README]](../../README.md)