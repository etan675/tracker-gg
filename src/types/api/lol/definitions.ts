
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

// match.info.participants[0]
export type MatchParticipantType = {
    // puuid
    puuid: string,
    // riotIdGameName
    summonerName: string,
    // profileIcon
    profileIconId: number,
    // championName
    championName: string,
    // championId
    championId: string,
    // lane
    lane: string,
    // role
    role: string,
    // item0, item1, item2....
    itemIds: string[],
    // kills
    kills: number,
    // deaths
    deaths: number,
    // assists
    assists: number,
    // win
    win: boolean,
    // totalDamageDealtToChampions
    damageToChampions: number,
    // neutralMinionsKilled + totalMinionsKilled
    cs: number,
    // goldEarned
    goldEarned: number,
    // summoner1Id
    summonerSpell1Id: number,
    // summoner2Id 
    summonerSpell2Id: number,
    // metadata for runes, 0 = primary, 1 = secondary
    // perks.styles[0], perks.styles[1]
    perkStyles: PerkStyleType[] 
}

export type PerkStyleType = {
    // id for rune tree (sorcery, domination), data from communitydragon
    // perks.styles[0].style
    styleId: number,
    // selections in run tree, list of perkIds, primary has 4 selections, secondary has 3 selections
    // perks.styles[0].selections[0].perk
    perkSelections: number[]
}

export type MatchDataType = {
    // list of participants
    // match.info.participants[].
    participants: MatchParticipantType[],
    // time in seconds
    // match.info.gameDuration
    duration: number,
    // id of game type, data from lol constants api
    // match.info.queueId
    queueId: number
}