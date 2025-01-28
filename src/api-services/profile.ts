'use server';

import { AccountDataType, SummonerDataType } from "@/types/api/lol/definitions";

const getAccountData = async (summonerName: string, tag: string): Promise<AccountDataType|null> => {
    const res = await fetch(
        `https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${summonerName}/${tag}`,
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

const getSummonerData = async (puuid: string): Promise<SummonerDataType|null> => {
    const res = await fetch(
        `https://oc1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`, 
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

export {
    getAccountData,
    getSummonerData
}