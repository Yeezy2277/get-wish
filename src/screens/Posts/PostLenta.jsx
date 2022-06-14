import React from 'react';
import { ScrollView } from 'native-base';
import { COLORS } from '../../functions/constants';
import PostBody from '../../components/Posts/PostBody';
import EmptyPost from '../../components/Posts/EmptyPost';

function PostLenta({ empty = true }) {
  return (
    <ScrollView
      width="100%"
      backgroundColor={COLORS.white2}
      display="flex"
      flex={1}
    >
      {empty ? <PostBody /> : <EmptyPost variant={1} />}
    </ScrollView>
  );
}

export default PostLenta;
