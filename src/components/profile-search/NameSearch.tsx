'use client'

import classNames from 'classnames';
import React, { ChangeEventHandler } from 'react';

type Props = Readonly<{
    className?: string
    value: string
    onChange: ChangeEventHandler<HTMLInputElement>
}>;

const NameSearch = ({ className = '', value, onChange }: Props) => {
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
                type='text'
                value={value}
                onChange={onChange}
                placeholder='Summoner name + #Tag'
                autoComplete='off'
            />
        </div>
    )
};

export default NameSearch;