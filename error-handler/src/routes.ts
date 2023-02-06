import {Router} from 'express'
import {getPokemonById, getPokemonByName} from './poke.api'
import {
  Pokemon,
  PokemonRequestByIdSchema,
  PokemonRequestByNameSchema,
} from './schemas'
import {Try} from './workflow'
import {CTry} from './workflowWithClass'

export function getRoutes() {
  const router = Router()

  router.route('/:id').get(async (req, res) => {
    const result = PokemonRequestByIdSchema.safeParse(req.params)

    if (!result.success) {
      return res.sendStatus(400)
    }

    const {data, error, operationFailed} = CTry.fromTry<Pokemon>(
      await getPokemonById(result.data.id),
    )

    if (operationFailed) {
      return res.status(error.HttpResponseStatusCode).send(error)
    }

    return res.send(data)
  })

  router.route('/name/:name').get(async (req, res) => {
    const result = PokemonRequestByNameSchema.safeParse(req.params)

    if (!result.success) {
      return res.status(400).send(result)
    }

    const {data, error, operationFailed} = Try.from<Pokemon>(
      await getPokemonByName(req.params.name),
    )

    if (operationFailed) {
      return res.status(error!.HttpResponseStatusCode).send(error)
    }

    return res.send(data)
  })

  router.route('/delayed/delay').get(async (_, res) => {
    const SECONDS_DELAY = 6000
    await new Promise<void>((resolve) => {
      setTimeout(() => resolve(), SECONDS_DELAY)
    })

    return res.send({hello: 'delayed world'})
  })

  return router
}
