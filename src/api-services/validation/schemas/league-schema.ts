import { z } from 'zod';

const LeagueSchema = z.array(z.object({
    summonerId: z.string(),
    queueType: z.string(),
    tier: z.string(),
    rank: z.string(),
    leaguePoints: z.number(),
    wins: z.number(),
    losses: z.number()
}));

export {
    LeagueSchema
}