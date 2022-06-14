import React from 'react';
import {
  Avatar, HStack, Image, Pressable, ScrollView, Text, VStack
} from 'native-base';
import { COLORS } from '../../functions/constants';
import PostBody from '../../components/Posts/PostBody';

function UserPost() {
  return (
    <ScrollView backgroundColor={COLORS.white2} width="100%" height="100%">
      <PostBody more />
    </ScrollView>
  );
}

export default UserPost;
