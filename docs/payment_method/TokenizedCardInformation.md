# TokenizedCardInformation

Tokenized Card Information

## Properties

| Name | Type | Required | Description | Examples |
|------------|:-------------:|:-------------:|-------------|:-------------:|
| **tokenId** |string |  |  | | |
| **maskedCardNumber** |string |  | 1st 6 and last 4 digits of the card | | |
| **cardholderName** |string |  | Cardholder name is optional but recommended for 3DS 2 / AVS verification | | |
| **expiryMonth** |string |  | Card expiry month in MM format | | |
| **expiryYear** |string |  | Card expiry month in YY format | | |
| **fingerprint** |string |  | Xendit-generated identifier for the unique card number. Multiple payment method objects can be created for the same account - e.g. if the user first creates a one-time payment request, and then later on creates a multiple-use payment method using the same account.   The fingerprint helps to identify the unique account being used. | | |
| **type** |string |  | Whether the card is a credit or debit card | | |
| **network** |string |  | Card network - VISA, MASTERCARD, JCB, AMEX, DISCOVER, BCA | | |
| **country** |string |  | Country where the card was issued ISO 3166-1 Alpha-2 | | |
| **issuer** |string |  | Issuer of the card, most often an issuing bank For example, “BCA”, “MANDIRI” | | |
| **cardNumber** |string |  |  | | |
| **oneTimeToken** |string |  |  | | |



[[Back to README]](../../README.md)