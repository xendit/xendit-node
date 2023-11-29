# TransactionsResponse

Returns an array of Transaction Objects. Returns empty array when there is no result.

## Properties

| Name | Type | Required | Description | Examples |
|------------|:-------------:|:-------------:|-------------|:-------------:|
| **hasMore** |boolean | ☑️ | Indicates whether there are more items to be queried with &#x60;after_id&#x60; of the last item from the current result. Use the &#x60;links&#x60; to follow to the next result. | | |
| **links** |[LinkItem[]](LinkItem.md) |  | The links to the next page based on LinkItem if there is next result. | | |
| **data** |[TransactionResponse[]](TransactionResponse.md) | ☑️ |  | | |



[[Back to README]](../../README.md)