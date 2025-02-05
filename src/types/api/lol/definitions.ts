
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
    championId: string,
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
    perkStyles: PerkStyle[]
}

export interface PerkStyle {
    // id for rune tree (sorcery, domination)
    styleId: number,
    // selections in rune tree, list of perkIds, primary will have 4 selections, secondary will have 3 selections
    perkSelections: number[]
}

export interface MatchData {
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
    description: string,
}

export interface GameModifier {
    id: number,
    name: string,
    iconFilename: string,
}

export interface SummonerSpell extends GameModifier {}

export interface RuneTree extends GameModifier {}

export interface Rune extends GameModifier {
    iconPath: string
}

export interface Item extends GameModifier {}