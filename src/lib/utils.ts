const encodeNameSearchInUrl = (summonerName: string, tag: string) => {
    return `${summonerName}-${tag}`;
}

const parseNameSearchFromURL = (name: string) => {
    const [summonerName, tag] = name.split('-');

    return { summonerName, tag };
}

// check object has key, for type safety
const keyOfObj = <T extends object>(k: string|number|symbol, obj: T): k is keyof T => {
    return k in obj;
}

export {
    encodeNameSearchInUrl,
    parseNameSearchFromURL,
    keyOfObj,
}