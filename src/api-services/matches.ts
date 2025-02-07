import { ApiRegion, MatchData } from "@/types/lol/definitions";
import { adaptMatchData } from "./data-adapters/adapters";
import { apiRegions } from "@/lib/constants";
import { MatchIdsSchema, MatchSchema } from "./validation/schemas/match-schema";

// match api for some regions in asia require routing to the south east asia (sea) servers.
// refer to https://developer.riotgames.com/apis#match-v5/GET_getMatch

const getPlayerMatchIds = async (puuid: string, region: ApiRegion): Promise<string[]|null> => {
    const area = SEA_REGIONS.has(region) ? 'sea' : apiRegions[region].AREA;
    // last 20 matches
    const res = await fetch(
        `https://${area}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20`,
        {
            method: "GET",
            headers: { "X-Riot-Token": process.env.API_KEY ?? '' }
        }
    );

    if (!res.ok) {
        return null;
    }
    
    const data = await res.json();
    return MatchIdsSchema.parse(data);
}

const getMatchData = async (matchId: string, region: ApiRegion): Promise<MatchData|null> => {
    const area = SEA_REGIONS.has(region) ? 'sea' : apiRegions[region].AREA;

    const res = await fetch(
        `https://${area}.api.riotgames.com/lol/match/v5/matches/${matchId}`,
        {
            method: "GET",
            headers: { "X-Riot-Token": process.env.API_KEY ?? '' }
        }
    );

    if (!res.ok) {
        return null;
    }

    const data = await res.json();
    const v = MatchSchema.parse(data);
    return adaptMatchData(v);
}

const SEA_REGIONS = new Set(['OCE']);

export {
    getPlayerMatchIds,
    getMatchData
}
