import React, { memo, useContext, useEffect, useCallback, useMemo } from 'react';
import { ScrollView, Text, Image, View, FlatList } from 'react-native';
import { useAlbumEffect } from '../state-mgmt/album/useAlbumEffect';
import { GlobalContext } from '../state-mgmt/GlobalState';
import { IAlbum } from 'src/state-mgmt/album/state';
import styled from '@emotion/native';

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  line-height: 32px;
  margin-bottom: 5px;
`;

const Content = styled.Text`
  text-align: justify;
  font-size: 16px;
  line-height: 24px;
`;

const Container = styled.View`
  padding: 10px;
`;

const AlbumContainer = styled.FlatList`
  margin-right: -10px;
`;

const AlbumImage = styled.Image`
  width: 75px;
  height: 75px;
  margin-right: 10px;
`;

export interface Props {
  route: any; // RouteProp<{ id: string; }, any>; /** @todo find out how to use this type */
}

const Item = ({ route }: Props) => {
  const { state } = useContext(GlobalContext);
  const artist = state.artist.artistMap[route?.params?.id];

  const albumList = useMemo(
    () =>
      Object.values(
        Object.keys(state.album.albumMap)
          .filter(albumId => state.album.albumMap[albumId].idArtist === artist.idArtist && state.album.albumMap[albumId].strAlbumThumb !== null)
          .reduce((obj, albumId) => {
            return { ...obj, [albumId]: state.album.albumMap[albumId] };
          }, {})
      ),
    [state.album.albumMap]
  );

  const { searchAlbumByArtistId } = useAlbumEffect();
  const keyExtractor = useCallback((item: IAlbum) => item.idAlbum, []);
  const renderItem = useCallback(({ item }: { item: IAlbum }) => <AlbumImage source={{ uri: item.strAlbumThumb }} />, []);

  useEffect(() => {
    searchAlbumByArtistId(artist);
  }, [artist.idArtist]);

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <Image style={{ width: '100%', height: 100 }} source={{ uri: artist.strArtistBanner }} />
      <Container>
        <Title>{artist.strArtist}</Title>
        <Content ellipsizeMode="head" numberOfLines={30}>
          {artist.strBiographyEN.replace('\n', '\n\n')}
        </Content>
      </Container>
      {albumList && (
        <Container>
          <Title>Albums:</Title>
          <AlbumContainer horizontal data={albumList} keyExtractor={keyExtractor} renderItem={renderItem} />
        </Container>
      )}
    </ScrollView>
  );
};

export default memo(Item);
