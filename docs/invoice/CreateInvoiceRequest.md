# CreateInvoiceRequest

An object representing for an invoice creation request.

## Properties

| Name | Type | Required | Description | Examples |
|------------|:-------------:|:-------------:|-------------|:-------------:|
| **externalId** |string | ☑️ | The external ID of the invoice. | | |
| **amount** |number | ☑️ | The invoice amount. | | |
| **payerEmail** |string |  | The email address of the payer. | | |
| **description** |string |  | A description of the payment. | | |
| **invoiceDuration** |number |  | The duration of the invoice in seconds. | | |
| **callbackVirtualAccountId** |string |  | The ID of the callback virtual account. | | |
| **shouldSendEmail** |boolean |  | Indicates whether email notifications should be sent. | | |
| **customer** |[CustomerObject](CustomerObject.md) |  |  | | |
| **customerNotificationPreference** |[NotificationPreference](NotificationPreference.md) |  |  | | |
| **successRedirectUrl** |string |  | The URL to redirect to on successful payment. | | |
| **failureRedirectUrl** |string |  | The URL to redirect to on payment failure. | | |
| **paymentMethods** |string[] |  | An array of available payment methods. | | |
| **midLabel** |string |  | The middle label. | | |
| **shouldAuthenticateCreditCard** |boolean |  | Indicates whether credit card authentication is required. | | |
| **currency** |string |  | The currency of the invoice. | | |
| **reminderTime** |number |  | The reminder time. | | |
| **locale** |string |  | The default language to display. | | |
| **reminderTimeUnit** |string |  | The unit of the reminder time. | | |
| **items** |[InvoiceItem[]](InvoiceItem.md) |  | An array of items included in the invoice. | | |
| **fees** |[InvoiceFee[]](InvoiceFee.md) |  | An array of fees associated with the invoice. | | |
| **channelProperties** |[ChannelProperties](ChannelProperties.md) |  |  | | |
| **metadata** |object |  | A free-format JSON for additional information that you may use. Object can be up to 50 keys, with key names up to 40 characters long and values up to 500 characters long. | | |



[[Back to README]](../../README.md)