export interface AppContext {
    userRegion: {
        region: string,
        update: (val: string) => void
    }
}