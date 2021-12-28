interface IFile {
  fieldname: string
  key?: string
  location?: string
  originalname: string
  encoding: string
  mimetype: string
  destination: string
  filename: string
  path: string
  size: number
}

export interface ICreateMovieDTO {
  name: string
  kind: string
  imgUrl: string
  stopsPlaying?: string
  release?: string
  file?: IFile
}
