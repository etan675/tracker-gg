import { QueueType } from "@/types/api/lol/definitions";
import { adaptItemData, adaptQueueData, adaptRuneData, adaptRuneTreeData, adaptSummonerSpellData } from "./data-adapters/adapters";

const getQueuesJson = async (): Promise<Record<string, any>[]|null> => {
    const res = await fetch('https://static.developer.riotgames.com/docs/lol/queues.json');

    if (!res.ok) {
        return null;
    }

    return await res.json();
}

const getQueueType = async (queueId: number): Promise<QueueType|null> => {
    const queuesData = await getQueuesJson();
    const queueData = queuesData?.find(queueData => {
        return queueData.queueId === queueId;
    })

    return queueData ? adaptQueueData(queueData) : null;
}

const getSummonerSpellJson = async (): Promise<Record<string, any>[]|null> => {
    const res = await fetch('https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/summoner-spells.json');

    if (!res.ok) {
        return null;
    }

    return await res.json();
}

const getSummonerSpell = async (summonerSpellId: number) => {
    const spellsData = await getSummonerSpellJson();
    const spell = spellsData?.find(spellData => {
        return spellData.id === summonerSpellId;
    })

    return spell ? adaptSummonerSpellData(spell) : null;
}

const getPerksJson = async (): Promise<Record<string, any>[]|null> => {
    const res = await fetch('https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perks.json');

    if (!res.ok) {
        return null;
    }

    return await res.json();
}

const getRune = async (runeId: number) => {
    const perksData = await getPerksJson();
    const runeData = perksData?.find(perk => {
        return perk.id === runeId;
    });

    return runeData ? adaptRuneData(runeData) : null ;
}

const getPerkStylesJson = async (): Promise<Record<string, any>|null> => {
    const res = await fetch('https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perkstyles.json');

    if (!res.ok) {
        return null;
    }

    return await res.json();
}

const getRuneTree = async (runeTreeId: number) => {
    const perkStylesJson = await getPerkStylesJson();
    const perkStylesData: Record<string, any>[] = perkStylesJson?.styles || [];
    const runeTreeData = perkStylesData.find(perkStyle => {
        return perkStyle.id === runeTreeId;
    });

    return runeTreeData ? adaptRuneTreeData(runeTreeData) : null;
}

const getItemsJson = async (): Promise<Record<string, any>[]|null> => {
    const res = await fetch('https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/items.json');

    if (!res.ok) {
        return null;
    }

    return await res.json();
}

const getItem = async (itemId: number) => {
    const itemsData = await getItemsJson();
    const item = itemsData?.find(itemData => {
        return itemData.id === itemId;
    })

    return item ? adaptItemData(item) : null;
}

export {
    getQueueType,
    getSummonerSpell,
    getRune,
    getRuneTree,
    getItem,
}