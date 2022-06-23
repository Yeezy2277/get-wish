import React from 'react';
import {Dimensions, Platform} from 'react-native';
import {
  Avatar, Box, HStack, Image, Input, Pressable, Text, View, VStack, FlatList
} from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS } from '../../functions/constants';
import { convertComment } from '../../functions/dates2';
import { getFriends } from '../../redux/actions/userActions';
import PostListFriendElement from './PostListFriendElement';
import TextParser from '../Shared/TextParser';
import { getComments, sendComment } from '../../redux/actions/postsActions';
import CommentsBody from './CommentsBody';
import {parseTags} from "../../functions/helpers";

function Comments({
  navigation, route: {
    params: {
      descriptionAuthor, description, date, postId
    }
  }
}) {
  const { comments } = useSelector((state) => state.posts);
  const screenHeight = Dimensions.get('window').height;
  const [data, setData] = React.useState([]);
  const [comment, setComment] = React.useState('');
  const dispatch = useDispatch();
  const parent = navigation.getParent();
  React.useEffect(() => {
    parent.setOptions({ tabBarStyle: { display: 'none' } });

    return () => {
      parent.setOptions({ tabBarStyle: { display: 'flex' } });
    };
  }, [navigation]);

  React.useEffect(() => {
    (async function () {
      await getComments(postId);
    }());
  }, [dispatch, postId]);

  const handleSendComment = async () => {
    const commentParse = await parseTags(comment)
    await sendComment(postId, commentParse);
    setComment('');
  };

  const RightIcon = React.useCallback(() => {
    if (!comment.length) {
      return (
        <Pressable zIndex={9999} position="absolute" right="5px" bottom="5px">
          <Image size="26px" source={require('../../assets/images/icons/posts/arrow_disabled.png')} />
        </Pressable>
      );
    }
    return (
      <Pressable onPress={handleSendComment} zIndex={9999} position="absolute" right="5px" bottom="5px">
        <Image size="26px" source={require('../../assets/images/icons/posts/arrow_next.png')} />
      </Pressable>
    );
  }, [comment]);

  const [showFriends, setShowFriends] = React.useState(false);
  const [term, setTerm] = React.useState('');
  const [debouncedTerm, setDebouncedTerm] = React.useState(term);
  const [friends, setFriends] = React.useState([]);

  const handleDescription = async (val) => {
    setComment(val);
    if (val?.includes('@') && val[val.length - 1] === '@') {
      const { data: dataFriends } = await getFriends();
      setFriends(dataFriends);
      setShowFriends(true);
      if (val.split('@')[1].length) {
        setDebouncedTerm(val.split('@')[1]);
      }
    } else {
      setShowFriends(false);
    }
  };

  React.useEffect(() => {
    const timer = setTimeout(() => setTerm(debouncedTerm), 1000);
    return () => clearTimeout(timer);
  }, [debouncedTerm]);

  React.useEffect(() => {
    (async function Start() {
      if (term !== '') {
        await onSearchSubmit(term);
      } else {
        clearResults();
      }
    }());
  }, [term]);

  const onSearchSubmit = React.useCallback(async (value) => {
    try {
      const { data: dataGetFriends } = await getFriends(value, false);
      if (!dataGetFriends?.length) {
        setShowFriends(false);
        setDebouncedTerm('');
        setTerm('');
        setFriends([]);
      } else setFriends(data);

    } finally {
      stop();
    }

  }, []);

  const [onFocus, setFocused] = React.useState(false);

  const clearResults = React.useCallback(() => setTerm(''), []);

  const handleBlur = () => {
    setFocused(false);
  };
  const handleFocus = () => {
    setFocused(true);
  };

  const handleChooseUser = (username) => {
    if (comment.split('@').length === 1) {
      const text = comment.split('@')[0];
      setComment(text.concat(`@${username}`));
    } else {
      let texts = comment.split('@');
      texts.pop();
      let newTexts = texts.join('@').concat(`@${username}`);
      setComment(newTexts);
    }
    setShowFriends(false);
    setFriends([]);
  };

  return (
    <KeyboardAwareScrollView
      extraHeight={300}
      style={{ backgroundColor: COLORS.white, flex: 1 }}
      contentContainerStyle={{ flex: 1 }}
    >
      <View
        style={{
          Height: 'auto', maxHeight: screenHeight, flex: 1, position: 'relative'
        }}
        backgroundColor={COLORS.white2}
      >
        {showFriends && (
        <PostListFriendElement
          full
          top={Platform.OS === 'ios' && onFocus ? '5%' : '0px'}
          handleChooseUser={handleChooseUser}
          debouncedTerm={debouncedTerm}
          data={friends}
          setData={setFriends}
        />
        )}
        <View
          paddingTop="16px"
          paddingLeft="12px"
          paddingRight="15px"
          paddingBottom="15px"
          borderBottomWidth={1}
          borderBottomColor="#EBEFFF"
        >
          <HStack space={3}>
            <Pressable>
              <Avatar
                marginTop="3px"
                size="26px"
                source={descriptionAuthor?.avatar ? { uri: descriptionAuthor?.avatar }
                  : require('../../assets/images/icons/profile/avatar.png')}
              />
            </Pressable>
            <VStack flex={1}>
              <Text>
                <Text
                  fontFamily="NunitoBold"
                  fontSize="14px"
                  fontWeight="700"
                >
                  {descriptionAuthor?.username}
                  {'  '}
                </Text>
                <TextParser description={description} />
              </Text>
              <Text
                marginTop="10px"
                color={COLORS.gray}
                fontSize="12px"
                fontWeight="400"
              >
                {convertComment(date)}
              </Text>
            </VStack>
          </HStack>
        </View>
        <FlatList
          height="100%"
          width="100%"
          flex={1}
          backgroundColor="#FFFFFF"
          data={comments}
          renderItem={({ item: el }) => {
            return (
              <CommentsBody el={el} />
            );
          }}
        />
        <Box
          borderTopWidth={1}
          borderTopColor="#EBEFFF"
          paddingLeft="15px"
          paddingRight="10px"
          pb="8px"
          alignItems="center"
          minHeight="12%"
          pt="8px"
          width="100%"
          backgroundColor={COLORS.white2}
        >
          <Input
            value={comment}
            onChangeText={handleDescription}
            paddingLeft="12px"
            paddingRight="41px"
            multiline
            color="#1A1A1A"
            borderRadius="18px"
            InputRightElement={<RightIcon />}
            fontSize="15px"
            onFocus={handleFocus}
            onBlur={handleBlur}
            borderWidth={0}
            backgroundColor="#F7F7F7"
            placeholder="Твой комментарий"
            position="relative"
          />
        </Box>
      </View>
    </KeyboardAwareScrollView>
  );
}

export default Comments;
