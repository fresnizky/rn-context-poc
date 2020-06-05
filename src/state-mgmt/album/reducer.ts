import { ACTION_TYPE } from './actions';
import { IAlbumState } from './state';
import { IAction } from '../types';

export const reducer = (state: IAlbumState, action: IAction): IAlbumState => {
  switch (action.type) {
    case ACTION_TYPE.SEARCH_SUCCESS:
      return { ...state, albumMap: { ...state.albumMap, [action.payload.album.idAlbum]: action.payload.idAlbum } };
    default:
      return state;
  }
};
