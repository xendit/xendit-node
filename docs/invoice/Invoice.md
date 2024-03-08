# Invoice

An object representing details for an invoice.

## Properties

| Name | Type | Required | Description | Examples |
|------------|:-------------:|:-------------:|-------------|:-------------:|
| **id** |string |  | The unique identifier for the invoice. | | |
| **externalId** |string | ☑️ | The external identifier for the invoice. | | |
| **userId** |string | ☑️ | The user ID associated with the invoice. | | |
| **payerEmail** |string |  | The email address of the payer. | | |
| **description** |string |  | A description of the invoice. | | |
| **paymentMethod** |[InvoicePaymentMethod](InvoicePaymentMethod.md) |  |  | | |
| **status** |[InvoiceStatus](InvoiceStatus.md) | ☑️ |  | | |
| **merchantName** |string | ☑️ | The name of the merchant. | | |
| **merchantProfilePictureUrl** |string | ☑️ | The URL of the merchant\&#39;s profile picture. | | |
| **locale** |string |  | The locale or language used for the invoice. | | |
| **amount** |number | ☑️ | The total amount of the invoice. | | |
| **expiryDate** |Date | ☑️ | Representing a date and time in ISO 8601 format. | | |
| **invoiceUrl** |string | ☑️ | The URL to view the invoice. | | |
| **availableBanks** |[Bank[]](Bank.md) | ☑️ | An array of available banks for payment. | | |
| **availableRetailOutlets** |[RetailOutlet[]](RetailOutlet.md) | ☑️ | An array of available retail outlets for payment. | | |
| **availableEwallets** |[Ewallet[]](Ewallet.md) | ☑️ | An array of available e-wallets for payment. | | |
| **availableQrCodes** |[QrCode[]](QrCode.md) | ☑️ | An array of available QR codes for payment. | | |
| **availableDirectDebits** |[DirectDebit[]](DirectDebit.md) | ☑️ | An array of available direct debit options for payment. | | |
| **availablePaylaters** |[Paylater[]](Paylater.md) | ☑️ | An array of available pay-later options for payment. | | |
| **shouldExcludeCreditCard** |boolean |  | Indicates whether credit card payments should be excluded. | | |
| **shouldSendEmail** |boolean | ☑️ | Indicates whether email notifications should be sent. | | |
| **created** |Date | ☑️ | Representing a date and time in ISO 8601 format. | | |
| **updated** |Date | ☑️ | Representing a date and time in ISO 8601 format. | | |
| **successRedirectUrl** |string |  | The URL to redirect to on successful payment. | | |
| **failureRedirectUrl** |string |  | The URL to redirect to on payment failure. | | |
| **shouldAuthenticateCreditCard** |boolean |  | Indicates whether credit card authentication is required. | | |
| **currency** |[InvoiceCurrency](InvoiceCurrency.md) |  |  | | |
| **items** |[InvoiceItem[]](InvoiceItem.md) |  | An array of items included in the invoice. | | |
| **fixedVa** |boolean |  | Indicates whether the virtual account is fixed. | | |
| **reminderDate** |Date |  | Representing a date and time in ISO 8601 format. | | |
| **customer** |[CustomerObject](CustomerObject.md) |  |  | | |
| **customerNotificationPreference** |[NotificationPreference](NotificationPreference.md) |  |  | | |
| **fees** |[InvoiceFee[]](InvoiceFee.md) |  | An array of fees associated with the invoice. | | |
| **channelProperties** |[ChannelProperties](ChannelProperties.md) |  |  | | |



[[Back to README]](../../README.md)