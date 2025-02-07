import { apiRegions } from "@/lib/constants";
import { AccountData, ApiRegion, SummonerData } from "@/types/lol/definitions";
import { AccountSchema, SummonerSchema } from "./validation/schemas/profile-schema";

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
    const v = AccountSchema.parse(data);
    return {
        puuid: v.puuid,
        gameName: v.gameName,
        tagLine: v.tagLine
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
    const v = SummonerSchema.parse(data);
    return {
        id: v.id,
        puuid: v.puuid,
        profileIconId: v.profileIconId,
        summonerLevel: v.summonerLevel
    }
}

export {
    getAccountData,
    getSummonerData
}