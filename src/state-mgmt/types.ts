import { IArtistState } from './artist/state';
import { IAlbumState } from './album/state';

export interface IAction<T = string, P = any> {
  type: T;
  payload: P;
}

export type IGlobalState = {
  artist: IArtistState;
  album: IAlbumState;
};

export interface Deps {
  apiService: { request: Function };
  stateSnapshot: { get: () => IGlobalState; set: (state: IGlobalState) => void };
}
