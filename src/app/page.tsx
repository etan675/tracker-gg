import React from 'react'
import MainSearchBar from '@/components/MainSearchBar'

const page = () => {
  return (
    <div className='w-full h-full flex flex-col justify-center items-center gap-5'>
      <div className='text-6xl font-black text-center'>Track your climb</div>
      <div className='text-xl text-[#AEAEAE] font-medium text-center'>Tracker.GG is the ultimate companion to take along for your ranked journey.</div>
      <MainSearchBar className='mt-3' />
    </div>
  )
}

export default page