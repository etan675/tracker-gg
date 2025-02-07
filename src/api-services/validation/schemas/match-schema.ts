import { z } from 'zod';

const MatchIdsSchema = z.array(z.string());

const PerkStyleSchema = z.object({
    style: z.number(),
    selections: z.array(z.object({
        perk: z.number()
    }))
});

const PerksSchema = z.object({
    styles: z.tuple([
        PerkStyleSchema,
        PerkStyleSchema
    ]),
});

const ParticipantSchema = z.object({
    puuid: z.string(),
    riotIdGameName: z.string(),
    riotIdTagline: z.string(),
    profileIcon: z.number(),
    championName: z.string(),
    championId: z.number(),
    lane: z.string(),
    role: z.string(),
    teamId: z.number(),
    item0: z.number(),
    item1: z.number(),
    item2: z.number(),
    item3: z.number(),
    item4: z.number(),
    item5: z.number(),
    item6: z.number(),
    kills: z.number(),
    deaths: z.number(),
    assists: z.number(),
    win: z.boolean(),
    totalDamageDealtToChampions: z.number(),
    totalMinionsKilled: z.number(),
    neutralMinionsKilled: z.number(),
    goldEarned: z.number(),
    summoner1Id: z.number(),
    summoner2Id: z.number(),
    teamEarlySurrendered: z.boolean(),
    perks: PerksSchema
});

const MatchSchema = z.object({
    metadata: z.object({
        matchId: z.string(),
    }),
    info: z.object({
        gameDuration: z.number(),
        queueId: z.number(),
        gameStartTimestamp: z.number(),
        participants: z.array(ParticipantSchema)
    })
})

export {
    MatchIdsSchema,
    MatchSchema,
}