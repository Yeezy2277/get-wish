import React from 'react';
import {
  Fab,
  Image, Pressable, ScrollView, Text, View
} from 'native-base';
import { useSelector } from 'react-redux';
import { FlatList, RefreshControl } from 'react-native';
import { Video } from 'expo-av';
import { COLORS } from '../../functions/constants';
import EmptyPost from '../../components/Posts/EmptyPost';
import { getMyWishLists } from '../../redux/actions/postsActions';
import { goToAddPost, goToMyPost, isVideo } from '../../functions/helpers';

function PostMy() {
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    getMyWishLists().then(() => setRefreshing(false));
  }, []);
  const { userPosts } = useSelector((state) => state.posts);
  React.useEffect(() => {
    (async function () {
      await getMyWishLists();
    }());
  }, []);
  return (
    <>
      <ScrollView
        width="100%"
        height="100%"
        backgroundColor={COLORS.white2}
        display="flex"
        flex={1}
        refreshControl={(
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        )}
      >
        {userPosts?.length ? (
          <FlatList
            data={userPosts}
            numColumns={3} style={{
              marginBottom: 130
          }}
            columnWrapperStyle={{ display: 'flex', flexDirection: 'row' }}
            key="_"
            keyExtractor={(item) => `_${item.id}`}
            renderItem={({ item: el, index }) => {
              return (
                <Pressable
                  key={el.id}
                  onPress={() => goToMyPost({ id: el.id, index })}
                  height="125px"
                  width="33.2%"
                  borderWidth={1}
                  borderColor={COLORS.white2}
                  position="relative"
                >
                  {isVideo(el.attachments[0]) ? (
                    <Video
                      source={{
                        uri: el.attachments[0],
                      }}
                      style={{ maxWidth: '100%', height: 125 }}
                      resizeMode="cover"
                      isLooping={false}
                    />
                  ) : (
                    <Image
                      alt="text"
                      height="125px"
                      maxWidth="100%"
                      source={{ uri: el.attachments[0] }}
                    />
                  )}

                  {isVideo(el.attachments[0]) ? (
                    <Image
                      source={require('../../assets/images/icons/posts/video.png')}
                      height="15px"
                      position="absolute"
                      top="10px"
                      right="10px"
                      width="13px"
                    />
                  ) : el.attachments?.length > 1 ? (
                    <Image
                      source={require('../../assets/images/icons/posts/multi.png')}
                      height="16px"
                      position="absolute"
                      top="10px"
                      right="10px"
                      width="16px"
                    />
                  ) : null}
                </Pressable>
              );
            }}
          />
        ) : <EmptyPost variant={2} />}
      </ScrollView>
      {userPosts?.length ? (
        <Fab
          onPress={goToAddPost}
          renderInPortal={false}
          shadow={2}
          size="50px"
          mb="100px"
          backgroundColor={COLORS.purple}
          icon={(
            <Image
              size="20px"
              source={require('../../assets/images/icons/wishlist/plus.png')}
            />
                )}
        />
      ) : null}

    </>
  );
}

export default PostMy;
