import { getLeagueData } from "@/api-services/league";

describe('league data service', () => {
    test('ok', async () => {
        const summonerId = '5Zra5fMTbd4teIAMPSMdj1OMUB56L5UAcy-EpdRHEJ03';
        const region = 'OCE';
        const sut = getLeagueData;
        
        const res = await sut(summonerId, region);

        expect(res).not.toBe(null);
    })
})