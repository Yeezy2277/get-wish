import React from 'react';
import {
  Avatar, HStack, Image, Pressable, Text, View, VStack
} from 'native-base';
import Carousel from 'react-native-snap-carousel';
import { Dimensions, Animated } from 'react-native';
import { useSelector } from 'react-redux';
import FastImage from 'expo-fast-image';
import FadeInOut from 'react-native-fade-in-out';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { Video } from 'expo-av';
import { COLORS } from '../../functions/constants';
import { like, unLike } from '../../redux/actions/postsActions';
import useReload from '../../hooks/useReload';
import { delay } from '../../functions';
import { goToComments, goToLikes, isVideo } from '../../functions/helpers';
import { convertComment } from '../../functions/dates2';
import { TextParser } from '../index';
import { ActionSheets } from '../../functions/ActionSheet';
import { useI18n } from '../../i18n/i18n';

const assets = {
  like: require('../../assets/images/icons/posts/like.png'),
  unlike: require('../../assets/images/icons/users/post/like.png')
};

function RenderVideo({ item }) {
  let video = React.useRef(null);
  const [status, setStatus] = React.useState({});


    const onFullscreenUpdate = ({fullscreenUpdate, status}) => {
        video.current.dismissFullscreenPlayer()
    }

    return (
    <Pressable height="375px" width="100%" onPress={() => (status.isPlaying ? video.current.pauseAsync() : video.current.playAsync())}>
      <Video
        source={{
          uri: item,
        }}
        onFullscreenUpdate={onFullscreenUpdate}
        ref={video}
        style={{ width: '100%', height: 375, zIndex: 5 }}
        useNativeControls
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={(statusLocal) => setStatus(() => statusLocal)}
      />
    </Pressable>
  );
}

function PostBody({
  more, el, my, key, lenta
}) {
  const t = useI18n();
  const [index, setIndex] = React.useState(0);
  const [lastPress, setLastPress] = React.useState(0);
  const { width } = Dimensions.get('screen');
  const { oneUser } = useSelector((state) => state.user);
  const { reloadValue, reload } = useReload();
  const { userInfo } = useSelector((state) => state.user);
  const { userPosts, otherUserPosts, lentaPosts } = useSelector((state) => state.posts);
  const [source, setSource] = React.useState(HasYourLike ? assets.unlike : assets.like);
  const { reloadValue: reloadValueGlobal } = useSelector((state) => state.generic);
  const { showActionSheetWithOptions } = useActionSheet();
  const state = new ActionSheets(t, showActionSheetWithOptions);
  const [visible, setVisible] = React.useState(false);

  const toggleVisible = () => {
    setVisible(!visible);
  };

  function RenderItem({ item, index }) {
    return (
      <Pressable onPress={handleDoublePress} position="relative">

        {isVideo(item) ? (
          <RenderVideo item={item} />
        )
          : <View height="375px" width="100%"><Image alt="image" zIndex={5} height="375px" width="100%" source={{ uri: item }} /></View>}

          {!isVideo(item) ? <FadeInOut style={{ bottom: '30%' }} useNativeDriver visible={visible} duration={350}>
          <Image
            onPress={handleDoublePress}
            alt="like_big"
            source={require('../../assets/images/icons/posts/like_big.png')}
            style={{
              height: 153,
              width: 153,
              position: 'absolute',
              alignSelf: 'center',
              bottom: '30%',
              zIndex: 9999,
            }}
          />
        </FadeInOut> : null}
        {el.attachments?.length > 1 ? (
          <View
            position="absolute"
            right="15px"
            top="15px"
            width="32px"
            height="21px"
            backgroundColor="rgba(26, 26, 26, 0.6)"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="6px"
          >
            <Text
              fontSize="12px"
              fontWeight="600"
              zIndex={111}
              color="#FFFFFF"
            >
              {index + 1}
              /
              {el.attachments?.length}
            </Text>
          </View>
        ) : null}

      </Pressable>
    );
  }

  const likeHandler = async () => {
    await like(el.id, my, lenta);
    setSource(assets.unlike);
    reload();
  };

  const likeHandlerDouble = async () => {
    toggleVisible();
    await like(el.id, my, lenta);
    setSource(assets.unlike);
    reload();
    delay(1500).then(
      setVisible(false)
    );
  };

  const unlikeHandlerDouble = async () => {
    await unLike(el.id, my, lenta);
    setSource(assets.like);
    reload();
  };

  const unlikeHandler = async () => {
    await unLike(el.id, my, lenta);
    setSource(assets.like);
    reload();
  };


  const HasYourLike = React.useMemo(() => {
    let has = false;
    if (el?.likes?.liked) {
      has = true;
    }
    return has;

  }, [el?.likes?.friends, el?.likes?.liked, lentaPosts, userPosts, otherUserPosts, reloadValue, reloadValueGlobal, el]);

    const handleDoublePress = () => {
    let delta = new Date().getTime() - lastPress;
    if (delta < 200) {
      if (HasYourLike) {
        unlikeHandlerDouble();
      } else {
        likeHandlerDouble();
      }
    }

    setLastPress(new Date().getTime());

  };

  const firstLikeUser = el?.likes?.friends[0]?.user?.username;

  const count = React.useMemo(() => {
      if (el?.likes?.friends?.find(friend => friend.user.id === userInfo.id)) {
          return el?.likes?.count - 1;
      } else {
          return el?.likes?.friends;
      }
  }, [])

  return (
    <View key={key} paddingBottom="15px" borderBottomWidth={1} borderBottomColor="#EBEFFF">
      <HStack alignItems="center" paddingLeft="15px" paddingRight="15px" paddingTop="10px" paddingBottom="10px">
        <Avatar size="26px" source={el?.user?.avatar ? { uri: el?.user?.avatar } : require('../../assets/images/icons/profile/avatar.png')} />
        <Text marginLeft="10px" fontSize="16px" color={COLORS.black}>{el?.user.username}</Text>
        {more && (
        <Pressable
          onPress={() => state.showPostAction(el.id, my)}
          marginLeft="auto"
          paddingRight="10px"
          width="20px"
          height="20px"
          display="flex"
          justifyContent="center"
          alignItems="flex-end"
        >
          <Image alt="image" resizeMode="cover" width="3px" height="15px" source={require('../../assets/images/icons/profile/desires/menu.png')} />
        </Pressable>
        )}
      </HStack>
      <View
        display="flex"
        position="relative"
        height="375px"
        width="100%"
      >
        <Carousel
          layout="default"
          data={el?.attachments}
          sliderWidth={width}
          itemWidth={width}
          renderItem={(element) => RenderItem(element)}
          onSnapToItem={(idx) => setIndex(idx)}
        />
      </View>
      <HStack position="relative" height="28px" flexDirection="row" alignItems="center" marginTop="12px" marginLeft="15px">
        <HStack position="absolute" zIndex={11} alignItems="center" space="19px">
          <Pressable onPress={HasYourLike ? unlikeHandler : likeHandler}>
            <FastImage
              alt="test"
              zIndex={11}
              size="28px"
              style={{
                width: 28,
                height: 28
              }}
              source={HasYourLike ? assets.unlike : assets.like}
            />
          </Pressable>
          <Pressable onPress={() => goToComments(
            {
              description: el.text,
              postId: el?.id,
              descriptionAuthor: lenta ? el?.user : my
                ? userInfo : oneUser,
              date: el.created_at
            }
          )}
          >
            <Image alt="comment" size="28px" source={require('../../assets/images/icons/users/post/comment.png')} />
          </Pressable>
          <Pressable onPress={() => state.showShareAction()}>
            <Image alt="share" size="28px" source={require('../../assets/images/icons/users/post/share.png')} />
          </Pressable>
        </HStack>
        <HStack zIndex={9} position="absolute" left={0} right={0} justifyContent="center" space="5px">
          {el?.attachments
            ?.length > 1 ? el?.attachments?.length && el?.attachments.map((_, indexImage) => {
              return (
                <View borderRadius="2.5px" height="5px" width="5px" backgroundColor={index === indexImage ? COLORS.purple : '#D4DAEC'} />
              );
            }) : null}
        </HStack>
      </HStack>
      <HStack alignItems="center" space="md" marginTop="10px" marginLeft="15px" marginRight="15px">
        {el?.likes?.friends?.length ? (
          <>
            <HStack>
              {el?.likes?.friends?.map((el, idx) => {
                return (
                  <Avatar
                    zIndex={idx === 0 ? 3 : idx === 1 ? 2 : 1}
                    borderWidth={2}
                    borderColor={COLORS.white2}
                    size="24px"
                    source={{ uri: el?.user?.avatar }}
                  />
                );
              })}
            </HStack>
            {my || lenta ? (
              <VStack>
                {el?.likes?.friends?.length ? (
                  <Text
                    onPress={() => goToLikes({
                      likes: el?.likes?.friends, postId: el.id, my, lenta
                    })}
                    maxWidth="283px"
                    fontSize="14px"
                  >
                    Нравится
                    {' '}
                    <Text fontFamily="NunitoBold">{firstLikeUser}</Text>
                    {' '}
                    {el?.likes?.count > 1
                      ? `и ещё ${count}` : null}
                  </Text>
                ) : el?.likes?.count ? (
                  <Text>
                    Нравится:
                    {el?.likes?.count}
                  </Text>
                ) : null}

              </VStack>
            ) : null}
          </>
        ) : null}
      </HStack>
      <Text fontSize="14px" paddingLeft="15px" paddingRight="15px" width="100%" marginTop="10px">
        <Text fontFamily="NunitoBold">{el?.user?.username}</Text>
        {' '}
        <TextParser
          post={{
            description: el?.text,
            descriptionAuthor: my ? userInfo : oneUser,
            date: el?.created_at
          }}
          maxLenght
          description={el?.text}
        />
      </Text>
      {el?.comments?.friends?.map((com) => {
        return (
          <Text fontSize="14px" paddingLeft="15px" paddingRight="15px" width="100%" marginTop="10px">
            <Text fontFamily="NunitoBold">{com?.user?.username}</Text>
            {' '}
            <TextParser
              post={{
                description: com?.text,
                descriptionAuthor: my ? userInfo : oneUser,
                date: com?.created_at
              }}
              maxLenght
              description={com?.text}
            />
          </Text>
        );
      })}
      {el?.comments?.count ? (
        <Text
          onPress={() => goToComments(
            {
              description: el.text,
              postId: el?.id,
              descriptionAuthor: my ? userInfo : oneUser,
              date: el.created_at
            }
          )}
          paddingLeft="15px"
          marginTop="10px"
          color={COLORS.gray}
          fontSize="12px"
          fontWeight="400"
        >
          Смотреть все комментарии (
          {el?.comments?.count}
          )
        </Text>
      ) : null}
      <Text
        paddingLeft="15px"
        marginTop="10px"
        color={COLORS.gray}
        fontSize="12px"
        fontWeight="400"
      >
        {convertComment(el?.created_at)}
      </Text>
    </View>
  );
}

export default PostBody;
