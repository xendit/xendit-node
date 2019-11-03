interface DisbursementItem {
  externalID: string;
  bankCode: string;
  accountHolderName: string;
  accountNumber: string;
  description: string;
  amount: number;
  emailTo?: string[];
  emailCC?: string[];
  emailBCC?: string[];
}

export function create(data: DisbursementItem): Promise<object>;
export function createBatch(data: {
  reference: string;
  disbursements: DisbursementItem[];
  xIdempotencyKey?: string;
}): Promise<object>;
export function getByID(data: { disbursementID: string }): Promise<object>;
export function getByExtID(data: { externalID: string }): Promise<object>;
