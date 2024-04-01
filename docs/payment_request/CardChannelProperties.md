# CardChannelProperties

Card Channel Properties

## Properties

| Name | Type | Required | Description | Examples |
|------------|:-------------:|:-------------:|-------------|:-------------:|
| **skipThreeDSecure** |boolean |  | To indicate whether to perform 3DS during the linking phase | | |
| **successReturnUrl** |string |  | URL where the end-customer is redirected if the authorization is successful | | |
| **failureReturnUrl** |string |  | URL where the end-customer is redirected if the authorization failed | | |
| **cardonfileType** |string |  | Type of “credential-on-file” / “card-on-file” payment being made. Indicate that this payment uses a previously linked Payment Method for charging. | | |
| **merchantIdTag** |string |  | Tag for a Merchant ID that you want to associate this payment with. For merchants using their own MIDs to specify which MID they want to use | | |
| **expiresAt** |Date |  |  | | |



[[Back to README]](../../README.md)