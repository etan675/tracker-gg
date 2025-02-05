import React from 'react'
import Link from 'next/link'
import classNames from 'classnames'
import Image from 'next/image'
import logo from '@/images/logo.png';
import '@/styles/TopBanner.scss';

type Props = Readonly<{ 
    className?: string 
}>

const TopBanner = ({ className }: Props) => {
  return (
    <header className={classNames(
        'w-full h-20 py-5 px-8 flex items-center bg-[#0c2a67] border-b border-b-blue-900',
        className
    )}>
        <Link 
          className={classNames(
            'top-banner__header',
            'flex items-center gap-2 h-full'
          )}
          href='/'
        >
            <Image className='rounded-md' src={logo} alt="app logo" width={40} height={40} />
            <span className={classNames(
              'top-banner__header-title',
              'text-3xl font-bold text-[#b6cef9]'
            )}>
              Tracker.GG
            </span>
        </Link>
    </header>
  )
}

export default TopBanner