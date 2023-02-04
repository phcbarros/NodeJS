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
}): Readonly<APIErrorResponseDTO> => {
  return {
    HttpResponseStatusCode: statusCode,
    ErrorMessage: errorMessage,
    ErrorTitle: errorTitle,
  }
}

export class CTry<T> {
  operationFailed: Readonly<boolean>
  error: Readonly<APIErrorResponseDTO>
  data: Readonly<T>

  private constructor(
    operationFailed: boolean,
    data: T,
    error: APIErrorResponseDTO,
  ) {
    this.operationFailed = operationFailed
    this.error = error
    this.data = data
  }

  static success<T>(data: T): CTry<T> {
    return new CTry(false, data, {} as APIErrorResponseDTO)
  }

  static fail<T>(error: APIErrorResponseDTO): CTry<T> {
    return new CTry<T>(true, {} as T, error)
  }

  static fromTry = <T>(operation: CTry<T>): CTry<T> => {
    return operation.operationFailed
      ? new CTry<T>(true, operation.data, operation.error)
      : new CTry<T>(false, operation.data, operation.error)
  }
}
