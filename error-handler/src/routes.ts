import {Router} from 'express'
import {isLeft} from 'fp-ts/lib/Either'
import {getPokemonById, getPokemonByName} from './poke.api'
import {
  Pokemon,
  PokemonRequestByIdSchema,
  PokemonRequestByNameSchema,
} from './schemas'

export function getRoutes() {
  const router = Router()

  router.route('/:id').get(async (req, res) => {
    const result = PokemonRequestByIdSchema.safeParse(req.params)

    if (!result.success) {
      return res.sendStatus(400)
    }

    const getPokemonByIdResult = await getPokemonById(result.data.id)

    if (isLeft(getPokemonByIdResult)) {
      return res
        .status(getPokemonByIdResult.left.HttpResponseStatusCode)
        .send(getPokemonByIdResult.left)
    }

    return res.send(getPokemonByIdResult.right)
  })

  router.route('/name/:name').get(async (req, res) => {
    const result = PokemonRequestByNameSchema.safeParse(req.params)

    if (!result.success) {
      return res.status(400).send(result)
    }

    const getPokemonByNameResult = await getPokemonByName(result.data.name)

    if (isLeft(getPokemonByNameResult)) {
      return res
        .status(getPokemonByNameResult.left.HttpResponseStatusCode)
        .send(getPokemonByNameResult.left)
    }

    return res.send(getPokemonByNameResult.right)
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
