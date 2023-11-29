# IdentityAccountResponseProperties



## Properties

| Name | Type | Required | Description | Examples |
|------------|:-------------:|:-------------:|-------------|:-------------:|
| **accountNumber** |string |  | Unique account identifier as per the bank records. | | |
| **accountHolderName** |string |  | Name of account holder as per the cardless credit account. | | |
| **swiftCode** |string |  | The SWIFT code for international payments | | |
| **accountType** |string |  | Free text account type, e.g., Savings, Transaction, Virtual Account. | | |
| **accountDetails** |string |  | Potentially masked account detail, for display purposes only. | | |
| **currency** |string |  |  | | |
| **tokenId** |string |  | The token id returned in tokenisation | | |
| **paymentCode** |string |  | Complete fixed payment code (including prefix) | | |
| **expiresAt** |string |  | YYYY-MM-DD string with expiry date for the payment code | | |
| **qrString** |string |  | String representation of the QR Code image | | |
| **accountId** |string |  | Alphanumeric string identifying this account. Usually an email address or phone number. | | |



[[Back to README]](../../README.md)