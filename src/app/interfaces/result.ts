export interface Result<T> {
  success: boolean,
  data: DataResponse<T>,
}

export interface DataResponse<T> {
  data?: T | null,
  code?: number,
  errorCode?: number,
  externalTransactionId: string,
  internalTransactionId: string,
  message: string,
}