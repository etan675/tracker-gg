import { accountDataType, leagueEntryType, summonerDataType } from "../types";

const getAccountData = async (summonerName: string, tag: string): Promise<accountDataType> => {
    const accountData = await fetch(
        `https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${summonerName}/${tag}`,
        {
            method: "GET",
            headers: { "X-Riot-Token": process.env.API_KEY ?? '' }
        }
    ).then(response => response.json());

    return accountData;
}

const getSummonerData = async (puuid: string): Promise<summonerDataType> => {
    const summonerData = await fetch(
        `https://oc1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`, 
        {
            method: "GET",
            headers: { "X-Riot-Token": process.env.API_KEY ?? '' }
        }
    ).then(response => response.json());

    return summonerData;
}

const getLeagueData = async (summonerId: string): Promise<leagueEntryType[]> => {
    const leagueData = await fetch(
        `https://oc1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}`,
        {
            method: "GET",
            headers: { "X-Riot-Token": process.env.API_KEY ?? '' }
        }
    ).then(response => response.json());

    return leagueData;
}

export {
    getAccountData,
    getSummonerData,
    getLeagueData
};