# CreatePayoutRequest

Information needed by Xendit to send money to the destination channel provided

## Properties

| Name | Type | Required | Description | Examples |
|------------|:-------------:|:-------------:|-------------|:-------------:|
| **referenceId** |string | ☑️ | A client defined payout identifier | | |
| **channelCode** |string | ☑️ | Channel code of selected destination bank or e-wallet | | |
| **channelProperties** |[DigitalPayoutChannelProperties](DigitalPayoutChannelProperties.md) | ☑️ |  | | |
| **amount** |number | ☑️ | Amount to be sent to the destination account and should be a multiple of the minimum increment for the selected channel | | |
| **description** |string |  | Description to send with the payout, the recipient may see this e.g., in their bank statement (if supported) or in email receipts we send on your behalf | | |
| **currency** |string | ☑️ | Currency of the destination channel using ISO-4217 currency code | | |
| **receiptNotification** |[ReceiptNotification](ReceiptNotification.md) |  |  | | |
| **metadata** |object |  | Object of additional information you may use | | |



[[Back to README]](../../README.md)