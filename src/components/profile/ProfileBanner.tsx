import Image from 'next/image';
import React from 'react';

type rankedStatsType = {
    tier: string,
    rank: string,
    lp: number,
    wins: number,
    losses: number,
}

type Props = Readonly<{
    summonerName: string,
    tag: string,
    level: number,
    profileIconId: number
    rankedStats: rankedStatsType
}>;

const ProfileBanner = ({ summonerName, tag, level, profileIconId, rankedStats }: Props) => {
    
    return (
        <div>
            <Image
                src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${profileIconId}.jpg`}
                alt='profile icon'
                width={100}
                height={100}
            />
            <div>riot ID: {summonerName} #{tag}</div>
            <div>level: {level}</div>
            <div>rank: {rankedStats.tier ? `${rankedStats.tier} ${rankedStats.rank}` : 'Unranked'}, lp: {rankedStats.lp}, wins: {rankedStats.wins}, losses: {rankedStats.losses}</div>
        </div>
    )
};

export default ProfileBanner;