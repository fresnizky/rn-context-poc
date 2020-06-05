export interface IAlbum {
  idAlbum: string;
  idArtist: string;
  strAlbum: string; // name
  intYearReleased: string;
  strGenre: string;
  strAlbumThumb: string;
  strAlbumThumbBack: string;
  strAlbumCDart: string;
  strDescriptionEN: string;
}

export interface IAlbumState {
  albumMap: Record<string, IAlbum>;
}

export const initialState: IAlbumState = {
  albumMap: {}
};
