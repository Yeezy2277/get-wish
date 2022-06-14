import React from 'react';
import {
  Box,
  HStack, Image, Pressable, ScrollView, Text, View
} from 'native-base';
import { Dimensions, Platform } from 'react-native';
import Toast from 'react-native-toast-message';
import Header from '../Header/Header';
import { AddPostContext } from '../../screens/Posts/AddPost';
import { WishListContainer } from '../../styles/wishlist';
import { COLORS } from '../../functions/constants';
import InputText from '../Inputs/InputText';
import AuthButton from '../Shared/AuthButton';
import {
  covertToBlob, findVideoOrImageByStore, goToPostsUser, goToSwiper, goToUserPost
} from '../../functions/helpers';
import PostListFriendElement from './PostListFriendElement';
import { getFriends } from '../../redux/actions/userActions';
import useLoader from '../../hooks/useLoader';
import { addNewPost, editPost, getMyWishLists } from '../../redux/actions/postsActions';
import { Loader } from '../index';

function AddPostSecondStep() {
  const {
    navigation, checkedItems, step, setCheckedItems, onNextStep, onPrevStep
  } = React.useContext(AddPostContext);
  const [disabled, setDisabled] = React.useState(false);
  const [description, setDescription] = React.useState('');

  const [elements, setElements] = React
    .useState([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }]);

  React.useEffect(() => {
    if (checkedItems.length) {
      const localElements = elements.map((el, idx) => {
        if (checkedItems[idx]) {
          return { ...checkedItems[idx] };
        }
        return { ...el };
      });
      setElements(localElements);
    }
  }, [step]);

  const handleGoToSwiper = () => {
    goToSwiper({
      images: checkedItems.map((el) => {
        return { url: el.uri, ...el };
      }),
      hidePanel: true
    });
  };

  const RenderElements = React.useCallback(() => {
    return elements?.length ? elements.map((el) => {
      return (
        <Pressable onPress={handleGoToSwiper} key={el.id} size="66px" position="relative">
          <Image
            zIndex={1}
            borderRadius="10px"
            borderWidth={el?.uri ? '2px' : '0'}
            borderColor="#D4DAEC"
            size="68px"
            source={el?.uri ? { uri: el.uri } : require('../../assets/images/icons/posts/placeholder.png')}
          />
        </Pressable>
      );
    }) : null;

  }, [elements]);
  const screenHeight = Dimensions.get('window').height;
  const { start, stop, loading } = useLoader(false);
  const [showFriends, setShowFriends] = React.useState(false);
  const [term, setTerm] = React.useState('');
  const [debouncedTerm, setDebouncedTerm] = React.useState(term);
  const [friends, setFriends] = React.useState([]);

  const handleDescription = async (val) => {
    setDescription(val);
    if (val.includes('@') && val[val.length - 1] === '@') {
      const { data } = await getFriends();
      setFriends(data);
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
      const { data } = await getFriends(value, false);
      if (!data?.length) {
        setShowFriends(false);
        setDebouncedTerm('');
        setTerm('');
        setFriends([]);
      } else setFriends(data);

    } finally {
      stop();
    }

  }, []);

  const clearResults = React.useCallback(() => setTerm(''), []);

  const handleChooseUser = (username) => {
    if (description.split('@').length === 1) {
      const text = description.split('@')[0];
      setDescription(text.concat(`@${username}`));
    } else {
      let texts = description.split('@');
      texts.pop();
      let newTexts = texts.join('@').concat(`@${username}`);
      setDescription(newTexts);
    }
    setShowFriends(false);
    setFriends([]);
  };

  const publicHandlerPost = async () => {
    if (description) {
      start();
      try {
        let links = [];
        let friends = [];
        let friendsUnique = [];
        let desc = description;
        let users = desc.match(/\@[a-zA-Z]*/gm);
        if (users?.length) {
          for await (let user of users) {
            const { data: dataFriendsTag } = await getFriends(user.split('@')[1], false);
            dataFriendsTag.forEach((friend) => {
              if (friend.username === user.split('@')[1]) {
                friends.push({ name: friend.username, id: friend.id });
              }
            });
          }
          friends.filter((item) => {
            if (!friendsUnique.some((element) => element.id === item.id)) {
              friendsUnique.push(item);
            }
          });
          users.forEach((el) => {
            let object = friendsUnique.find((unique) => unique.name === el.split('@')[1]);
            desc = desc.replace(el, `<@${object.id}>`);
          });
        }
        if (checkedItems?.length) {
          for await (let element of checkedItems) {
            const id = await findVideoOrImageByStore(element.id);
            let filename = Platform.OS === 'ios' ? id.localUri.split('/').pop() : id.uri.split('/').pop();

            let match = /\.(\w+)$/.exec(filename);
            let nameType = 'image';
            if (match[1].toLowerCase() === 'mov' || match[1].toLowerCase() === 'mp4' || match[1].toLowerCase() === 'avi') {
              nameType = 'video';
            }
            let type = match ? `${nameType}/${match[1].toLowerCase()}` : nameType;
            links.push({ filename: id.filename, uri: Platform.OS === 'ios' ? id.localUri : id.uri, type });
          }
        }
        if (links?.length) {
          let otherElements = [...links];
          let first = otherElements.shift();
          let blob;
          if (Platform.OS === 'ios') blob = await covertToBlob(first.uri);
          else {
            const link = first.uri.replace('file:///', 'file:/');
            await Blob.build(first.uri);
          }
          const idFirst = await addNewPost(blob);
          if (otherElements?.length) {
            for await (let otherElement of otherElements) {
              let blobOther = await covertToBlob(otherElement.uri);
              await addNewPost(blobOther, idFirst);
            }
          }
          await editPost(idFirst, desc).then(async () => {
            await getMyWishLists();
            await goToPostsUser();
          }).catch(() => {
            Toast.show({
              type: 'error',
              text1: 'Ошибка при создании поста',
              position: 'bottom',
              bottomOffset: 95
            });
          });
        }
      } finally {
        stop();
      }
    } else {
      Toast.show({
        type: 'error',
        text1: 'Текст поста не может быть пустым',
        position: 'bottom',
        bottomOffset: 95
      });
    }
  };

  return (
    <View style={{
      Height: 'auto', maxHeight: screenHeight, flex: 1, position: 'relative'
    }}
    >
      <Header
        cancel
        backHandler={onPrevStep}
        title="Новый пост"
        navigation={navigation}
      />
      {loading ? <Loader /> : (
        <>
          <ScrollView height="100%" width="100%" flex={1} backgroundColor="#FFFFFF">
            <WishListContainer style={{ paddingTop: 20 }}>
              {showFriends && (
              <PostListFriendElement
                handleChooseUser={handleChooseUser}
                debouncedTerm={debouncedTerm}
                data={friends}
                setData={setFriends}
              />
              )}
              <Text fontSize="15px" fontWeight="600">Фото и видео</Text>
              <ScrollView minHeight="68px" maxHeight="68px" marginTop="20px" horizontal>
                <HStack space={3}>
                  {RenderElements()}
                </HStack>
              </ScrollView>
              <Text
                maxWidth="310px"
                marginTop="15px"
                fontSize="13px"
                color={COLORS.gray}
              >
                Ты можешь вернуться назад, чтобы выбрать другие фото или видео
              </Text>
              <InputText
                disabled={disabled}
                setDisabled={setDisabled}
                description
                value={description}
                height="200px"
                maxLength={300}
                maxHeight="200px"
                onChange={handleDescription}
                marginTop="30px"
                label="Текст поста"
              />
              <Text
                fontSize="13px"
                color={COLORS.gray}
                maxWidth="306px"
                marginTop="15px"
              >
                А ты знал, что можно ввести символ
                {' '}
                <Text color={COLORS.purple}>@</Text>
                {' '}
                и начать вводить никнейм или имя друга, чтобы упомянуть его в посте? Невероятно!
              </Text>
            </WishListContainer>
          </ScrollView>
          <Box alignItems="center" height="15%" pt="20px" width="100%" backgroundColor={COLORS.white2}>
            <AuthButton onPress={publicHandlerPost} active>
              Опубликовать
            </AuthButton>
          </Box>
        </>
      )}
    </View>
  );
}

export default AddPostSecondStep;
