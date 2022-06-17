import React from 'react';
import { FlatList } from 'native-base';
import { useSelector } from 'react-redux';
import { RefreshControl } from 'react-native';
import { COLORS } from '../../functions/constants';
import PostBody from '../../components/Posts/PostBody';
import { getMyWishLists } from '../../redux/actions/postsActions';
import { getFriends } from '../../redux/actions/userActions';

function MyPost() {
  const [refreshing, setRefreshing] = React.useState(false);
  const { userPosts } = useSelector((state) => state.posts);
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    getMyWishLists().then(() => setRefreshing(false));
  }, []);
  React.useEffect(() => {
    (async function () {
      await getMyWishLists();
    }());
  }, []);
  return (
    <FlatList
      refreshControl={(
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
        )}
      data={userPosts}
      keyExtractor={(item) => item.id}
      width="100%"
      backgroundColor={COLORS.white2}
      display="flex"
      flex={1}
      renderItem={({ item: el }) => {
        return <PostBody key={el.id} my el={el} more />;
      }}
    />
  );
}

export default MyPost;
