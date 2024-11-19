import classNames from 'classnames';
import React from 'react';

type Props = Readonly<{
    className?: string
}>;

const RegionSelect = ({ className }: Props) => {
    return (
        <div className={classNames(
            'flex flex-col justify-center gap-1 pr-5',
            className
        )}>
            <label 
                className='ml-1 font-bold' 
                htmlFor='mainSearchSelectRegion'
            >
                Region
            </label>
            <select
                className='bg-inherit cursor-pointer outline-none' 
                id='mainSearchSelectRegion'
                name='region'
            >
                <option>OCE</option>
                <option>NA</option>
                <option>EUW</option>
            </select>
        </div>
    )
};

export default RegionSelect;