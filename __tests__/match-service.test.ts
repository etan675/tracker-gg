import { getMatchData, getPlayerMatchIds } from "@/api-services/matches";

describe('match data services', () => {
    describe('match ids', () => {
        test('ok', async () => {
            const puuid = '0TdT0jWMny6b6bGE0p0gPf6WDejuOWb_5UXEAdkUHXmj2unsVluniocGju01BbGGV6Q815pEJztOfw';
            const region = 'OCE';
            const sut = getPlayerMatchIds;

            const res = await sut(puuid, region);

            expect(res).not.toBe(null);
        })
    })

    describe('match', () => {
        test('ok', async () => {
            const matchId = 'OC1_657275990';
            const region = 'OCE';
            const sut = getMatchData;

            const res = await sut(matchId, region);

            expect(res).not.toBe(null);
        })  
    })
})