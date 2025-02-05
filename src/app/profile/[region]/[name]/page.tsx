import React, { Suspense } from 'react';
import ProfileBanner from '@/components/profile/ProfileBanner';
import Content from '@/components/Content';
import { getAccountData, getSummonerData } from '@/api-services/profile';
import { getLeagueData } from '@/api-services/league';
import { AccountData, LeagueEntry, SummonerData } from '@/types/api/lol/definitions';
import { parseNameSearchFromURL } from '@/lib/utils';
import ProfileNotFound from '@/components/profile/ProfileNotFound';
import { getMatchData, getPlayerMatchIds } from '@/api-services/matches';
import Match from '@/components/profile/matches/Match';
import MatchSkeleton from '@/components/profile/matches/MatchSkeleton';

type Props = Readonly<{
    params: Promise<{ region: string, name: string }>, 
}>;

const Page = async ({ params }: Props) => {    
    const _params = await params;
    const { summonerName, tag } = parseNameSearchFromURL(_params.name);

    const accountData: AccountData|null = await getAccountData(summonerName, tag);

    if (!accountData) {
        return <ProfileNotFound summonerName={summonerName} tag={tag} />;
    }

    const summonerData: SummonerData|null = await getSummonerData(accountData.puuid);

    if (!summonerData) {
        return <ProfileNotFound summonerName={summonerName} tag={tag} />;
    }

    const leagueData: LeagueEntry[] = await getLeagueData(summonerData.id);

    const _summonerName = accountData.gameName;
    const _tag = accountData.tagLine;

    const level = summonerData.summonerLevel;
    const profileIconId = summonerData.profileIconId;

    const rankedSoloData = leagueData.find(entry => {
        return entry.queueType === RANKED_SOLO;
    });

    // matches
    const matchIds = await getPlayerMatchIds(accountData.puuid) || [];
    const matches = await Promise.all(matchIds.map(matchId => {
        return getMatchData(matchId);
    }));

    //temp, gets first match only
    let match0 = matches[0];
    if (!match0) {
        return;
    }

    return (
        <div className='flex flex-col gap-3 w-screen h-full'>
            <section className='bg-[#313132] py-10 grow-0'>
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
            <section className='flex-1'>
                <Content className='h-full'>
                    <div className='flex-1 flex flex-col'>
                        <Suspense fallback={<MatchSkeleton />}>
                            <Match playerId={summonerData.puuid} matchData={match0} />
                        </Suspense>
                    </div>
                </Content>
            </section>
        </div>
    );
};

const RANKED_SOLO = 'RANKED_SOLO_5x5';

export default Page;