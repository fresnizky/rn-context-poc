import { ACTION_TYPE } from './actions';
import { IAlbumState, IAlbum } from './state';
import { IAction } from '../types';

export const reducer = (state: IAlbumState, action: IAction): IAlbumState => {
  switch (action.type) {
    case ACTION_TYPE.SEARCH_SUCCESS:
      const albums: IAlbum[] = [] as IAlbum[];
      action.payload.album.forEach(album => {
        albums[album.idAlbum] = album;
      });

      return { ...state, albumMap: { ...state.albumMap, ...albums } };
    default:
      return state;
  }
};
