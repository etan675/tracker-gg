import Link from 'next/link'
import React from 'react'
import SiteLogo from './svg-components/SiteLogo'
import classNames from 'classnames'

type Props = Readonly<{ 
    className?: string 
}>

const TopBanner = ({ className }: Props) => {
  return (
    <div className={classNames(
        'w-full h-20 py-5 px-8 flex items-center',
        className
    )}>
        <Link className='flex items-center gap-2 h-full' href={'/'}>
            <SiteLogo fill='white' width={30} height={30} />
            <span className='text-3xl font-black'>Tracker.GG</span>
        </Link>
    </div>
  )
}

export default TopBanner