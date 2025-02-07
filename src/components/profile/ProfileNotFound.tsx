import React from 'react';

type Props = Readonly<{
    summonerName: string,
    tag: string,
    region: string
}>;

const ProfileNotFound = ({ summonerName, tag, region }: Props) => {
    const searchedPlayerName = tag ? `${summonerName}#${tag}` : summonerName;
    return (
        <div className='flex justify-center items-center w-full h-full'>
            <p className='text-2xl'>
                <span>Player </span>
                <span className='font-bold'>&quot;{searchedPlayerName}&quot; </span>
                <span>could not be found in region {region}!</span>
            </p>
        </div>
    )
};

export default ProfileNotFound;