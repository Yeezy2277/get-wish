import React, {useState} from 'react';
import {Dimensions, Platform} from 'react-native';
import {
  Avatar, Box, HStack, Image, Input, Pressable, Text, View, VStack, FlatList, KeyboardAvoidingView
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
import {goToUserProfile, parseTags} from "../../functions/helpers";
import useLoader from "../../hooks/useLoader";
import {Loader} from "../index";
import {CheckSpaces} from "../../functions";
import {userCRUD} from "../../http/CRUD";
import {changeUserInfo} from "../../redux/actions/authActions";
import {useIsFocused} from "@react-navigation/native";

function Comments({
  navigation, route: {
    params: {
      descriptionAuthor, description, date, postId
    }
  }
}) {
  const { comments } = useSelector((state) => state.posts);
  const screenHeight = Dimensions.get('window').height;
  const { start, stop, loading } = useLoader(true);
  const [data, setData] = React.useState([]);
  const [comment, setComment] = React.useState('');
  const dispatch = useDispatch();
  const parent = navigation.getParent();

  const focused = useIsFocused();

  React.useEffect(() => {
    if (focused)
    parent.setOptions({ tabBarStyle: { display: 'none' } });

    return () => {
      parent.setOptions({ tabBarStyle: { display: 'flex' } });
    };
  }, [navigation, focused]);

  React.useEffect(() => {
    (async function () {
      start();
      try {
        await getComments(postId);
      } finally {
        stop()
      }
    }());
  }, [dispatch, postId]);

  const handleSendComment = async () => {
    const commentParse = await parseTags(comment)
    await sendComment(postId, commentParse);
    setComment('');
  };

  const RightIconEmpty = React.useCallback(() => {
    return (
        <Pressable zIndex={9999} position="absolute" top="0" bottom="0"
                   right="5px" justifyContent="center" alignSelf="center">
          <Image size="26px" source={require('../../assets/images/icons/posts/arrow_disabled.png')} />
        </Pressable>
    );
  }, [comment]);


  const RightIcon = React.useCallback(() => {
    return (
      <Pressable onPress={handleSendComment} zIndex={9999} position="absolute"
                 top="0" bottom="0"
                 right="5px" justifyContent="center" alignSelf="center">
        <Image size="26px" source={require('../../assets/images/icons/posts/arrow_next.png')} />
      </Pressable>
    );
  }, [comment]);

  const [showFriends, setShowFriends] = React.useState(false);
  const [term, setTerm] = React.useState('');
  const [debouncedTerm, setDebouncedTerm] = React.useState(term);
  const [friends, setFriends] = React.useState([]);

  const handleDescription = async (val) => {
      if (!CheckSpaces(val, comment)) {
        setComment(val);
        const array = val.match(/\@[a-z]*/gm);
        if (val.includes('@') && (val.endsWith(val.match(/\@[a-z]*/gm)[0]) || val.endsWith(array[array.length - 1]))) {
          if (array[array?.length - 1].length === 1 || array[0]?.length === 1) {
            const { data } = await getFriends();
            setFriends(data);
          }
          setShowFriends(true);
          if (array[array.length - 1]?.length) {
            setDebouncedTerm(array[array.length - 1].split('@')[1]);
          } else {
            setDebouncedTerm(array[0].split('@')[1])
          }
        } else {
          setShowFriends(false);
        }
      }
  };

  const [disabled, setDisabled] = useState(false)

  const handleKeyPress = ({ nativeEvent: { key: keyValue } }) => {
    if (comment) {
      if (comment.length >= 255 && keyValue !== 'Backspace') {
        setDisabled(true);
      } else {
        setDisabled(false);
      }
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
      } else setFriends(dataGetFriends?.slice(0, 5));

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

  const handleGoToUserHandler = async (id) => {
    const user = await userCRUD.get(id);
    await changeUserInfo('oneUser', user?.data);
    parent.setOptions({ tabBarStyle: { display: 'flex' } });
    navigation.navigate('Friends', {
      screen: 'UserProfile',
    });
  }

  return (
      <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? "padding" : 'none'}
          style={{ backgroundColor: COLORS.white, flex: 1 }}
          contentContainerStyle={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
      {loading ? <Loader/> : <View
          style={{
            Height: 'auto', maxHeight: screenHeight, flex: 1, position: 'relative'
          }}
          backgroundColor={COLORS.white2}
      >
        {showFriends && (
            <PostListFriendElement
                full2
                handleChooseUser={handleChooseUser}
                debouncedTerm={debouncedTerm}
                data={friends}
                setData={setFriends}
            />
        )}
        {description ? <View
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
        </View> : null}
        <FlatList
            height="100%"
            width="100%"
            flex={1}
            backgroundColor="#FFFFFF"
            data={comments}
            renderItem={({ item: el }) => {
              return (
                  <CommentsBody handleGoToUserHandler={handleGoToUserHandler} el={el} />
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
              _disabled={disabled}
              value={comment}
              display="flex"
              onKeyPress={handleKeyPress}
              onChangeText={disabled ? null : handleDescription}
              paddingLeft="12px"
              paddingRight="41px"
              multiline
              color="#1A1A1A"
              borderRadius="18px"
              InputRightElement={comment?.length ? <RightIcon /> : <RightIconEmpty/>}
              fontSize="15px"
              onFocus={handleFocus}
              onBlur={handleBlur}
              borderWidth={0}
              backgroundColor="#F7F7F7"
              placeholder="Твой комментарий"
              position="relative"
          />
        </Box>
      </View>}
    </KeyboardAvoidingView>
  );
}

export default Comments;
