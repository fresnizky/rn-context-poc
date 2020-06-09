import React, { memo, useContext, useEffect } from 'react';
import { ScrollView, Text, Image, View, FlatList } from 'react-native';
import { useAlbumEffect } from '../state-mgmt/album/useAlbumEffect';
import { GlobalContext } from '../state-mgmt/GlobalState';

export interface Props {
  route: any; // RouteProp<{ id: string; }, any>; /** @todo find out how to use this type */
}

const Item = ({ route }: Props) => {
  const { state } = useContext(GlobalContext);
  const artist = state.artist.artistMap[route?.params?.id];
  const albums = state.album;
  const { searchAlbumByArtistId } = useAlbumEffect();

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
      {albums && (
        <View>
          <Text>Albums:</Text>
          {Object.keys(albums).map(albumId => (
            <Text key={albumId}>{albums[albumId].strAlbum}</Text>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default memo(Item);
