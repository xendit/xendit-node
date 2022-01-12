interface OnlineBankingAccessProperties {
  successRedirectURL: string;
  failureRedirectURL: string;
  cancelRedirectURL?: string;
  callbackURL: string;
  metadata?: object;
}

export function initializeTokenization(data: {
  customerID: string;
  channelCode: ChannelCode;
  properties?: OnlineBankingAccessProperties;
  metadata?: object;
}): Promise<object>;

export function unlinkTokenization(data: {
  linkedAccTokenID: string;
}): Promise<object>;
