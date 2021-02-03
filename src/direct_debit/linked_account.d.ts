enum ChannelCode {
  DC_BRI = 'DC_BRI',
  BA_BPI = 'BA_BPI',
}

interface DebitCardProperties {
  accountMobileNumber: string;
  cardLastFour: number;
  cardExpiry: string;
  accountEmail: string;
}

interface OnlineBankingAccessProperties {
  successRedirectURL: string;
  failureRedirectURL?: string;
  callbackURL?: string;
}

export function initializeTokenization(data: {
  customerID: string;
  channelCode: ChannelCode;
  properties?: DebitCardProperties | OnlineBankingAccessProperties;
  metadata?: object;
}): Promise<object>;

export function validateOTPforLinkedAccount(data: {
  tokenID: string;
  otpCode: string;
}): Promise<object>;

export function retrieveAccountsByTokenID(data: {
  tokenID: string;
}): Promise<object>;
