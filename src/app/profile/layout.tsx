import ProfileSearch from '@/components/profile-search/ProfileSearch';
import React, { ReactNode } from 'react';

type Props = Readonly<{
    children: ReactNode
}>;

const Layout = ({ children }: Props) => {
    return (
        <div className='flex flex-col h-full'>
            <div className='w-full flex justify-center p-3'>
                <ProfileSearch />
            </div>
            {children}
        </div>
    )
};

export default Layout;