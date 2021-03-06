export interface IMovie {
  id?: number
  name: string
  kind: string
  imgUrl: string
  stopsPlaying?: string
  release?: string
  hasStoppedPlaying?: boolean
}
