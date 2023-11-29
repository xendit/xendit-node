# Customer



## Properties

| Name | Type | Required | Description | Examples |
|------------|:-------------:|:-------------:|-------------|:-------------:|
| **type** |string | ☑️ |  | | |
| **referenceId** |string | ☑️ | Merchant\&#39;s reference of this end customer, eg Merchant\&#39;s user\&#39;s id. Must be unique. | | |
| **individualDetail** |[IndividualDetail](IndividualDetail.md) | ☑️ |  | | |
| **businessDetail** |[BusinessDetail](BusinessDetail.md) | ☑️ |  | | |
| **description** |string | ☑️ |  | | |
| **email** |string | ☑️ |  | | |
| **mobileNumber** |string | ☑️ |  | | |
| **phoneNumber** |string | ☑️ |  | | |
| **addresses** |[Address[]](Address.md) | ☑️ |  | | |
| **identityAccounts** |[IdentityAccountResponse[]](IdentityAccountResponse.md) | ☑️ |  | | |
| **kycDocuments** |[KYCDocumentResponse[]](KYCDocumentResponse.md) | ☑️ |  | | |
| **metadata** |object | ☑️ |  | | |
| **status** |[EndCustomerStatus](EndCustomerStatus.md) |  |  | | |
| **id** |string | ☑️ |  | | |
| **created** |Date | ☑️ |  | | |
| **updated** |Date | ☑️ |  | | |



[[Back to README]](../../README.md)