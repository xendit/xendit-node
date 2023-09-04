# PaymentChannel



## Properties

| Name | Type | Required | Description |
| ------------ | ------------- | ------------- | ------------- |
| **channelCode** | string |  | The specific Xendit code used to identify the partner channel |
**type** | string |  | The payment method type |
**country** | string |  | The country where the channel operates  in ISO 3166-2 country code |
**channelName** | string |  | Official parter name of the payment channel |
**channelProperties** | [[]ChannelProperty](ChannelProperty.md) |  |  |
**logoUrl** | string |  | If available, this contains a URL to the logo of the partner channel |
**amountLimits** | [[]ChannelAmountLimits](ChannelAmountLimits.md) |  |  |


