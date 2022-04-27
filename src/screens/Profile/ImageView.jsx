import React from 'react';
import {
  ScrollView, StyleSheet, Dimensions, View
} from 'react-native';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import MaskedView from '@react-native-community/masked-view';
import * as FileSystem from 'expo-file-system/build/FileSystem';
import { useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import { HStack, Spinner } from 'native-base';
import { updateAvatar } from '../../redux/actions/userActions';
import useLoader from '../../hooks/useLoader';
import {
  ImageViewBottom,
  ImageViewCancel,
  ImageViewContainer,
  ImageViewHeader,
  ImageViewSource, ImageViewSourceContainer,
  ImageViewTitle
} from '../../styles/profile';
import { COLORS } from '../../functions/constants';
import { goBack } from '../../functions/helpers';

const { width } = Dimensions.get('window');

function roundOff(v) {
  return Math.round(v);
}

function dimensions() {
  // eslint-disable-next-line no-underscore-dangle
  const _borderRadius = roundOff((375 + width) / 2);
  return { _borderRadius };
}

function ImageView({
  route, navigation, camera
}) {
  const { start, stop, loading } = useLoader(false);
  const { userInfo } = useSelector((state) => state.user);
  const params = route?.params;
  const addWish = route?.params?.addWish;
  const cameraNavigation = route?.params?.camera;
  const pushWishImage = route?.params?.pushWishImage;
  const [url, setUrl] = React.useState(null);

  const manipulateImage = async (image) => {
    const manipResult = await manipulateAsync(
      image.localUri || image.uri,
      [],
      { compress: 0.5, format: SaveFormat.JPEG }
    );
    setUrl(manipResult);
  };

  React.useEffect(() => {
    const parent = navigation.getParent();
    parent.setOptions({ tabBarStyle: { display: 'none' } });
    return () => {
      parent.setOptions({ tabBarStyle: { display: 'flex' } });
    };
  }, []);

  React.useEffect(() => {
    (async function () {
      await manipulateImage(params?.image);
    }());
  }, [params?.image]);

  const handleSubmit = async () => {
    start();
    if (addWish) {
      goBack();
      pushWishImage(url);
    } else {
      const base64 = await FileSystem.readAsStringAsync(url?.uri, { encoding: 'base64' });
      await updateAvatar(base64, userInfo?.id).then(goBack);
    }
    stop();
  };

  const handleChangeLibrary = async () => {
    const image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });
    await manipulateImage(image);
  };

  const handleChangeCamera = async () => {
    const { status } = ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      const image = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
      });
      if (!image.cancelled) {
        await manipulateImage(image);
      }
    } else {
      alert('Нет доступа');
    }
  };

  if (loading) {
    return (
      <HStack backgroundColor="#fff" height="100%" width="100%" justifyContent="center" alignItems="center">
        <Spinner color="indigo.500" size="lg" />
      </HStack>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={styles.container}>
      <ImageViewContainer>
        <ImageViewHeader>
          <ImageViewCancel onPress={goBack}>Отмена</ImageViewCancel>
          <ImageViewTitle>Фото профиля</ImageViewTitle>
        </ImageViewHeader>
        <ImageViewSourceContainer>
          <MaskedView
            style={{ flex: 1, backgroundColor: COLORS.transparent }}
            maskElement={(
              <View
                style={{
                  backgroundColor: COLORS.black2,
                  flex: 1,
                }}
              >
                <View
                  style={{
                    backgroundColor: COLORS.purple2,
                    // eslint-disable-next-line no-underscore-dangle
                    borderRadius: dimensions()._borderRadius,
                    flex: 1,
                  }}
                />
              </View>
                          )}
          >
            <ImageViewSource resizeMode="cover" source={{ uri: url?.uri }} />
          </MaskedView>

        </ImageViewSourceContainer>
        <ImageViewBottom>
          {(camera || cameraNavigation) ? (
            <ImageViewCancel onPress={handleChangeCamera}>
              Переснять
            </ImageViewCancel>
          )
            : <ImageViewCancel onPress={handleChangeLibrary}>Выбрать другое</ImageViewCancel>}
          <ImageViewCancel onPress={handleSubmit} bold>Использовать</ImageViewCancel>
        </ImageViewBottom>
      </ImageViewContainer>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black
  },
  // eslint-disable-next-line react-native/no-unused-styles
  circle: {
    // eslint-disable-next-line no-underscore-dangle
    borderRadius: dimensions()._borderRadius
  }
});

export default ImageView;
