'use server';

import { LeagueEntryType } from "@/types/api/lol/definitions";

const getLeagueData = async (summonerId: string): Promise<LeagueEntryType[]> => {
    const leagueData = await fetch(
        `https://oc1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}`,
        {
            method: "GET",
            headers: { "X-Riot-Token": process.env.API_KEY ?? '' }
        }
    ).then(response => {
        if (!response.ok) {
            return null;
        }

        return response.json();
    });

    return leagueData;
}

export {
    getLeagueData
};