import React from 'react';
import ProfileBanner from '@/components/profile/ProfileBanner';
import { playerSearchFields } from '@/lib/types';
import { notFound } from 'next/navigation';
import { getAccountData, getLeagueData, getSummonerData } from '@/lib/server/utils';

type Props = Readonly<{
    searchParams: Promise<playerSearchFields>
}>;

const page = async ({ searchParams }: Props) => {
    const { region, summonerName, tag } = await searchParams;

    const accountData = await getAccountData(summonerName, tag);

    console.log('accoundata: ', accountData);
    

    if (!accountData?.puuid) {
        // TODO: handle this with another component instead of 404

        return notFound();
    }

    const summonerData = await getSummonerData(accountData.puuid);
    const leagueData = await getLeagueData(summonerData.id);

    const rankedSoloData = leagueData.find(entry => {
        return entry.queueType === 'RANKED_SOLO_5x5';
    });


    return (
        <div>
            <ProfileBanner
                summonerName={summonerName}
                tag={tag}
                level={summonerData.summonerLevel}
                profileIconId={summonerData.profileIconId}
                rankedStats={{
                    tier: rankedSoloData?.tier || '',
                    rank: rankedSoloData?.rank || '',
                    lp: rankedSoloData?.leaguePoints || 0,
                    wins: rankedSoloData?.wins || 0,
                    losses: rankedSoloData?.losses || 0
                }}
            />
        </div>
    );
};

export default page;