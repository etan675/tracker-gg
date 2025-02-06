import React from 'react';
import '@/styles/MatchHistory.scss';
import Image from 'next/image';
import placeholderImg from '@/images/placeholder.png';

const MatchSkeleton = () => {
    return (
        <div className='match-data w-full'>
            <div className='match-data__meta--skeleton'>
                <div className='match-data__skeleton-row'></div>
                <div></div>
                <div className='match-data__skeleton-row'></div>
            </div>
            <div className='match-data__player-main match-data__player-main--skeleton'>
                <div><Image src={placeholderImg} alt='placeholder' width={128} height={128} priority /></div>
                <div className='match-data__skeleton-row'></div>
                <div className='match-data__skeleton-row'></div>
                <div className='match-data__skeleton-row'></div>
            </div>
            <div className='match-data__player-sub--skeleton'>
                <div className='match-data__skeleton-row'></div>
                <div></div>
                <div className='match-data__skeleton-row'></div>
            </div>
            <div className='match-data__participants match-data__participants--skeleton'>
                <div className='match-data__skeleton-row'></div>
                <div className='match-data__skeleton-row'></div>
                <div className='match-data__skeleton-row'></div>
                <div className='match-data__skeleton-row'></div>
            </div>
        </div>
    )
};

export default MatchSkeleton;