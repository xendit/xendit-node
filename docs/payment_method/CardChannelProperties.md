# CardChannelProperties

Card Channel Properties

## Properties

| Name | Type | Required | Description | Examples |
|------------|:-------------:|:-------------:|-------------|:-------------:|
| **skipThreeDSecure** |boolean |  | This field value is only being used for reusability &#x3D; MULTIPLE_USE. To indicate whether to perform 3DS during the linking phase. Defaults to false. | | |
| **successReturnUrl** |string |  | URL where the end-customer is redirected if the authorization is successful | | |
| **failureReturnUrl** |string |  | URL where the end-customer is redirected if the authorization failed | | |
| **cardonfileType** |string |  | Type of “credential-on-file” / “card-on-file” payment being made. Indicate that this payment uses a previously linked Payment Method for charging. | | |
| **expiresAt** |Date |  |  | | |
| **installmentConfiguration** |[CardInstallmentConfiguration](CardInstallmentConfiguration.md) |  |  | | |
| **merchantIdTag** |string |  | Tag for a Merchant ID that you want to associate this payment with. For merchants using their own MIDs to specify which MID they want to use | | |



[[Back to README]](../../README.md)