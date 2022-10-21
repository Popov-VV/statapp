export type TrackInterface =
    (event: string, ...tags: string[]) => void

export interface TrackerInterface {
    track: TrackInterface
}
