import {Router} from 'express'
import {getPokemonById, getPokemonByName} from './poke.api'
import {PokemonRequestByIdSchema, PokemonRequestByNameSchema} from './schemas'

export function getRoutes() {
  const router = Router()

  router.route('/:id').get(async (req, res) => {
    const result = PokemonRequestByIdSchema.safeParse(req.params)

    if (!result.success) {
      return res.sendStatus(400)
    }

    const {data, errorMessage, operationFailed} = await getPokemonById(
      result.data.id,
    )

    if (operationFailed) {
      return res.status(errorMessage!.HttpResponseStatusCode).send(errorMessage)
    }

    return res.send(data)
  })

  router.route('/name/:name').get(async (req, res) => {
    const result = PokemonRequestByNameSchema.safeParse(req.params)

    if (!result.success) {
      return res.status(400).send(result)
    }

    const {data, errorMessage, operationFailed} = await getPokemonByName(
      req.params.name,
    )

    if (operationFailed) {
      return res.status(errorMessage!.HttpResponseStatusCode).send(errorMessage)
    }

    return res.send(data)
  })

  return router
}
