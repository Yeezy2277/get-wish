import React from 'react';
import {
  Avatar, HStack, Pressable, Text, VStack
} from 'native-base';
import FastImage from 'expo-fast-image';
import { useDispatch, useSelector } from 'react-redux';
import { like, unLike } from '../../redux/actions/postsActions';
import useReload from '../../hooks/useReload';
import { RELOAD } from '../../redux/constants/wishListConstants';

const assets = {
  like: require('../../assets/images/icons/posts/like.png'),
  unlike: require('../../assets/images/icons/users/post/like.png')
};

function LikesBody({
  postId, el, lenta, my
}) {
  const [source, setSource] = React.useState(assets.unlike);
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.user);
  const [HasYourLike, setHasYourLike] = React.useState(false);
  const { reloadValue, reload } = useReload();

  React.useEffect(() => {
    return () => {
      dispatch({ type: RELOAD });
    };
  }, []);

  const likeHandler = async () => {
    await like(postId, my, lenta);
    setSource(assets.unlike);
    reload();
  };

  const unlikeHandler = async () => {
    await unLike(postId, my, lenta);
    setSource(assets.like);
    reload();
  };

  React.useEffect(() => {
    if (userInfo.id === el?.user.id) {
      setHasYourLike(true);
    }
  }, [el?.user.id, userInfo.id, reloadValue]);

  const likesHandler = async () => {
    if (userInfo.id === el?.user.id) {
      if (source === assets.unlike) {
        unlikeHandler();
      } else {
        likeHandler();
      }
    }
  };

  return (
    <Pressable onPress={likesHandler}>
      <HStack marginBottom="20px" space="10px" flexDirection="row" alignItems="center">
        <Avatar
          size="40px"
          source={el?.user?.avatar ? { uri: el?.user?.avatar }
            : require('../../assets/images/icons/profile/avatar.png')}
        />
        <VStack flex={1}>
          <Text
            fontSize="14px"
          >
            {el?.user?.username}
            {'  '}
          </Text>
        </VStack>
        {HasYourLike ? (
          <FastImage
            alt="test"
            zIndex={11}
            style={{
              marginLeft: 'auto',
              width: 26,
              height: 26
            }}
            source={source}
          />
        ) : null}
      </HStack>
    </Pressable>
  );
}

export default LikesBody;
