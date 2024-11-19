import React from 'react'
import MainSearchBar from '@/components/main-search-bar/MainSearchBar'

const page = () => {
  return (
    <div className='w-full h-full flex flex-col justify-center items-center gap-5'>
      <div className='text-6xl font-black text-center'>
        Track your climb
      </div>
      <div className='text-xl text-[#AEAEAE] font-medium text-center'>
        Tracker.GG provides you with the analytics that bring clarity to your ranked journey.
      </div>
      <MainSearchBar className='mt-3' />
    </div>
  )
}

export default page