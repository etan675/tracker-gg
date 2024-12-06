
export type LeagueEntryType = {
    summonerId: string,
    queueType: string,
    tier: string,
    rank: string,
    leaguePoints: number,
    wins: number,
    losses: number
}

export type AccountDataType = {
    puuid: string,
    gameName: string,
    tagLine: string
}

export type SummonerDataType = {
    id: string,
    puuid: string,
    profileIconId: number,
    summonerLevel: number
}