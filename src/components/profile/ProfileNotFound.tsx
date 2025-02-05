import React from 'react';

type Props = Readonly<{
    summonerName: string,
    tag: string
}>;

const ProfileNotFound = ({ summonerName, tag }: Props) => {
    const searchedPlayerName = tag ? `${summonerName}#${tag}` : summonerName;
    return (
        <div className='flex justify-center items-center w-full h-full'>
            <p className='text-2xl'>
                <span>Player </span>
                <span className='font-bold'>&quot;{searchedPlayerName}&quot; </span>
                <span>could not be found!</span>
            </p>
        </div>
    )
};

export default ProfileNotFound;