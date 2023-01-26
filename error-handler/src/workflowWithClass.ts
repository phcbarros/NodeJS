import {HttpStatusCode} from 'axios'

export interface APIErrorResponseDTO {
  HttpResponseStatusCode: HttpStatusCode
  ErrorMessage: string
  ErrorTitle: string
}

export const createAPIErrorResponseDTO = ({
  statusCode,
  errorMessage,
  errorTitle,
}: {
  statusCode: HttpStatusCode
  errorMessage: string
  errorTitle: string
}): APIErrorResponseDTO => {
  return {
    HttpResponseStatusCode: statusCode,
    ErrorMessage: errorMessage,
    ErrorTitle: errorTitle,
  }
}

export class TryHandler<T> {
  operationFailed: boolean
  errorMessage: APIErrorResponseDTO | null
  data: T | null

  private constructor(
    operationFailed: boolean,
    data: T | null,
    errorMessage: APIErrorResponseDTO | null = null,
  ) {
    this.operationFailed = operationFailed
    this.errorMessage = errorMessage
    this.data = data
  }

  static success<T>(data: T): TryHandler<T> {
    return new TryHandler(false, data)
  }

  static fail<T>(errorMessage: APIErrorResponseDTO): TryHandler<T> {
    return new TryHandler<T>(true, null, errorMessage)
  }
}
