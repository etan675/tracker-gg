import React from 'react';
import ProfileBanner from '@/components/profile/ProfileBanner';
import Content from '@/components/Content';
import { getAccountData, getSummonerData } from '@/api-services/profile';
import { getLeagueData } from '@/api-services/league';
import { parseNameSearchFromURL } from '@/lib/utils';
import ProfileNotFound from '@/components/profile/ProfileNotFound';

type Props = Readonly<{
    params: Promise<{ region: string, name: string }>, 
}>;

const Page = async ({ params }: Props) => {    
    const _params = await params;
    const { summonerName, tag } = parseNameSearchFromURL(_params.name);

    const accountData = await getAccountData(summonerName, tag);

    if (!accountData) {
        return <ProfileNotFound summonerName={summonerName} tag={tag} />;
    }

    const summonerData = await getSummonerData(accountData.puuid);

    if (!summonerData) {
        return <ProfileNotFound summonerName={summonerName} tag={tag} />;
    }

    const leagueData = await getLeagueData(summonerData.id);

    const _summonerName = accountData.gameName;
    const _tag = accountData.tagLine;

    const level = summonerData.summonerLevel;
    const profileIconId = summonerData.profileIconId;

    const rankedSoloData = leagueData.find(entry => {
        return entry.queueType === RANKED_SOLO;
    });

    return (
        <div className='flex flex-col h-full'>
            <section className='w-screen bg-[#313132] py-10'>
                <Content>
                    <ProfileBanner 
                        summonerName={_summonerName}
                        tag={_tag}
                        level={level}
                        profileIconId={profileIconId}
                        rankedSoloData={rankedSoloData}
                    />
                </Content>
            </section>
        </div>
    );
};

const RANKED_SOLO = 'RANKED_SOLO_5x5';

export default Page;