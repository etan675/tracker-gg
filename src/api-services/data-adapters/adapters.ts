import { MatchData, MatchParticipant, PerkStyle, GameModifier, Rune, RuneTree, SummonerSpell, Item } from "@/types/lol/definitions";
import { ItemApi, MatchApi, PerkApi, PerkStyleApi, SummonerSpellApi } from "../validation/types/definitions";

const adaptMatchData = (apiData: MatchApi): MatchData => {
    const participants: MatchParticipant[] = apiData.info.participants.map(p => {
        const perkStyles: PerkStyle[] = [
            // primary rune tree
            { 
                styleId: p.perks.styles[0].style,  
                perkSelections: p.perks.styles[0].selections.map(
                    selection => selection.perk
                )
            },
            // secondary rune tree
            { 
                styleId: p.perks.styles[1].style,  
                perkSelections: p.perks.styles[1].selections.map(
                    selection => selection.perk
                )
            },
        ];

        return {
            puuid: p.puuid,
            summonerName: p.riotIdGameName,
            tag: p.riotIdTagline,
            profileIconId: p.profileIcon,
            championName: p.championName,
            championId: p.championId,
            lane: p.lane,
            role: p.role,
            teamId: p.teamId,
            itemIds: [
                p.item0,
                p.item1,
                p.item2,
                p.item3,
                p.item4,
                p.item5,
                p.item6
            ],
            kills: p.kills,
            deaths: p.deaths,
            assists: p.assists,
            win: p.win,
            damageToChampions: p.totalDamageDealtToChampions,
            cs: p.totalMinionsKilled + p.neutralMinionsKilled,
            goldEarned: p.goldEarned,
            summonerSpell1Id: p.summoner1Id,
            summonerSpell2Id: p.summoner2Id,
            teamEarlySurrendered: p.teamEarlySurrendered,
            perkStyles,
        };
    });

    return {
        id: apiData.metadata.matchId,
        duration: apiData.info.gameDuration,
        queueId: apiData.info.queueId,
        startTimestamp: apiData.info.gameStartTimestamp,
        participants
    };
}

// game modifiers = summoner spells, runes, items etc
const adaptGameModData = (
    apiData: { id: number, name: string, iconPath: string }
): GameModifier => {
    const iconPath = apiData.iconPath;
    const filenameIndex = iconPath.lastIndexOf('/');
    const iconFilename = iconPath.slice(filenameIndex + 1).toLowerCase();

    return {
        id: apiData.id,
        name: apiData.name,
        iconFilename
    };
}

const adaptSummonerSpellData = (apiData: SummonerSpellApi): SummonerSpell => {
    return adaptGameModData(apiData);
}

const adaptRuneData = (apiData: PerkApi): Rune => {
    const gameMod = adaptGameModData(apiData);
    let iconPath = apiData.iconPath;
    const rootPath = '/Styles/';
    const rootPathIndex = iconPath.lastIndexOf(rootPath);
    iconPath = iconPath.slice(rootPathIndex + rootPath.length).toLowerCase();

    return { ...gameMod, iconPath };
}

const adaptRuneTreeData = (apiData: PerkStyleApi): RuneTree => {
    return adaptGameModData(apiData);
}

const adaptItemData = (apiData: ItemApi): Item => {
    return adaptGameModData(apiData);
}

export {
    adaptMatchData,
    adaptGameModData,
    adaptSummonerSpellData,
    adaptRuneData,
    adaptRuneTreeData,
    adaptItemData
}