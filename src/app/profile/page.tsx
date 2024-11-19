import ProfileBanner from '@/components/profile/ProfileBanner';
import { accountDataType, leagueEntryType, playerSearchFields, summonerDataType } from '@/lib/types';
import { notFound } from 'next/navigation';
import React from 'react';

const getAccountData = async (summonerName: string, tag: string) => {
    const accountData = await fetch(
        `https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${summonerName}/${tag}`,
        {
            method: "GET",
            headers: { "X-Riot-Token": process.env.API_KEY ?? '' }
        }
    ).then(response => response.json());

    return accountData;
}

const getSummonerData = async (puuid: string) => {
    const summonerData = await fetch(
        `https://oc1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`, 
        {
            method: "GET",
            headers: { "X-Riot-Token": process.env.API_KEY ?? '' }
        }
    ).then(response => response.json());

    return summonerData;
}

const getLeagueData = async (summonerId: string) => {
    const leagueData = await fetch(
        `https://oc1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}`,
        {
            method: "GET",
            headers: { "X-Riot-Token": process.env.API_KEY ?? '' }
        }
    ).then(response => response.json());

    return leagueData;
}

type Props = Readonly<{
    searchParams: Promise<playerSearchFields>
}>;

const page = async ({ searchParams }: Props) => {
    const { region, summonerName, tag } = await searchParams;

    const accountData: accountDataType = await getAccountData(summonerName, tag);

    if (!accountData?.puuid) {
        // TODO: handle this with another component instead of 404

        return notFound();
    }

    const summonerData: summonerDataType = await getSummonerData(accountData.puuid);
    const leagueData: leagueEntryType[] = await getLeagueData(summonerData.id);

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