'use server';

import { LeagueEntryType } from "@/types/api/lol/definitions";

const getLeagueData = async (summonerId: string): Promise<LeagueEntryType[]> => {
    const res = await fetch(
        `https://oc1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}`,
        {
            method: "GET",
            headers: { "X-Riot-Token": process.env.API_KEY ?? '' }
        }
    );

    if (!res.ok) {
        return [];
    }

    return await res.json();
}

export {
    getLeagueData
};