'use client'

import React, { ChangeEventHandler, useState } from 'react';
import classNames from 'classnames';
import SearchIcon from '../svg-components/SearchIcon';
import RegionSelect from './RegionSelect';
import NameSearch from './NameSearch';
import { encodeNameSearchInUrl } from '@/lib/utils';

type Props = Readonly<{
    className?: string
}>;

const ProfileSearch = ({ className }: Props) => {
    const [formState, setFormState] = useState({ region: 'OCE', name: '' });

    const handleRegionChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
        setFormState(prevState => ({ ...prevState, region: e.target.value }));
    }

    const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setFormState(prevState => ({ ...prevState, name: e.target.value }));
    }

    const { region, name } = formState;
    const nameParts = name.split('#');
    const summonerName = nameParts[0]?.trim() || '';
    const tag = nameParts[1]?.trim() || '';
    const namePath = tag ? encodeNameSearchInUrl(summonerName, tag) : summonerName;

    return (
        <form 
            className={classNames(
                'w-[800px] min-w-[500px] h-16 rounded-full overflow-hidden bg-[#2F2F2F] flex gap-5 pl-8 pr-6 py-3 text-sm',
                className
            )}
            action={`/profile/${region}/${namePath}`}
        >
            <RegionSelect 
                className='flex-[0_1_25%]'
                value={formState.region}
                onChange={handleRegionChange}
            />
            <div className='w-[1px] h-[40%] bg-[#908888] self-center' />
            <NameSearch 
                className='flex-auto h-full'
                value={formState.name}
                onChange={handleInputChange}
            />
            <button><SearchIcon fill='#9B9B9B' className='w-fit h-full p-1' /></button>
        </form>
    )
};

export default ProfileSearch;