import React from 'react';
import {
  Avatar, FlatList, HStack, Pressable, Text, View, VStack
} from 'native-base';
import FastImage from 'expo-fast-image';
import { useSelector } from 'react-redux';
import { COLORS } from '../../functions/constants';
import useReload from '../../hooks/useReload';
import { getLikes, like, unLike } from '../../redux/actions/postsActions';
import LikesBody from '../../components/Posts/LikesBody';

function Likes({ navigation, route: { params: { likes, postId } } }) {
  const parent = navigation.getParent();
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    (async function () {
      const likesData = await getLikes(postId);
      setData(likesData);
    }());
  }, [postId]);

  React.useEffect(() => {
    parent.setOptions({ tabBarStyle: { display: 'none' } });

    return () => {
      parent.setOptions({ tabBarStyle: { display: 'flex' } });
    };
  }, [navigation]);

  return (
    <>
      {data?.length ? (
        <FlatList
          data={data}
          height="100%"
          backgroundColor={COLORS.white2}
          pl="20px"
          pr="20px"
          pt="20px"
          flex={1}
          width="100%"
          renderItem={({ item: el }) => {
            return (
              <LikesBody el={el} postId={postId} />
            );
          }}
        />
      ) : (
        <View backgroundColor={COLORS.white2} height="100%" width="100%" flex={1} justifyContent="center" alignItems="center">
          <Text color={COLORS.gray}>Нет лайков</Text>
        </View>
      )}
    </>
  );
}

export default Likes;
