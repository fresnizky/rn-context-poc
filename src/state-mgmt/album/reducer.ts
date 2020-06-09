import { ACTION_TYPE } from './actions';
import { IAlbumState } from './state';
import { IAction } from '../types';

export const reducer = (state: IAlbumState, action: IAction): IAlbumState => {
  switch (action.type) {
    case ACTION_TYPE.SEARCH_SUCCESS:
      return { ...state, ...action.payload.albumList.reduce((total, curr) => ({ ...total, [curr.idAlbum]: curr }), state.albumMap) };
    default:
      return state;
  }
};
