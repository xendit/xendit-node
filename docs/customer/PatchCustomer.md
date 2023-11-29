# PatchCustomer



## Properties

| Name | Type | Required | Description | Examples |
|------------|:-------------:|:-------------:|-------------|:-------------:|
| **clientName** |string |  | Entity\&#39;s name for this client | | |
| **referenceId** |string |  | Merchant\&#39;s reference of this end customer, eg Merchant\&#39;s user\&#39;s id. Must be unique. | | |
| **individualDetail** |[IndividualDetail](IndividualDetail.md) |  |  | | |
| **businessDetail** |[BusinessDetail](BusinessDetail.md) |  |  | | |
| **description** |string |  |  | | |
| **email** |string |  |  | | |
| **mobileNumber** |string |  |  | | |
| **phoneNumber** |string |  |  | | |
| **metadata** |object |  |  | | |
| **addresses** |[AddressRequest[]](AddressRequest.md) |  |  | | |
| **identityAccounts** |[IdentityAccountRequest[]](IdentityAccountRequest.md) |  |  | | |
| **kycDocuments** |[KYCDocumentRequest[]](KYCDocumentRequest.md) |  |  | | |
| **status** |[EndCustomerStatus](EndCustomerStatus.md) |  |  | | |



[[Back to README]](../../README.md)