import React from 'react';
import {
  HStack, Image, Pressable, ScrollView, Text, View
} from 'native-base';
import { useSelector } from 'react-redux';
import { goToUserPost } from '../../functions/helpers';
import { PrivateAccount } from '../index';

function UserPosts() {
  const [posts] = React.useState([
    {
      key: 'first',
      image: { uri: 'https://wallpaperaccess.com/full/317501.jpg' }
    },
    {
      key: 'second',
      image: { uri: 'https://klike.net/uploads/posts/2019-06/1560664251_3.jpg' }
    },
    {
      key: 'third',
      multi: true,
      image: { uri: 'https://www.youloveit.ru/uploads/posts/2016-09/1473331543_youloveit_ru_girly_m_devushki_kartinki11.jpg' }
    },
    {
      key: 'fourth',
      video: true,
      image: { uri: 'https://oir.mobi/uploads/posts/2021-04/1618316566_37-oir_mobi-p-samie-krasivie-rozi-tsveti-krasivo-foto-39.jpg' }
    },
  ]);
  const { oneUser } = useSelector((state) => state.user);

  return (
    <ScrollView>
      {oneUser?.private ? (
        <PrivateAccount />
      ) : (
        <HStack maxWidth="100%" flexWrap="wrap">
          {posts.map((el) => (
            <Pressable
              height="125px"
              onPress={goToUserPost}
              key={el.key}
              width="33.333%"
            >
              <Image
                source={el.image}
                height="125px"
                width="100%"
              />
            </Pressable>
          ))}
        </HStack>
      )}
    </ScrollView>

  );
}

export default UserPosts;
