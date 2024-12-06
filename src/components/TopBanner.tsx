import React from 'react'
import Link from 'next/link'
import classNames from 'classnames'
import Image from 'next/image'
import logo from '@/images/logo.png';

type Props = Readonly<{ 
    className?: string 
}>

const TopBanner = ({ className }: Props) => {
  return (
    <div className={classNames(
        'w-full h-20 py-5 px-8 flex items-center bg-[#7fffd4]',
        className
    )}>
        <Link className='flex items-center gap-2 h-full' href={'/'}>
            <Image className='rounded-md' src={logo} alt="app logo" width={40} height={40} priority />
            <span className='text-3xl font-bold text-[#174a5f]'>Tracker.GG</span>
        </Link>
    </div>
  )
}

export default TopBanner