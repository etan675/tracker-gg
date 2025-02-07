import { apiRegions } from "@/lib/constants";
import { AccountData, ApiRegion, SummonerData } from "@/types/api/lol/definitions";

const getAccountData = async (summonerName: string, tag: string, region: ApiRegion): Promise<AccountData|null> => {
    const res = await fetch(
        `https://${apiRegions[region].AREA}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${summonerName}/${tag}`,
        {
            method: "GET",
            headers: { "X-Riot-Token": process.env.API_KEY ?? '' }
        }
    );

    if (!res.ok) {
        return null;
    }

    const data = await res.json();
    return {
        puuid: data.puuid,
        gameName: data.gameName,
        tagLine: data.tagLine
    }
}

const getSummonerData = async (puuid: string, region: ApiRegion): Promise<SummonerData|null> => {
    const res = await fetch(
        `https://${apiRegions[region].SERVER_CODE}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`, 
        {
            method: "GET",
            headers: { "X-Riot-Token": process.env.API_KEY ?? '' }
        }
    );

    if (!res.ok) {
        return null;
    }

    const data = await res.json();
    return {
        id: data.id,
        puuid: data.puuid,
        profileIconId: data.profileIconId,
        summonerLevel: data.summonerLevel
    }
}

export {
    getAccountData,
    getSummonerData
}