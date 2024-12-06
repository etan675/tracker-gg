import { parseNameSearchFromURL } from '@/lib/utils';
import React, { ReactNode } from 'react';

type MetadataProps = Readonly<{
    params: Promise<{ region: string, name: string }>
}>;

export const generateMetadata = async ({ params }: MetadataProps) => {
    const _params = await params; 
    const { summonerName, tag } = parseNameSearchFromURL(_params.name);

    return {
        title: `${summonerName}#${tag} - Player Search`
    }
}

type Props = Readonly<{
    children: ReactNode
}>;

const Layout = ({ children }: Props) => {
    return (
        <div className='h-full'>
            {children}
        </div>
    )
};

export default Layout;