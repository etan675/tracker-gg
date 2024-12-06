export const encodeNameSearchInUrl = (summonerName: string, tag: string) => {
    return `${summonerName}-${tag}`;
}

export const parseNameSearchFromURL = (name: string) => {
    const [summonerName, tag] = name.split('-');

    return { summonerName, tag };
}