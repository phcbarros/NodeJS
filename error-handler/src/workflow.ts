import {APIErrorResponseDTO} from './workflowWithClass'

interface TryHandler<T> {
  operationFailed: boolean
  errorMessage: APIErrorResponseDTO | null
  data: T | null
}

const createTryHandler = <T>(
  operationFailed: boolean,
  data: T | null,
  errorMessage: APIErrorResponseDTO | null = null,
): TryHandler<T> => {
  return {operationFailed, errorMessage, data}
}

export const successTryHandler = <T>(data: T): TryHandler<T> => {
  return createTryHandler<T>(false, data)
}

export const failTryHandler = <T>(
  errorMessage: APIErrorResponseDTO,
): TryHandler<T> => {
  return createTryHandler<T>(true, null, errorMessage)
}
