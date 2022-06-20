import React from 'react';
import { FlatList, ScrollView } from 'native-base';
import { useSelector } from 'react-redux';
import { RefreshControl } from 'react-native';
import { COLORS } from '../../functions/constants';
import PostBody from '../../components/Posts/PostBody';
import EmptyPost from '../../components/Posts/EmptyPost';
import { getMyWishLists, getPostsForLenta } from '../../redux/actions/postsActions';

function PostLenta({ empty = true }) {
  const { lentaPosts } = useSelector((state) => state.posts);
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    getPostsForLenta().then(() => setRefreshing(false));
  }, []);
  React.useEffect(() => {
    (async function () {
      await getPostsForLenta();
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
      {lentaPosts?.length ? (
        <FlatList
          data={lentaPosts}
          keyExtractor={(item) => item.id}
          width="100%"
          backgroundColor={COLORS.white2}
          display="flex"
          style={{
              marginBottom: 130
          }}
          flex={1}
          renderItem={({ item: el }) => {
            return <PostBody lenta key={el.id} my={false} el={el} more />;
          }}
        />
      ) : <EmptyPost variant={1} />}
      </ScrollView>
    </>
  );
}

export default PostLenta;
