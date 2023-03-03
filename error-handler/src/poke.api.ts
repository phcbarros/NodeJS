import axios, {HttpStatusCode} from 'axios'
import {Pokemon, PokemonSchema} from './schemas'
import * as E from 'fp-ts/Either'
import {createAPIErrorResponseDTO} from './error'

export async function getPokemonById(id: string) {
  try {
    const {data} = await axios.get<Pokemon>(
      `https://pokeapi.co/api/v2/pokemon/${id}`,
    )

    return E.right(PokemonSchema.parse(data))
  } catch (error) {
    const errorResponse = createAPIErrorResponseDTO({
      errorMessage: 'Error',
      errorTitle: 'Erro API Pokémon',
      statusCode: HttpStatusCode.BadRequest,
    })
    return E.left(errorResponse)
  }
}

export async function getPokemonByName(name: string) {
  try {
    const {data} = await axios.get<Pokemon>(
      `https://pokeapi.co/api/v2/pokemon/${name}`,
    )

    return E.right(PokemonSchema.parse(data))
  } catch (error) {
    const errorResponse = createAPIErrorResponseDTO({
      errorMessage: 'Error',
      errorTitle: 'Erro API Pokémon',
      statusCode: HttpStatusCode.BadRequest,
    })
    return E.left(errorResponse)
  }
}
