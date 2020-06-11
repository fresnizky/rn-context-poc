import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';

import { useAlbumEffect } from './useAlbumEffect';
import { GlobalProvider, initialState } from '../GlobalState';
import { getMockDeps, getArtist_1, getAlbum_1 } from '../../../test-helpers';

describe('useAlbumEffect', () => {
  describe('searchAlbumByArtistId', () => {
    it('should fetch albums for an artist', async () => {
      const deps = getMockDeps();
      deps.apiService.request = () => Promise.resolve({ json: () => Promise.resolve({ album: [getAlbum_1()] }) });
      const wrapper = ({ children }: any) => <GlobalProvider deps={deps}>{children}</GlobalProvider>;
      const { result } = renderHook(() => useAlbumEffect(), { wrapper });

      await act(async () => {
        result.current.searchAlbumByArtistId(getArtist_1());
      });

      expect(deps.stateSnapshot.set).toBeCalledTimes(2);
      expect(deps.stateSnapshot.set).toBeCalledWith({
        ...initialState,
        album: { ...initialState.album, albumMap: { [getAlbum_1().idAlbum]: getAlbum_1() } }
      });
    });
  });
});
