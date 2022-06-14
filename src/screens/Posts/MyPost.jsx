import React from 'react';
import { FlatList } from 'native-base';
import { useSelector } from 'react-redux';
import { COLORS } from '../../functions/constants';
import PostBody from '../../components/Posts/PostBody';
import { getMyWishLists } from '../../redux/actions/postsActions';

function MyPost() {
  const { userPosts } = useSelector((state) => state.posts);
  React.useEffect(() => {
    (async function () {
      await getMyWishLists();
    }());
  }, []);
  return (
    <FlatList
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
