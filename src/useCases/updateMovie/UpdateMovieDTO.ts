interface IUpdateFields {
  name?: string
  kind?: string
  imgUrl?: string
  stopsPlaying?: string
  release?: string
  hasStoppedPlaying?: boolean
}

export interface IUpdateMovieDTO {
  id: string
  fields: IUpdateFields
}
