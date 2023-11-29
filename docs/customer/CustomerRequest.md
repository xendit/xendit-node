# CustomerRequest



## Properties

| Name | Type | Required | Description | Examples |
|------------|:-------------:|:-------------:|-------------|:-------------:|
| **clientName** |string |  | Entity\&#39;s name for this client | | |
| **referenceId** |string | ☑️ | Merchant\&#39;s reference of this end customer, eg Merchant\&#39;s user\&#39;s id. Must be unique. | | |
| **type** |string |  |  | | |
| **individualDetail** |[IndividualDetail](IndividualDetail.md) |  |  | | |
| **businessDetail** |[BusinessDetail](BusinessDetail.md) |  |  | | |
| **description** |string |  |  | | |
| **email** |string |  |  | | |
| **mobileNumber** |string |  |  | | |
| **phoneNumber** |string |  |  | | |
| **addresses** |[AddressRequest[]](AddressRequest.md) |  |  | | |
| **identityAccounts** |[IdentityAccountRequest[]](IdentityAccountRequest.md) |  |  | | |
| **kycDocuments** |[KYCDocumentRequest[]](KYCDocumentRequest.md) |  |  | | |
| **metadata** |object |  |  | | |



[[Back to README]](../../README.md)