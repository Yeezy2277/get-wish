import React, {useRef} from 'react';
import { FlatList } from 'native-base';
import { useSelector } from 'react-redux';
import { RefreshControl } from 'react-native';
import { COLORS } from '../../functions/constants';
import PostBody from '../../components/Posts/PostBody';
import { getMyWishLists } from '../../redux/actions/postsActions';
import { getFriends } from '../../redux/actions/userActions';

function MyPost({route: {params}}) {
  const [refreshing, setRefreshing] = React.useState(false);
    const [ref, setRef] = React.useState(null);
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

  React.useEffect(() => {
      if (userPosts?.length && params?.index) {
          scrollToIndex()
      }
  }, [ref, params?.index])

    const scrollToIndex = () => {
        ref?.scrollToIndex({animated: true, index: params?.index, viewPosition: 0});
    }


    return (
    <FlatList
        ref={(ref) => {
            setRef(ref);
        }}
        refreshControl={(
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
        )}
      data={userPosts}
      keyExtractor={(item) => item.id}
        width="100%"
        onScrollToIndexFailed={info => {
            const wait = new Promise(resolve => setTimeout(resolve, 500));
            wait.then(() => {
                ref?.scrollToIndex({ index: info.index, animated: true });
            })}}
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
