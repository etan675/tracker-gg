import Image from 'next/image';
import React from 'react';

type Props = Readonly<{
    summonerName: string,
    tag: string,
    level: number,
    profileIconId: number,
    tier: string,
    rank: string,
    lp: number,
    wins: number,
    losses: number,
}>;

const ProfileBanner = async ({ 
    summonerName, 
    tag,
    level,
    profileIconId,
    tier,
    rank,
    lp,
    wins,
    losses
}: Props) => {
    const rankIconFileName = tier ? (tier).toLowerCase() : 'unranked';
    const rankedWinPercentage = Math.round((wins / (wins + losses) * 100));
    
    return (
        <div className='flex gap-6 items-center min-w-[560px]'>
            <div className='relative w-fit h-fit'>
                <Image
                    className='rounded-xl'
                    src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${profileIconId}.jpg`}
                    alt='profile icon'
                    width={100}
                    height={100}
                />
                <div className='absolute bottom-0 left-[50%] translate-x-[-50%] translate-y-[50%] px-1 bg-slate-800 rounded-md'>
                    {level}
                </div>
            </div>

            <div className='flex flex-col'>
                <div className='text-3xl'>
                    <span className='font-extrabold'>{summonerName}</span> 
                    <span className='text-[#9E9EAF] ml-2'>#{tag}</span>
                </div>

                <div className='flex gap-2'>
                    <Image
                        src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-shared-components/global/default/images/${rankIconFileName}.png`}
                        alt='rank'
                        width={80}
                        height={80}
                        priority
                    />

                    <div className='flex flex-col justify-center text-xl'>
                        {tier ? (
                            <>
                                <p className='font-bold text-[#70A3F3]'>{tier} {rank} - {lp} lp</p>
                                <p className='text-lg text-[#9E9EAF]'>{wins}W - {losses}L &nbsp; Win ratio: {rankedWinPercentage}%</p>
                            </>
                        ) : (
                            <p className='text-[#9E9EAF]'>Unranked</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ProfileBanner;