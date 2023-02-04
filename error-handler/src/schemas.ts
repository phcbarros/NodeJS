import {z} from 'zod'

const PokemonSchema = z.object({
  id: z.number(),
  name: z.string(),
  base_experience: z.number(),
  height: z.number(),
  is_default: z.boolean(),
  order: z.number(),
  weight: z.number(),
})

type Pokemon = z.infer<typeof PokemonSchema>

const PokemonRequestByIdSchema = z.object({
  id: z.string().regex(/^[\d]*$/),
})

const PokemonRequestByNameSchema = z.object({
  name: z.string().regex(/^[a-zA-Z]/),
})

export {
  PokemonSchema,
  Pokemon,
  PokemonRequestByIdSchema,
  PokemonRequestByNameSchema,
}
