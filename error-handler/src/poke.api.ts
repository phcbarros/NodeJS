import axios, {HttpStatusCode} from 'axios'
import {Pokemon, PokemonSchema} from './schemas'
import {Try} from './workflow'
import {createAPIErrorResponseDTO, CTry} from './workflowWithClass'

// using class CTry
export async function getPokemonById(id: string) {
  try {
    const {data} = await axios.get<Pokemon>(
      `https://pokeapi.co/api/v2/pokemon/${id}`,
    )

    return CTry.success<Pokemon>(PokemonSchema.parse(data))
  } catch (error) {
    const errorResponse = createAPIErrorResponseDTO({
      errorMessage: 'Error',
      errorTitle: 'Erro API Pokémon',
      statusCode: HttpStatusCode.BadRequest,
    })
    return CTry.fail<Pokemon>(errorResponse)
  }
}

// using functional way

export async function getPokemonByName(name: string) {
  try {
    const {data} = await axios.get<Pokemon>(
      `https://pokeapi.co/api/v2/pokemon/${name}`,
    )

    return Try.success<Pokemon>(PokemonSchema.parse(data))
  } catch (error) {
    const errorResponse = createAPIErrorResponseDTO({
      errorMessage: 'Error',
      errorTitle: 'Erro API Pokémon',
      statusCode: HttpStatusCode.BadRequest,
    })
    return Try.fail<Pokemon>(errorResponse)
  }
}
