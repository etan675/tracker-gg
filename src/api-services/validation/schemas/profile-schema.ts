import { z } from 'zod';

const AccountSchema = z.object({
    puuid: z.string(),
    gameName: z.string(),
    tagLine: z.string(),
});

const SummonerSchema = z.object({
    id: z.string(),
    puuid: z.string(),
    profileIconId: z.number(),
    summonerLevel: z.number(),
})

export {
    AccountSchema,
    SummonerSchema
}