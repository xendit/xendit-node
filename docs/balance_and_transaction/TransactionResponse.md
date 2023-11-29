# TransactionResponse



## Properties

| Name | Type | Required | Description | Examples |
|------------|:-------------:|:-------------:|-------------|:-------------:|
| **id** |string | ☑️ | The unique id of a transaction. It will have &#x60;txn_&#x60; as prefix | | |
| **productId** |string | ☑️ | The product_id of the transaction. Product id will have a different prefix for each product. You can use this id to match the transaction from this API to each product API. | | |
| **type** |[TransactionResponseType](TransactionResponseType.md) | ☑️ |  | | |
| **status** |[TransactionStatuses](TransactionStatuses.md) | ☑️ |  | | |
| **channelCategory** |[ChannelsCategories](ChannelsCategories.md) | ☑️ |  | | |
| **channelCode** |string | ☑️ | The channel of the transaction that is used. See [channel codes](https://docs.xendit.co/xendisburse/channel-codes) for the list of available per channel categories. | | |
| **accountIdentifier** |string | ☑️ | Account identifier of transaction. The format will be different from each channel. | | |
| **referenceId** |string | ☑️ | customer supplied reference/external_id | | |
| **currency** |[Currency](Currency.md) | ☑️ |  | | |
| **amount** |number | ☑️ | The transaction amount. The number of decimal places will be different for each currency according to ISO 4217. | | |
| **cashflow** |string | ☑️ | Representing whether the transaction is money in or money out For transfer, the transfer out side it will shows up as money out and on transfer in side in will shows up as money-in. Available values are &#x60;MONEY_IN&#x60; for money in and &#x60;MONEY_OUT&#x60; for money out. | | |
| **settlementStatus** |string |  | The settlement status of the transaction. &#x60;PENDING&#x60; - Transaction amount has not been settled to merchant\&#39;s balance. &#x60;SETTLED&#x60; - Transaction has been settled to merchant\&#39;s balance | | |
| **estimatedSettlementTime** |Date |  | Estimated settlement time will only apply to money-in transactions. For money-out transaction, the value will be &#x60;NULL&#x60;. Estimated settlement time in which transaction amount will be settled to merchant\&#39;s balance. | | |
| **businessId** |string | ☑️ | The id of business where this transaction belong to | | |
| **fee** |[FeeResponse](FeeResponse.md) | ☑️ |  | | |
| **created** |Date | ☑️ | Transaction created timestamp (UTC+0) | | |
| **updated** |Date | ☑️ | Transaction updated timestamp (UTC+0) | | |



[[Back to README]](../../README.md)