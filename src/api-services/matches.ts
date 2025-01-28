'use server';

import { MatchDataType, MatchParticipantType, PerkStyleType } from "@/types/api/lol/definitions";

// helpers
const adaptMatchData = (apiData: Record<string, any>): MatchDataType => {
    const participantsData = apiData.info?.participants || [];
    const participants: MatchParticipantType[] = [];
    participantsData.forEach((pData: Record<string, any>) => {
        const perkStyles: PerkStyleType[] = [
            // primary rune tree metadata
            { 
                styleId: pData.perks?.styles?.[0]?.style,  
                perkSelections: pData.perks?.styles?.[0]?.selections?.map(
                    (selection: Record<string, any>) => selection.perk
                )
            },
            // secondary rune tree metadata
            { 
                styleId: pData.perks?.styles?.[1]?.style,  
                perkSelections: pData.perks?.styles?.[1]?.selections?.map(
                    (selection: Record<string, any>) => selection.perk
                )
            },
        ];

        participants.push({
            puuid: pData.puuid as string,
            summonerName: pData.riotIdGameName as string,
            profileIconId: pData.profileIcon as number,
            championName: pData.championName as string,
            championId:  pData.championId as string,
            lane: pData.lane as string,
            role: pData.role as string,
            itemIds: [
                pData.item0,
                pData.item1,
                pData.item2,
                pData.item3,
                pData.item4,
                pData.item5,
                pData.item6
            ] as string[],
            kills: pData.kills as number,
            deaths: pData.deaths as number,
            assists: pData.assists as number,
            win: pData.win as boolean,
            damageToChampions: pData.totalDamageDealtToChampions as number,
            cs: pData.totalMinionsKilled + pData.neutralMinionsKilled as number,
            goldEarned: pData.goldEarned as number,
            summonerSpell1Id: pData.summoner1Id as number,
            summonerSpell2Id: pData.summoner2Id as number,
            perkStyles
        });
    });

    return {
        duration: apiData.info?.gameDuration as number,
        queueId: apiData.info?.queueId as number,
        participants
    };
}

// api calls
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

const getMatchData = async (matchId: string): Promise<MatchDataType|null> => {
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
