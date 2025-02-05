import { MatchData } from "@/types/api/lol/definitions";
import { adaptMatchData } from "./data-adapters/adapters";

const getPlayerMatchIds = async (puuid: string): Promise<string[]|null> => {
    // last 20 matches
    const res = await fetch(
        `https://sea.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20`,
        {
            method: "GET",
            headers: { "X-Riot-Token": process.env.API_KEY ?? '' }
        }
    );

    if (!res.ok) {
        return null;
    }

    return await res.json();
}

const getMatchData = async (matchId: string): Promise<MatchData|null> => {
    const res = await fetch(
        `https://sea.api.riotgames.com/lol/match/v5/matches/${matchId}`,
        {
            method: "GET",
            headers: { "X-Riot-Token": process.env.API_KEY ?? '' }
        }
    );

    if (!res.ok) {
        return null;
    }

    const data = await res.json();
    return adaptMatchData(data);
}

export {
    getPlayerMatchIds,
    getMatchData
}
