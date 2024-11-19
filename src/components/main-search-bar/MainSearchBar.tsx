import classNames from 'classnames';
import React from 'react';
import SearchIcon from '../svg-components/SearchIcon';
import RegionSelect from './RegionSelect';
import NameSearch from './NameSearch';

type Props = Readonly<{
    className?: string
}>;

const MainSearchBar = ({ className }: Props) => {

    return (
        <form 
            className={classNames(
                'w-[800px] h-16 rounded-full overflow-hidden bg-[#2F2F2F] flex pl-8 pr-6 py-3 text-sm',
                className
            )}
            action={'/profile'}
        >
            <div className='w-[30%] h-full flex items-center justify-between pr-8'>
                <RegionSelect className='w-full'/>
                <div className='w-[1px] h-[33%] bg-[#908888]' />
            </div>
            <NameSearch className='w-[70%] h-full' />
            <button>
                <SearchIcon 
                    fill='#9B9B9B'
                    className='w-fit h-full p-1'
                />
            </button>
        </form>
    )
};

export default MainSearchBar;