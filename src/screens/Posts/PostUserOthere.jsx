import React from 'react';
import { FlatList } from 'native-base';
import { useSelector } from 'react-redux';
import { COLORS } from '../../functions/constants';
import PostBody from '../../components/Posts/PostBody';
import { getMyWishLists, getUserPosts } from '../../redux/actions/postsActions';

function PostUserOthere() {
  const { oneUser } = useSelector((state) => state.user);
  const { otherUserPosts } = useSelector((state) => state.posts);
  React.useEffect(() => {
    (async function () {
      await getUserPosts(oneUser?.id);
    }());
  }, [oneUser?.id]);
  return (
    <FlatList
      data={otherUserPosts}
      keyExtractor={(item) => item.id}
      width="100%"
      backgroundColor={COLORS.white2}
      display="flex"
      flex={1}
      renderItem={({ item: el }) => {
        return <PostBody key={el.id} my={false} el={el} more />;
      }}
    />
  );
}

export default PostUserOthere;
