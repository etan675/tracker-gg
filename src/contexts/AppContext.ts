import { createContext } from "react";
import { AppContext as Context } from '@/types/definitions';

const AppContext = createContext<Context>({
    userRegion: {
        region: '',
        update: () => {}
    }
});

export default AppContext;