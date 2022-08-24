import React from 'react';
import {
  Box, Text,
  View
} from 'native-base';
import { Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as ImagePicker from 'expo-image-picker';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { useDispatch, useSelector } from 'react-redux';
import * as FileSystem from 'expo-file-system/build/FileSystem';
import { COLORS } from '../../functions/constants';
import { WishListContainer } from '../../styles/wishlist';
import AuthButton from '../../components/Shared/AuthButton';
import InputText from '../../components/Inputs/InputText';
import ImagesChose from '../../components/Wish/ImagesChose';
import useLoader from '../../hooks/useLoader';
import { goToUserWishLists, manipulateImage } from '../../functions/helpers';
import {
  addWish, editWish, getMyWishLists, setWishId, setWishListAdded
} from '../../redux/actions/wishActions';
import { Loader } from '../../components';
import { wishCRUD } from '../../http/CRUD';
import store from '../../redux';
import { GO_BACK_ID } from '../../redux/constants/wishConstants';

function AddWish({ navigation, ...props }) {
  const { start, stop, loading } = useLoader(false);
  const { oneWishList } = useSelector((state) => state.wishList);
  const { myWishLists, addedWishId, addedWishIdBefore } = useSelector((state) => state.wish);
  const [serverImages, setServeImages] = React.useState([]);
  const [deleteImages, setDeleteImage] = React.useState([]);
  const [disabled, setDisabled] = React.useState(false);

  const [images, setImages] = React.useState([
    { id: 1 },
    { id: 2 },
    { id: 3, },
    { id: 4 },
    { id: 5, },
  ]);
  const dispatch = useDispatch();
  const id = React.useMemo(() => props?.route?.params?.id, [props?.route?.params?.id]);
  const backEdit = React.useMemo(
    () => props?.route?.params?.backEdit,
    [props?.route?.params?.backEdit]
  );
  const isEdit = !!id;
  const parent = navigation.getParent();

  React.useEffect(() => {
    parent.setOptions({ tabBarStyle: { display: 'none' } });
    return () => {
      parent.setOptions({ tabBarStyle: { display: 'flex' } });
    };
  }, [navigation, addedWishId]);

  React.useEffect(() => {
    return () => {
      if (backEdit) {
        dispatch({ type: GO_BACK_ID, payload: id });
      }
    };
  }, []);

  React.useEffect(() => {
    (async function getData() {
      start();
      await getMyWishLists();
      if (isEdit) {
        const wish = await wishCRUD.get(id);
        if (wish.data?.description) setDescription(wish.data?.description);
        setWishList(wish.data?.wishlist_id);
        if (wish.data?.name) setName(wish.data?.name);
        if (wish.data?.link) setLink(wish.data?.link);
        if (wish.data?.images?.length) {
          const serverImages = wish.data?.images;
          const localImages = images.map((el, idx) => {
            if (serverImages[idx]) {
              return { ...el, image: serverImages[idx] };
            }
            return { ...el };
          });
          setServeImages(serverImages);
          setImages(localImages);
        }
      }
      stop();
    }());
    return () => {
      setWishId(null);
      setWishListAdded(null);
    };
  }, []);

  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [wishlist, setWishList] = React.useState(oneWishList.id);
  const { showActionSheetWithOptions } = useActionSheet();

  React.useEffect(() => {
    (async function getDataWish() {
      if (addedWishIdBefore) {
        start();
        await getMyWishLists();
        setWishList(addedWishIdBefore);
        setWishId(null);
        setWishListAdded(null);
        stop();
      }
    }());
  }, [addedWishIdBefore]);

  const pushImage = async (image) => {
    let imagesLocal = [...images];
    const manipulateImageLocal = await manipulateImage(image);
    imagesLocal.every((el, idx) => {
      if (!el?.image) {
        imagesLocal[idx] = { ...imagesLocal[idx], image: manipulateImageLocal.uri };
        return false;
      } if (el?.image && idx === 4) {
        imagesLocal[idx] = { ...imagesLocal[idx], image: manipulateImageLocal.uri };
        return false;
      }
      return true;
    });
    setImages(imagesLocal);
    parent.setOptions({ tabBarStyle: { display: 'none' } });
  };

  const choseImage = () => {
    showActionSheetWithOptions(
      {
        options: ['Отмена', 'Выбрать из галереи', 'Сделать снимок'],
        title: 'Выбор фото',
        cancelButtonIndex: 0,
        userInterfaceStyle: 'dark'
      },
      async (buttonIndex) => {
        if (buttonIndex === 1) {
          const image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
          });
          if (!image.cancelled) {
            navigation.push('ImageView', {
              image,
              addWish: true,
              pushWishImage: pushImage
            });
          }
        } else if (buttonIndex === 2) {
          const { status } = await ImagePicker.requestCameraPermissionsAsync();
          if (status === 'granted') {
            const image = await ImagePicker.launchCameraAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: false,
              aspect: [4, 3],
              quality: 1,
            });
            if (!image.cancelled) {
              navigation.push('ImageView', {
                image,
                camera: true,
                addWish: true,
                pushWishImage: pushImage
              });
            }
          } else {
            alert('Нет доступа');
          }
        }
      }
    );
  };

  const deletePhoto = (id) => {
    let array = [...images];
    let idx = images.findIndex((el) => el.id === id);
    if (isEdit) {
      const img = array[idx]?.image;
      if (serverImages.find((el) => el === img)) {
        const idxServerImage = serverImages.findIndex((el) => el === img);
        setDeleteImage((prevState) => ([...prevState, idxServerImage]));
      }
    }
    array[idx] = { ...array[idx], image: null };
    setImages(array);
  };

  const handleAddWish = async () => {
    if (name.length) {
      start();
      const imagesLocal = [];
      if (isEdit) {
        // eslint-disable-next-line no-restricted-syntax
        for (const el of images) {
          if (el?.image) {
            if (!serverImages.find((serverImage) => serverImage === el?.image)) {
              // eslint-disable-next-line no-await-in-loop
              const base64 = await FileSystem.readAsStringAsync(el?.image, { encoding: 'base64' });
              imagesLocal.push(base64);
            }
          }
        }
      } else {
        // eslint-disable-next-line no-restricted-syntax
        for (const el of images) {
          if (el?.image) {
            // eslint-disable-next-line no-await-in-loop
            const base64 = await FileSystem.readAsStringAsync(el?.image, { encoding: 'base64' });
            imagesLocal.push(base64);
          }
        }
      }

      if (isEdit) {
        await editWish(
          id,
          name,
          description,
          link,
          wishlist,
          imagesLocal,
          deleteImages
        );
      } else {
        await addWish(
          name,
          description,
          link,
          wishlist,
          imagesLocal
        );
      }

      stop();
      if (oneWishList?.id === wishlist) {
        return goToUserWishLists({ id: oneWishList?.id, backToWish: true });
      }
      return goToUserWishLists({ id: wishlist });
    }
  };

  const screenHeight = Dimensions.get('window').height;
  return (
    <View style={{ Height: 'auto', maxHeight: screenHeight, flex: 1 }}>
      {loading ? <Loader /> : (
        <KeyboardAwareScrollView
          enableOnAndroid
          style={{ backgroundColor: COLORS.white, maxHeight: '85%', }}
          contentContainerStyle={{
            flexGrow: 1, minHeight: '85%', display: 'flex', flexDirection: 'column'
          }}
        >
          <WishListContainer style={{ alignItems: 'center' }}>
            <InputText value={name} onChange={setName} marginTop="20px" />
            <InputText link value={link} onChange={setLink} marginTop="20px" label="Ссылка" />
            <Text alignSelf="flex-start" fontSize="13px" color={COLORS.gray} maxWidth="308px" marginTop="10px">
              Сюда можно вставить ссылку на магазин или ещё на что-нибудь полезное
            </Text>
            <InputText
              disabled={disabled}
              setDisabled={setDisabled}
              description
              value={description}
              onChange={setDescription}
              marginTop="20px"
              label="Описание"
            />
            <Box alignSelf="flex-start" maxWidth="320px" marginTop="10px">
              <Text alignSelf="flex-start" fontSize="13px" color={COLORS.gray}>
                А здесь
                {' '}
                {(disabled || description.length === 150) ? <Text color={COLORS.red}>кратко</Text> : ''}
                {(disabled || description.length === 150) ? ' ' : ''}
                можно описать какие-нибудь важные детали, например, свой любимый цвет или размер
              </Text>
            </Box>
            <InputText
              active={wishlist}
              setActive={setWishList}
              data={myWishLists}
              select
              disabled={id}
              value={description}
              onChange={setDescription}
              marginTop="25px"
            />
            <Text alignSelf="flex-start" marginTop="10px" fontSize="13px" color={COLORS.gray}>
              {isEdit ? 'При редактировании, увы, нельзя изменить виш лист' : 'И, если хочешь, можешь поместить своё желание в другой вишлист'}
            </Text>
            <Box marginTop="35px" width="100%" flexDirection="row" justifyContent="space-between" alignItems="center">
              <Text fontSize="15px">Фотографии (до 5 шт)</Text>
              <Text onPress={choseImage} color={COLORS.purple} fontFamily="NunitoBold" fontSize="15px">Добавить</Text>
            </Box>
            <ImagesChose deletePhoto={deletePhoto} images={images} />
            <Text alignSelf="flex-start" marginTop="15px" fontSize="13px" color={COLORS.gray}>
              Первое загруженное фото будет установлено
              в качестве главного
            </Text>
          </WishListContainer>
        </KeyboardAwareScrollView>
      )}
      <Box alignItems="center" height="15%" pt="20px" width="100%" backgroundColor={COLORS.white2}>
        <AuthButton onPress={handleAddWish} active={name?.length && !loading}>
          Готово
        </AuthButton>
      </Box>
    </View>
  );
}

export default AddWish;
