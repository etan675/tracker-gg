'use server';

import { AccountDataType, SummonerDataType } from "@/types/api/lol/definitions";


const getAccountData = async (summonerName: string, tag: string): Promise<AccountDataType> => {
    const accountData = await fetch(
        `https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${summonerName}/${tag}`,
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

    return accountData;
}

const getSummonerData = async (puuid: string): Promise<SummonerDataType> => {
    const summonerData = await fetch(
        `https://oc1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`, 
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

    return summonerData;
}

export {
    getAccountData,
    getSummonerData
}