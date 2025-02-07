import { apiRegions } from "@/lib/constants";
import { ApiRegion, LeagueEntry } from "@/types/api/lol/definitions";

const getLeagueData = async (summonerId: string, region: ApiRegion): Promise<LeagueEntry[]> => {
    const res = await fetch(
        `https://${apiRegions[region].SERVER_CODE}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}`,
        {
            method: "GET",
            headers: { "X-Riot-Token": process.env.API_KEY ?? '' }
        }
    );

    if (!res.ok) {
        return [];
    }

    const data: Record<string, any>[] = await res.json();
    return data.map((entry) => ({
        summonerId: entry.summonerId,
        queueType: entry.queueType,
        tier: entry.tier,
        rank: entry.rank,
        leaguePoints: entry.leaguePoints,
        wins: entry.wins,
        losses: entry.losses
    }));
}

export {
    getLeagueData
};