'use client'

import AppContext from '@/contexts/AppContext';
import React, { useState } from 'react';

const defaultRegion = 'OCE';

type Props = Readonly<{
    children: React.ReactNode
}>;

const AppContextProvider = ({ children }: Props) => {
    const [region, setRegion] = useState(defaultRegion);
    const regionUpdater = (val: string) => setRegion(val);

    const appContext = { 
        userRegion: {
            region,
            update: regionUpdater
        }
    };

    return (
        <AppContext.Provider value={appContext}>
            {children}
        </AppContext.Provider>
    )
};

export default AppContextProvider;