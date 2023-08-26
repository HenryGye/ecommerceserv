export interface Result<T> {
  success: boolean,
  data: ApiData<T>,
}

export interface ApiData<T> {
  data?: T | null,
  code?: number,
  errorCode?: number,
  externalTransactionId: string,
  internalTransactionId: string,
  message: string,
}