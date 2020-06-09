import { IAlbum } from './state';

export enum ACTION_TYPE {
  SEARCH_SUCCESS = '[album] search album success'
}

export const actions = {
  searchSuccess: (albumList: IAlbum[]) => ({ type: ACTION_TYPE.SEARCH_SUCCESS, payload: { albumList } })
};
