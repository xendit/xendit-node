# VirtualAccountChannelProperties

Virtual Account Channel Properties

## Properties

| Name | Type | Required | Description | Examples |
|------------|:-------------:|:-------------:|-------------|:-------------:|
| **customerName** |string |  | Name of customer. | | |
| **virtualAccountNumber** |string |  | You can assign specific Virtual Account number using this parameter. If you do not send one, one will be picked at random. Make sure the number you specify is within your Virtual Account range. | | |
| **expiresAt** |Date |  | The date and time in ISO 8601 UTC+0 when the virtual account number will be expired. Default: The default expiration date will be 31 years from creation date. | | |
| **suggestedAmount** |number |  | The suggested amount you want to assign. Note: Suggested amounts is the amounts that can see as a suggestion, but user can still put any numbers (only supported for Mandiri and BRI) | | |



[[Back to README]](../../README.md)