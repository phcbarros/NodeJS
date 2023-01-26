import axios, {AxiosError, HttpStatusCode} from 'axios'
import {Pokemon, PokemonSchema} from './schemas'
import {failTryHandler, successTryHandler} from './workflow'
import {
  APIErrorResponseDTO,
  TryHandler,
  createAPIErrorResponseDTO,
} from './workflowWithClass'

export async function getPokemonById(id: string) {
  try {
    const {data} = await axios.get<Pokemon>(
      `https://pokeapi.co/api/v2/pokemon/${id}`,
    )

    return TryHandler.success<Pokemon>(PokemonSchema.parse(data))
  } catch (error) {
    const errorResponse = createAPIErrorResponseDTO({
      errorMessage: 'Error',
      errorTitle: 'Erro API Pokémon',
      statusCode: HttpStatusCode.BadRequest,
    })
    return TryHandler.fail<APIErrorResponseDTO>(errorResponse)
  }
}

export async function getPokemonByName(name: string) {
  try {
    const {data} = await axios.get<Pokemon>(
      `https://pokeapi.co/api/v2/pokemon/${name}`,
    )

    return successTryHandler<Pokemon>(PokemonSchema.parse(data))
  } catch (error) {
    let statusCode = HttpStatusCode.BadRequest

    if (error instanceof AxiosError) {
      statusCode =
        error.response?.status == 404
          ? HttpStatusCode.NotFound
          : HttpStatusCode.BadRequest

      const errorResponse = createAPIErrorResponseDTO({
        errorMessage: 'Pokemon not found',
        errorTitle: 'Erro API Pokémon',
        statusCode: statusCode,
      })
      return failTryHandler<APIErrorResponseDTO>(errorResponse)
    }

    const errorResponse = createAPIErrorResponseDTO({
      errorMessage: 'Error',
      errorTitle: 'Erro API Pokémon',
      statusCode: statusCode,
    })
    return failTryHandler<APIErrorResponseDTO>(errorResponse)
  }
}
