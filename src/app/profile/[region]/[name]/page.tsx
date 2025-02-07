import React, { Suspense } from 'react';
import ProfileBanner from '@/components/profile/ProfileBanner';
import Content from '@/components/Content';
import { getAccountData, getSummonerData } from '@/api-services/profile';
import { getLeagueData } from '@/api-services/league';
import { AccountData, LeagueEntry, MatchData, SummonerData } from '@/types/api/lol/definitions';
import { keyOfObj, parseNameSearchFromURL } from '@/lib/utils';
import ProfileNotFound from '@/components/profile/ProfileNotFound';
import { getMatchData, getPlayerMatchIds } from '@/api-services/matches';
import Match from '@/components/profile/matches/Match';
import MatchSkeleton from '@/components/profile/matches/MatchSkeleton';
import { apiRegions } from '@/lib/constants';

type Props = Readonly<{
    params: Promise<{ region: string, name: string }>, 
}>;

const Page = async ({ params }: Props) => {    
    const _params = await params;
    const region = _params.region;
    const { summonerName, tag } = parseNameSearchFromURL(_params.name);

    if (!keyOfObj(region, apiRegions)) {
        throw new Error('Region does not exist');
    }

    const accountData: AccountData|null = await getAccountData(summonerName, tag, region);

    if (!accountData) {
        return <ProfileNotFound summonerName={summonerName} tag={tag} region={region} />;
    }

    const summonerData: SummonerData|null = await getSummonerData(accountData.puuid, region);

    if (!summonerData) {
        return <ProfileNotFound summonerName={summonerName} tag={tag} region={region} />;
    }

    const leagueData: LeagueEntry[] = await getLeagueData(summonerData.id, region);

    const _summonerName = accountData.gameName;
    const _tag = accountData.tagLine;

    const level = summonerData.summonerLevel;
    const profileIconId = summonerData.profileIconId;

    const rankedSoloData = leagueData.find(entry => {
        return entry.queueType === RANKED_SOLO;
    });

    // matches
    const matchIds = await getPlayerMatchIds(accountData.puuid, region) || [];
    const matches: MatchData[] = (
        await Promise.all(matchIds.map(matchId => {
            return getMatchData(matchId, region);
        }))
    ).filter(match => !!match);

    return (
        <div className='flex-grow flex flex-col gap-3 w-screen overflow-auto'>
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
            <section className='flex-grow'>
                <Content className='h-full'>
                    <div className='flex-1 flex flex-col gap-3'>
                        {matches.map(match => {
                            return (
                                <Suspense key={match.id} fallback={<MatchSkeleton />}>
                                    <Match 
                                        key={match.id}
                                        className='last:mb-10'
                                        playerId={summonerData.puuid}
                                        matchData={match}
                                    />
                                </Suspense>
                            )
                        })}
                    </div>
                </Content>
            </section>
        </div>
    );
};

const RANKED_SOLO = 'RANKED_SOLO_5x5';

export default Page;