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

const success = <T>(data: T): Try<T> => {
  return createTry<T>(false, data, {} as APIErrorResponseDTO)
}

const fail = <T>(errorMessage: APIErrorResponseDTO): Try<T> => {
  return createTry<T>(true, {} as T, errorMessage)
}

const from = <T>(operation: Try<T>): Try<T> => {
  return operation.operationFailed
    ? createTry<T>(true, operation.data, operation.error)
    : createTry<T>(false, operation.data, operation.error)
}

export const Try = {
  success,
  fail,
  from,
} as const
