import React from 'react'
import ProfileSearch from '@/components/profile-search/ProfileSearch'
import Content from '@/components/Content'

const Page = () => {
  return (
    <Content className='h-full'>
      <div className='w-full h-full flex flex-col justify-center items-center gap-5'>
        <div className='text-6xl font-black text-center'>
          Track your league
        </div>
        <div className='text-xl text-[#AEAEAE] font-medium text-center'>
          Get in-depth analytics and real-time insights on your gaming performance.
        </div>
        <ProfileSearch className='mt-3' />
      </div>
    </Content>
  )
}

export default Page;