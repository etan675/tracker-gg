'use client'

import classNames from 'classnames';
import React, { ChangeEvent, useState } from 'react';

type Props = Readonly<{
    className?: string
}>;

const NameSearch = ({ className }: Props) => {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }

    const nameParts = inputValue.split('#');
    const summonerName = nameParts[0]?.trim() || '';
    const tag = nameParts[1]?.trim() || '';

    return (
        <div className={classNames(
            'flex flex-col gap-1 justify-center',
            className
        )}>
            <label 
                className='font-bold cursor-pointer'
                htmlFor='mainSearchSummonerName'
            >
                Search
            </label>
            <input
                className='bg-inherit outline-none'
                id='mainSearchSummonerName'
                type='search'
                value={inputValue}
                onChange={handleChange}
                placeholder='Summoner name + #Tag'
                autoComplete='off'
            />

            <input
                type='hidden'
                name='summonerName'
                value={summonerName}
            />
            <input
                type='hidden'
                name='tag'
                value={tag}
            />
        </div>
    )
};

export default NameSearch;