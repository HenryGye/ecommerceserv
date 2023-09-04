export interface Result<T> {
  success: boolean,
  data: T | null,
  code: number | null,
  errorCode: number | null,
  externalTransactionId: string,
  internalTransactionId: string,
  message: string,
}