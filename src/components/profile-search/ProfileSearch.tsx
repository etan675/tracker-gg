'use client'

import React, { ChangeEventHandler, FormEventHandler, useState } from 'react';
import classNames from 'classnames';
import SearchIcon from '../svg-components/SearchIcon';
import RegionSelect from './RegionSelect';
import NameSearch from './NameSearch';
import { useRouter } from 'next/navigation';
import { encodeNameSearchInUrl } from '@/lib/utils';

type Props = Readonly<{
    className?: string
}>;

const ProfileSearch = ({ className }: Props) => {
    const [formState, setFormState] = useState({
        region: 'OCE',
        name: '',
    });

    const router = useRouter();

    const handleRegionChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
        setFormState(prevState => (
            {
                ...prevState,
                region: e.target.value
            }
        ))
    }

    const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setFormState(prevState => (
            { 
                ...prevState,
                name: e.target.value
            }
        ))
    }
    
    const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        const { region, name } = formState;

        const nameParts = name.split('#');
        const summonerName = nameParts[0]?.trim() || '';
        const tag = nameParts[1]?.trim() || '';

        let namePath = tag ? encodeNameSearchInUrl(summonerName, tag) : summonerName;

        router.push(`/profile/${region}/${namePath}`)
    }

    return (
        <form 
            className={classNames(
                'w-[800px] h-16 rounded-full overflow-hidden bg-[#2F2F2F] flex pl-8 pr-6 py-3 text-sm',
                className
            )}
            onSubmit={handleFormSubmit}
        >
            <div className='w-[30%] h-full flex items-center justify-between pr-8'>
                <RegionSelect 
                    className='w-full'
                    value={formState.region}
                    onChange={handleRegionChange}
                />
                <div className='w-[1px] h-[33%] bg-[#908888]' />
            </div>
            <NameSearch 
                className='w-[70%] h-full'
                value={formState.name}
                onChange={handleInputChange}
            />
            <button>
                <SearchIcon 
                    fill='#9B9B9B'
                    className='w-fit h-full p-1'
                />
            </button>
        </form>
    )
};

export default ProfileSearch;