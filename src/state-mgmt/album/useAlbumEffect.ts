import { useContext, useCallback, useMemo } from 'react';

import { GlobalContext } from '../GlobalState';
import { actions } from './actions';
import { IAlbum } from './state';
import { IArtist } from '../artist/state'

export const useAlbumEffect = () => {
  const { dispatch, deps } = useContext(GlobalContext);
  const searchAlbum = useCallback(
    async (artist: IArtist) => {
      // deps.stateSnapshot.get().artist.artistMap // to get a snapshot of the current state
      const { albums } = await (await deps.apiService.request(`https://www.theaudiodb.com/api/v1/json/1/album.php?i=${artist.idArtist}`)).json();
      const [album] = (albums || []) as IAlbum[];
      if (album) dispatch(actions.searchSuccess(album));
      return album?.idAlbum;
    },
    [dispatch]
  );
  return useMemo(() => ({ searchAlbum }), [searchAlbum]);
};
