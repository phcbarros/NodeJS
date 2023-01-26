import {z} from 'zod'

const PokemonAbilitiesSchema = z.object({
  is_hidden: z.boolean(),
  slot: z.number(),
  ability: z.object({
    name: z.string(),
    url: z.string(),
  }),
})

const PokemonSchema = z.object({
  id: z.number(),
  name: z.string(),
  base_experience: z.number(),
  height: z.number(),
  is_default: z.boolean(),
  order: z.number(),
  weight: z.number(),
  abilities: z.array(PokemonAbilitiesSchema),
})

type Pokemon = z.infer<typeof PokemonSchema>

const PokemonRequestByIdSchema = z.object({
  id: z.string().length(4).regex(new RegExp('^[0-9]*$')),
})

const PokemonRequestByNameSchema = z.object({
  name: z.string().regex(new RegExp('^[a-zA-Z]')),
})

export {
  PokemonSchema,
  Pokemon,
  PokemonRequestByIdSchema,
  PokemonRequestByNameSchema,
}
