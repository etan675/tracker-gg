import { apiRegions } from "@/lib/constants";

export type ApiRegion = keyof typeof apiRegions;

export interface LeagueEntry {
    summonerId: string,
    queueType: string,
    tier: string,
    rank: string,
    leaguePoints: number,
    wins: number,
    losses: number
}

export interface AccountData {
    puuid: string,
    gameName: string,
    tagLine: string
}

export interface SummonerData {
    id: string,
    puuid: string,
    profileIconId: number,
    summonerLevel: number
}

export interface MatchParticipant {
    puuid: string,
    summonerName: string,
    tag: string,
    profileIconId: number,
    championName: string,
    championId: number,
    lane: string,
    role: string,
    teamId: number,
    itemIds: number[],
    kills: number,
    deaths: number,
    assists: number,
    win: boolean,
    damageToChampions: number,
    cs: number,
    goldEarned: number,
    summonerSpell1Id: number,
    summonerSpell2Id: number,
    // metadata for runes, 0 = primary, 1 = secondary
    perkStyles: PerkStyle[],
    teamEarlySurrendered: boolean,
}

export interface PerkStyle {
    // id for rune tree (sorcery, domination)
    styleId: number,
    // selections in rune tree, list of perkIds, primary will have 4 selections, secondary will have 3 selections
    perkSelections: number[]
}

export interface MatchData {
    id: string,
    participants: MatchParticipant[],
    // time in seconds
    duration: number,
    // timestamp (milliseconds date value) for when the game started
    startTimestamp: number,
    queueId: number
}

export interface QueueType {
    queueId: number,
    map: string,
    description: string|null,
}

export interface GameModifier {
    id: number,
    name: string,
    iconFilename: string,
}

export type SummonerSpell = GameModifier

export type RuneTree = GameModifier

export interface Rune extends GameModifier {
    iconPath: string
}

export type Item = GameModifier