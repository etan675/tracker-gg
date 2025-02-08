import { getItem, getQueueType, getRune, getRuneTree, getSummonerSpell } from "@/api-services/static";

describe('game data services', () => {
    describe('queue type', () => {
        test('ok', async () => {
            const queueId = 400;
            const sut = getQueueType;

            const res = await sut(queueId);

            expect(res).not.toBe(null);
        })
    })

    describe('summoner spell', () => {
        test('ok', async () => {
            const summonerSpellId = 4;
            const sut = getSummonerSpell;

            const res = await sut(summonerSpellId);

            expect(res).not.toBe(null);
        })
    })

    describe('rune', () => {
        test('ok', async () => {
            const runeId = 8229;
            const sut = getRune;

            const res = await sut(runeId);

            expect(res).not.toBe(null);
        }) 
    })

    describe('rune tree', () => {
        test('ok', async () => {
            const runeTreeId = 8300;
            const sut = getRuneTree;

            const res = await sut(runeTreeId);

            expect(res).not.toBe(null);
        })  
    })

    describe('item', () => {     
        test('ok', async () => {
            const itemId = 3135;
            const sut = getItem;

            const res = await sut(itemId);

            expect(res).not.toBe(null);
        })
    })
})