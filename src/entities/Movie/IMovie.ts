export interface IMovie {
  id?: number
  name: string
  kind: string
  stopsPlaying: string
  release?: string
  hasStoppedPlaying?: boolean
}
