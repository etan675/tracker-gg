import { getAccountData, getSummonerData } from "@/api-services/profile";

describe('profile data services', () => {
    describe('account', () => {
        test('ok', async () => {
            const name = 'coconutcrab123';
            const tag = 'oce'
            const region = 'OCE';
            const sut = getAccountData;
    
            const res = await sut(name, tag, region);
    
            expect(res).toHaveProperty('puuid');
        })  
    })

    describe('summoner', () => {
        test('ok', async () => {
            const puuid = '0TdT0jWMny6b6bGE0p0gPf6WDejuOWb_5UXEAdkUHXmj2unsVluniocGju01BbGGV6Q815pEJztOfw';
            const region = 'OCE';
            const sut = getSummonerData;
            
            const res = await sut(puuid, region);

            expect(res).toHaveProperty('id');
        })  
    })
});