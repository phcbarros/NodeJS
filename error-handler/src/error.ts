import {HttpStatusCode} from 'axios'

export function createAPIErrorResponseDTO({
  statusCode,
  errorMessage,
  errorTitle,
}: {
  statusCode: HttpStatusCode
  errorMessage: string
  errorTitle: string
}) {
  return {
    HttpResponseStatusCode: statusCode,
    ErrorMessage: errorMessage,
    ErrorTitle: errorTitle,
  } as const
}

export type APIErrorResponseDTO = ReturnType<typeof createAPIErrorResponseDTO>
