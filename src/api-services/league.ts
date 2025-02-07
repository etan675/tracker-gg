import { apiRegions } from "@/lib/constants";
import { ApiRegion, LeagueEntry } from "@/types/lol/definitions";
import { LeagueSchema } from "./validation/schemas/league-schema";

const getLeagueData = async (summonerId: string, region: ApiRegion): Promise<LeagueEntry[]|null> => {
    const res = await fetch(
        `https://${apiRegions[region].SERVER_CODE}.api.riotgames.com/lol/v/v4/entries/by-summoner/${summonerId}`,
        {
            method: "GET",
            headers: { "X-Riot-Token": process.env.API_KEY ?? '' }
        }
    );

    if (!res.ok) {
        return null;
    }

    const data = await res.json();
    const v =  LeagueSchema.parse(data);

    return v.map(v => ({
        summonerId: v.summonerId,
        queueType: v.queueType,
        tier: v.tier,
        rank: v.rank,
        leaguePoints: v.leaguePoints,
        wins: v.wins,
        losses: v.losses,
    }))
}

export {
    getLeagueData
};