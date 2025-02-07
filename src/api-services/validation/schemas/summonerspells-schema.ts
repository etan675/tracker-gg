import { z } from 'zod';

const SummonerSpellSchema = z.object({
    id: z.number(),
    name: z.string(),
    iconPath: z.string(),
});

const SummonerSpellsSchema = z.array(SummonerSpellSchema);

export {
    SummonerSpellsSchema,
    SummonerSpellSchema
}