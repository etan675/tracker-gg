import classNames from 'classnames';
import React, { ChangeEventHandler } from 'react';

type Props = Readonly<{
    className?: string
    value: string,
    onChange: ChangeEventHandler<HTMLSelectElement>
}>;

//TODO: use region filter in real query
const RegionSelect = ({ className = '', value, onChange }: Props) => {
    return (
        <div className={classNames(
            'flex flex-col justify-center gap-1',
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
                value={value}
                onChange={onChange}
            >
                <option value="OCE">OCE</option>
                <option value="NA">NA</option>
                <option value="EUW">EUW</option>
            </select>
        </div>
    )
};

export default RegionSelect;