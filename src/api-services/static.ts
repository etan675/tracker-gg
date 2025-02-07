import { QueueType } from "@/types/lol/definitions";
import { adaptItemData, adaptRuneData, adaptRuneTreeData, adaptSummonerSpellData } from "./data-adapters/adapters";
import { QueuesSchema } from "./validation/schemas/queues-schema";
import { SummonerSpellsSchema } from "./validation/schemas/summonerspells-schema";
import { PerksSchema, PerkStylesSchema } from "./validation/schemas/perks-schema";
import { ItemsSchema } from "./validation/schemas/item-schema";

const getQueuesJson = async () => {
    const res = await fetch('https://static.developer.riotgames.com/docs/lol/queues.json');

    if (!res.ok) {
        return null;
    }

    return await res.json();
}

const getQueueType = async (queueId: number): Promise<QueueType|undefined> => {
    const data = await getQueuesJson();
    const v = QueuesSchema.parse(data);

    const queueData = v.find(type => {
        return type.queueId === queueId;
    })

    return queueData;
}

const getSummonerSpellJson = async () => {
    const res = await fetch('https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/summoner-spells.json');

    if (!res.ok) {
        return null;
    }

    return await res.json();
}

const getSummonerSpell = async (summonerSpellId: number) => {
    const data = await getSummonerSpellJson();
    const v = SummonerSpellsSchema.parse(data);

    const spellData = v.find(spell => {
        return spell.id === summonerSpellId;
    })

    return spellData ? adaptSummonerSpellData(spellData) : null;
}

const getPerksJson = async () => {
    const res = await fetch('https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perks.json');

    if (!res.ok) {
        return null;
    }

    return await res.json();
}

const getRune = async (runeId: number) => {
    const data = await getPerksJson();
    const v = PerksSchema.parse(data);

    const runeData = v.find(perk => {
        return perk.id === runeId;
    });

    return runeData ? adaptRuneData(runeData) : null ;
}

const getPerkStylesJson = async () => {
    const res = await fetch('https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perkstyles.json');

    if (!res.ok) {
        return null;
    }

    return await res.json();
}

const getRuneTree = async (runeTreeId: number) => {
    const data = await getPerkStylesJson();
    const v = PerkStylesSchema.parse(data);

    const runeTreeData = v.styles.find(perkStyle => {
        return perkStyle.id === runeTreeId;
    });

    return runeTreeData ? adaptRuneTreeData(runeTreeData) : null;
}

const getItemsJson = async () => {
    const res = await fetch('https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/items.json');

    if (!res.ok) {
        return null;
    }

    return await res.json();
}

const getItem = async (itemId: number) => {
    const data = await getItemsJson();
    const v = ItemsSchema.parse(data);

    const itemData = v.find(item => {
        return item.id === itemId;
    })

    return itemData ? adaptItemData(itemData) : null;
}

export {
    getQueueType,
    getSummonerSpell,
    getRune,
    getRuneTree,
    getItem,
}