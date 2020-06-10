import React, { memo, useContext, useEffect, useCallback, useMemo } from 'react';
import { ScrollView, Text, Image, View, FlatList } from 'react-native';
import { useAlbumEffect } from '../state-mgmt/album/useAlbumEffect';
import { GlobalContext } from '../state-mgmt/GlobalState';
import { IAlbum } from 'src/state-mgmt/album/state';

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
  console.log(albumList);

  const { searchAlbumByArtistId } = useAlbumEffect();
  const keyExtractor = useCallback((item: IAlbum) => item.idAlbum, []);
  const renderItem = useCallback(({ item }: { item: IAlbum }) => <Image style={{ width: 50, height: 50 }} source={{ uri: item.strAlbumThumb }} />, []);

  useEffect(() => {
    searchAlbumByArtistId(artist);
  }, [artist.idArtist]);

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <Image style={{ width: '100%', height: 100 }} source={{ uri: artist.strArtistBanner }} />
      <View style={{ padding: 15 }}>
        <Text>{artist.strArtist}</Text>
        <Text ellipsizeMode="head" numberOfLines={30}>
          {artist.strBiographyEN}
        </Text>
      </View>
      {albumList && (
        <View>
          <Text>Albums:</Text>
          <FlatList horizontal data={albumList} keyExtractor={keyExtractor} renderItem={renderItem} />
        </View>
      )}
    </ScrollView>
  );
};

export default memo(Item);
