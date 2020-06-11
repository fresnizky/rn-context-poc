import { IArtist } from './src/state-mgmt/artist/state';
import { Deps } from './src/state-mgmt/types';
import { IAlbum } from 'src/state-mgmt/album/state';

export const getMockDeps = (): Deps =>
  ({
    apiService: { request: jest.fn().mockResolvedValue({ json: () => ({}) }) },
    stateSnapshot: { set: jest.fn(), get: jest.fn().mockReturnValue({}) }
  } as any);

export const getArtist_1 = (): IArtist => ({
  idArtist: '1',
  intBornYear: 1970,
  strArtist: 'Freddie Mercuty',
  strArtistThumb: 'thumb.png',
  strArtistBanner: 'banner.png',
  strArtistFanart: 'fanart.png',
  strBiographyEN: 'this is a bio',
  strCountry: 'USA',
  strStyle: 'rock'
});

export const getAlbum_1 = (): IAlbum => ({
  idAlbum: '1',
  idArtist: '1',
  intYearReleased: '2000',
  strAlbum: 'Mr. Bad Guy',
  strAlbumCDart: 'cdart.png',
  strAlbumThumb: 'thumb.png',
  strAlbumThumbBack: 'thumbBack.png',
  strDescriptionEN: 'Album Description',
  strGenre: 'Pop'
});
