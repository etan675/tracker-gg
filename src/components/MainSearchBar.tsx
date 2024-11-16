import classNames from 'classnames';
import React from 'react';

type Props = Readonly<{
    className?: string
}>;

const MainSearchBar = ({ className }: Props) => {
    return (
        <form className={classNames(
            'w-[800px] h-16 rounded-full overflow-hidden bg-[#2F2F2F] flex px-8 py-3 text-sm',
            className
        )}>
            <div className='w-[30%] h-full flex items-center justify-between pr-8'>
                <div className='w-fit flex flex-col justify-center gap-1'>
                    <label 
                        className='ml-1 font-bold' 
                        htmlFor='mainSearchSelectRegion'
                    >
                        Region
                    </label>
                    <select className='bg-inherit' id='mainSearchSelectRegion'>
                        <option>Oceania</option>
                        <option>NA</option>
                        <option>EUW</option>
                    </select>
                </div>
                <div className='w-[1px] h-[33%] bg-[#908888]' />
            </div>
            <div className='w-[70%] h-full flex flex-col gap-1 justify-center'>
                <label 
                    className='font-bold'
                    htmlFor='mainSearchSummonerName'
                >
                    Search
                </label>
                <input
                    id='mainSearchSummonerName'
                    className='bg-inherit'
                    type='text'
                    placeholder='Summoner name + #Tag'
                />
            </div>
        </form>
    )
};

export default MainSearchBar;