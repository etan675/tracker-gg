export type playerSearchFields = {
    region: string,
    summonerName: string,
    tag: string
}

// league api DTOs

export type leagueEntryType = {
    summonerId: string,
    queueType: string,
    tier: string,
    rank: string,
    leaguePoints: number,
    wins: number,
    losses: number
}

export type accountDataType = {
    puuid: string,
    gameName: string,
    tagLine: string
}

export type summonerDataType = {
    id: string,
    puuid: string,
    profileIconId: number,
    summonerLevel: number
}