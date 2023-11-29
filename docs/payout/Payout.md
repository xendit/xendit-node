# Payout



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
| **id** |string | ☑️ | Xendit-generated unique identifier for each payout | | |
| **created** |Date | ☑️ | The time payout was created on Xendit\&#39;s system, in ISO 8601 format | | |
| **updated** |Date | ☑️ | The time payout was last updated on Xendit\&#39;s system, in ISO 8601 format | | |
| **businessId** |string | ☑️ | Xendit Business ID | | |
| **status** |string | ☑️ | Status of payout | | |
| **failureCode** |string |  | If the Payout failed, we include a failure code for more details on the failure. | | |
| **estimatedArrivalTime** |Date |  | Our estimated time on to when your payout is reflected to the destination account | | |



[[Back to README]](../../README.md)