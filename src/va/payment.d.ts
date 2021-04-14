export function getVAPayment(data: {
  paymentID: string;
  forUserID?: string;
}): Promise<object>;
