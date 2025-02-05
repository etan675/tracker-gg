import { AccountData, SummonerData } from "@/types/api/lol/definitions";

const getAccountData = async (summonerName: string, tag: string): Promise<AccountData|null> => {
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

    const data = await res.json();
    return {
        puuid: data.puuid,
        gameName: data.gameName,
        tagLine: data.tagLine
    }
}

const getSummonerData = async (puuid: string): Promise<SummonerData|null> => {
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