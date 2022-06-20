import React from 'react';
import {
  Image, Pressable, Text, View
} from 'native-base';
import RNPickerSelect from 'react-native-picker-select';
import * as MediaLibrary from 'expo-media-library';
import { Dimensions, StyleSheet, FlatList } from 'react-native';
import Toast from 'react-native-toast-message';
import ReactNativeZoomableView from '@openspacelabs/react-native-zoomable-view/src/ReactNativeZoomableView';
import FastImage from 'expo-fast-image';
import Header from '../Header/Header';
import { filterImages } from '../../functions/helpers';
import { COLORS } from '../../functions/constants';
import { convertDuration } from '../../functions/dates';
import { AddPostContext } from '../../screens/Posts/AddPost';
import useLoader from '../../hooks/useLoader';

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Nunito',
    height: 22,
    color: '#1A1A1A',
    width: 91,
    maxWidth: 91
  },
  inputAndroid: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Nunito',
    color: '#1A1A1A',
    height: 22,
    maxWidth: 91,
    width: 91,
  },
});

function AddPostFirstStep() {
  const {
    navigation, checkedItems, setCheckedItems, onNextStep, onPrevStep
  } = React.useContext(AddPostContext);
  const { start, stop, loading } = useLoader(false);
  const [photos, setPhotos] = React.useState({});
  const [count, setCount] = React.useState(50);
  const [sort, setSort] = React.useState('modificationTime');
  const windowWidth = Dimensions.get('window').width;
  React.useEffect(() => {
    (async function () {
      const answer = await MediaLibrary.requestPermissionsAsync();
      if (answer.granted) {
        const data = await MediaLibrary.getAssetsAsync({
          mediaType: ['photo', 'video'],
          first: count,
          sortBy: sort
        });
        setPhotos(data?.assets);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Нет доступа',
          position: 'bottom',
          bottomOffset: 95
        });
      }

    }());
  }, [sort, count]);

  const zoomableViewRef = React.createRef();

  const handleAddCheckedItems = React.useCallback((id, uri, duration) => {
    filterImages(checkedItems, setCheckedItems, id, uri, duration);
    zoomableViewRef?.current?.zoomTo(1);
  }, [checkedItems]);

  const checkContainsCheck = React.useCallback((idCheck) => {
    return !!checkedItems.find((element) => element.id === idCheck);
  }, [checkedItems]);

  const selectedImage = React.useMemo(() => {
    if (checkedItems.length > 0) {
      return {
        uri:
        checkedItems[checkedItems.length - 1].uri,
        duration: checkedItems[checkedItems.length - 1].duration
      };
    }
    return null;

  }, [checkedItems]);

  const onNextStepHandler = () => {
    let maybeNext = true;
    checkedItems.forEach((check) => {
      if (check?.duration) {
        if (check?.duration[0] !== '0' && check?.duration[1] !== '0') {
          maybeNext = false;
        }
      }
    });
    if (!maybeNext) {
      return Toast.show({
        type: 'error',
        text1: 'Нельзя загружать ролики длиной более минуты',
        position: 'bottom',
        bottomOffset: 95
      });
    }
    if (!checkedItems.length) {
      return Toast.show({
        type: 'error',
        text1: 'Сначала нужно что-то выбрать',
        position: 'bottom',
        bottomOffset: 95
      });
    }
    onNextStep();
  };

  const handleAfterZoom = (event, gestureState, zoomableViewEventObject) => {

  };


  const RenderZoomElement = React.useCallback((init) => {
    return selectedImage?.uri
      ? (
        <View height="375px" maxHeight="375px" width="100%">
          {!selectedImage?.duration ? (
            <ReactNativeZoomableView
              maxZoom={1.8}
              minZoom={1}
              onZoomAfter={handleAfterZoom}
              zoomStep={0.5}
              ref={zoomableViewRef}
              initialZoom={init}
              contentWidth={windowWidth}
              contentHeight={375}
              bindToBorders
              style={{
                maxHeight: 375,
                height: 375,
                width: '100%',
              }}
            >
              <FastImage
                alt="source"
                source={{ uri: selectedImage?.uri }}
                style={{
                  width: '100%',
                  height: 375
                }}
              />
            </ReactNativeZoomableView>
          ) : (
            <FastImage
              alt="source"
              source={{ uri: selectedImage?.uri }}
              style={{
                width: '100%',
                height: 375
              }}
            />
          )}
        </View>
      ) : (
        <View
          width="100%"
          height="375px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text>Фото/Видео не выбрано</Text>
        </View>
      );
  }, [selectedImage?.duration, selectedImage?.uri, windowWidth]);

  const loadMore = () => {
    setCount(((prevState) => prevState + 50));
  };

  return (
    <>
      <Header
        cancel={false}
        cancelText
        nextHandler={onNextStepHandler}
        title="Новый пост"
        navigation={navigation}
      />
      {RenderZoomElement(1) }
      <View
        marginLeft="15px"
        mt="10px"
        width="99px"
        mb="10px"
      >
        <RNPickerSelect
          style={{
            ...pickerSelectStyles,
            iconContainer: {
              top: 6,
              right: 0,
            },
          }}
          fixAndroidTouchableBug
          useNativeAndroidPickerStyle={false}
          value={sort}
          Icon={() => <Image width="8px" height="10px" source={require('../../assets/images/icons/posts/arrow.png')} />}
          onValueChange={(value) => setSort(value)}
          items={[
            { label: 'Недавние', value: 'modificationTime', key: 'modificationTime' },
            { label: 'По созданию', value: 'creationTime', key: 'creationTime' },
          ]}
        />
      </View>
      <FlatList
        data={photos}
        numColumns={4}
        onEndReachedThreshold={0.2}
        onEndReached={loadMore}
        columnWrapperStyle={{ display: 'flex', flexDirection: 'row' }}
        key="_"
        keyExtractor={(item) => `_${item.id}`}
        renderItem={({ item: el }) => {
          return (
            <Pressable
              onPress={() => handleAddCheckedItems(
                el.id,
                el.uri,
                el.duration !== 0 ? convertDuration(el.duration) : null
              )}
              height="93px"
              flexGrow={1}
              width="24.7%"
              borderWidth={1}
              borderColor={COLORS.white2}
              position="relative"
            >
              <FastImage
                alt={el.id}
                style={{ height: 93, maxWidth: '100%' }}
                source={{ uri: el?.uri }}
              />
              {el.mediaType === 'video' ? (
                <Text
                  fontFamily="NunitoBold"
                  right="5px"
                  position="absolute"
                  zIndex={4}
                  bottom="4px"
                  color={COLORS.black3}
                  fontSize="12px"
                  fontWeight="600"
                >
                  {convertDuration(el.duration)}
                </Text>
              ) : null}
              {checkContainsCheck(el.id) ? (
                <View
                  width="20px"
                  height="20px"
                  zIndex={4}
                  borderRadius="10px"
                  backgroundColor={COLORS.purple}
                  position="absolute"
                  top="5px"
                  right="5px"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Text color={COLORS.white2} fontSize="13px" fontWeight="700">{checkedItems.find((photo) => photo.id === el.id)?.idx}</Text>
                </View>
              ) : (
                <View
                  width="20px"
                  height="20px"
                  borderRadius="10px"
                  borderWidth={1}
                  borderColor="#C8CCE1"
                  backgroundColor={COLORS.white2}
                  position="absolute"
                  top="5px"
                  right="5px"
                />
              )}
            </Pressable>
          );
        }}
      />
    </>
  );
}

export default AddPostFirstStep;
