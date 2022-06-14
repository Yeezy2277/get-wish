import React from 'react';
import {
  Fab,
  Image, Pressable, ScrollView, Text, View
} from 'native-base';
import { useSelector } from 'react-redux';
import { FlatList } from 'react-native';
import { COLORS } from '../../functions/constants';
import EmptyPost from '../../components/Posts/EmptyPost';
import { getMyWishLists } from '../../redux/actions/postsActions';
import { goToAddPost, goToMyPost } from '../../functions/helpers';

function PostMy() {
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
      >
        {userPosts?.length ? (
          <FlatList
            data={userPosts}
            numColumns={4}
            columnWrapperStyle={{ display: 'flex', flexDirection: 'row' }}
            key="_"
            keyExtractor={(item) => `_${item.id}`}
            renderItem={({ item: el }) => {
              return (
                <Pressable
                  key={el.id}
                  onPress={() => goToMyPost({ id: el.id })}
                  height="125px"
                  width="33.2%"
                  borderWidth={1}
                  borderColor={COLORS.white2}
                  position="relative"
                >
                  <Image
                    alt="text"
                    height="125px"
                    maxWidth="100%"
                    source={{ uri: el.attachments[0] }}
                  />
                  {el.attachments?.length > 1 ? (
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
