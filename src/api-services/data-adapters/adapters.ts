import { MatchData, MatchParticipant, PerkStyle, GameModifier, QueueType, Rune, RuneTree, SummonerSpell, Item } from "@/types/api/lol/definitions";

const adaptMatchData = (apiData: Record<string, any>): MatchData => {
    const participantsData = apiData.info?.participants || [];
    const participants: MatchParticipant[] = [];
    participantsData.forEach((pData: Record<string, any>) => {
        const perkStyles: PerkStyle[] = [
            // primary rune tree
            { 
                styleId: pData.perks?.styles?.[0]?.style,  
                perkSelections: pData.perks?.styles?.[0]?.selections?.map(
                    (selection: Record<string, any>) => selection.perk
                )
            },
            // secondary rune tree
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
            tag: pData.riotIdTagline as string,
            profileIconId: pData.profileIcon as number,
            championName: pData.championName as string,
            championId: pData.championId as string,
            lane: pData.lane as string,
            role: pData.role as string,
            teamId: pData.teamId as number,
            itemIds: [
                pData.item0,
                pData.item1,
                pData.item2,
                pData.item3,
                pData.item4,
                pData.item5,
                pData.item6
            ] as number[],
            kills: pData.kills as number,
            deaths: pData.deaths as number,
            assists: pData.assists as number,
            win: pData.win as boolean,
            damageToChampions: pData.totalDamageDealtToChampions as number,
            cs: pData.totalMinionsKilled + pData.neutralMinionsKilled as number,
            goldEarned: pData.goldEarned as number,
            summonerSpell1Id: pData.summoner1Id as number,
            summonerSpell2Id: pData.summoner2Id as number,
            perkStyles,
            teamEarlySurrendered: pData.teamEarlySurrendered as boolean
        });
    });

    return {
        id: apiData.metadata?.matchId as number,
        duration: apiData.info?.gameDuration as number,
        queueId: apiData.info?.queueId as number,
        startTimestamp: apiData.info?.gameStartTimestamp as number,
        participants
    };
}

const adaptQueueData = (apiData: Record<string, any>): QueueType => {
    return {
        queueId: apiData.queueId as number,
        map: apiData.map as string,
        description: apiData.description as string
    };
}

// game modifiers = summoner spells, runes, items etc
const adaptGameModData = (apiData: Record<string, any>): GameModifier => {
    const iconPath = apiData.iconPath as string;
    const filenameIndex = iconPath.lastIndexOf('/');
    const iconFilename = iconPath.slice(filenameIndex + 1).toLowerCase();

    return {
        id: apiData.id as number,
        name: apiData.name as string,
        iconFilename
    };
}

const adaptSummonerSpellData = (apiData: Record<string, any>): SummonerSpell => {
    return adaptGameModData(apiData);
}

const adaptRuneData = (apiData: Record<string, any>): Rune => {
    const gameMod = adaptGameModData(apiData);
    let iconPath = apiData.iconPath as string;
    const rootPath = '/Styles/';
    const rootPathIndex = iconPath.lastIndexOf(rootPath);
    iconPath = iconPath.slice(rootPathIndex + rootPath.length).toLowerCase();

    return { ...gameMod, iconPath };
}

const adaptRuneTreeData = (apiData: Record<string, any>): RuneTree => {
    return adaptGameModData(apiData);
}

const adaptItemData = (apiData: Record<string, any>): Item => {
    return adaptGameModData(apiData);
}

export {
    adaptMatchData,
    adaptQueueData,
    adaptGameModData,
    adaptSummonerSpellData,
    adaptRuneData,
    adaptRuneTreeData,
    adaptItemData
}