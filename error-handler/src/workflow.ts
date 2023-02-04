import {APIErrorResponseDTO} from './workflowWithClass'

export interface Try<T> {
  operationFailed: Readonly<boolean>
  error: Readonly<APIErrorResponseDTO>
  data: Readonly<T>
}

function createTry<T>(
  operationFailed: boolean,
  data: T,
  error: APIErrorResponseDTO,
): Try<T> {
  return {operationFailed, error, data}
}

export const successTry = <T>(data: T): Try<T> => {
  return createTry<T>(false, data, {} as APIErrorResponseDTO)
}

export const failTry = <T>(errorMessage: APIErrorResponseDTO): Try<T> => {
  return createTry<T>(true, {} as T, errorMessage)
}

export const fromTry = <T>(operation: Try<T>): Try<T> => {
  return operation.operationFailed
    ? createTry<T>(true, operation.data, operation.error)
    : createTry<T>(false, operation.data, operation.error)
}
