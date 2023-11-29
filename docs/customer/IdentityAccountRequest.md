# IdentityAccountRequest



## Properties

| Name | Type | Required | Description | Examples |
|------------|:-------------:|:-------------:|-------------|:-------------:|
| **type** |[IdentityAccountType](IdentityAccountType.md) |  |  | | |
| **company** |string |  | The issuing institution associated with the account (e.g., OCBC, GOPAY, 7-11). If adding financial accounts that Xendit supports, we recommend you use the channel_name found at https://xendit.github.io/apireference/#payment-channels for this field | | |
| **description** |string |  | Free text description of this account | | |
| **country** |string |  | ISO3166-2 country code | | |
| **properties** |[IdentityAccountRequestProperties](IdentityAccountRequestProperties.md) |  |  | | |



[[Back to README]](../../README.md)