import {z} from 'zod'

const PokemonAbilitiesSchema = z.object({
  is_hidden: z.boolean(),
  slot: z.number(),
  ability: z.object({
    name: z.string(),
    url: z.string(),
  }),
})

const CreatePokemonSchema = z.object({
  id: z.number(),
  name: z.string(),
  base_experience: z.number(),
  height: z.number(),
  is_default: z.boolean(),
  order: z.number(),
  weight: z.number(),
  abilities: z.array(PokemonAbilitiesSchema),
})

type PokemonResponse = z.infer<typeof CreatePokemonSchema>

export {CreatePokemonSchema, PokemonResponse}
