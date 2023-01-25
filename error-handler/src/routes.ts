import axios from 'axios'
import {Router} from 'express'
import {CreatePokemonSchema, PokemonResponse} from './schemas'

export function getRoutes() {
  const router = Router()

  router.route('/').get(async (req, res) => {
    const {data} = await axios.get<PokemonResponse>(
      'https://pokeapi.co/api/v2/pokemon/1',
    )

    const PokémonResult = CreatePokemonSchema.safeParse(data)
    console.log('p', PokémonResult)

    return res.send(PokémonResult)
  })

  return router
}
