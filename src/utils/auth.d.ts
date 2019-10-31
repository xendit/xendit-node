export function basicAuthHeader(key: string): string;
export function basicHeaderWithIdempotencyKey(
  secretKey,
  xIdempotencyKey,
): {
  Authorization: string;
  'Content-Type': string;
  'X-IDEMPOTENCY-KEY'?: string;
};
