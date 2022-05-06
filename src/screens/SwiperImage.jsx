import React from 'react';
import ImageViewer from 'react-native-image-zoom-viewer';
import {
  Modal, Platform, TouchableOpacity
} from 'react-native';
import {
  Box, Image, Text
} from 'native-base';
import { COLORS } from '../functions/constants';
import { goBack } from '../functions/helpers';
import { Loader } from '../components';

function SwiperImage({ navigation, route: { params: { images } } }) {

  React.useEffect(() => {
    const parent = navigation.getParent();
    parent.setOptions({ tabBarStyle: { display: 'none' } });
    return () => {
      parent.setOptions({ tabBarStyle: { display: 'flex' } });
    };
  }, []);

  const renderImage = (currentPage) => {
    return (
      <Box width="100%" height="100%" justifyContent="center" alignItems="center">
        <Image resizeMode="cover" width="100%" height="250px" source={{ uri: currentPage.source.uri }} />
      </Box>
    );
  };

  const renderHeader = (currentPage) => {
    return (
      <Box
        zIndex={1}
        top={Platform.OS === 'android' ? '10px' : '44px'}
        position="absolute"
        width="100%"
        height="44px"
        alignItems="center"
        flexDirection="row"
      >
        <TouchableOpacity
          onPressIn={goBack}
          style={{
            height: 26, width: 26, left: 20, zIndex: 2
          }}
        >
          <Image zIndex="100" size="26px" source={require('../assets/images/icons/swiperBack.png')} />
        </TouchableOpacity>
        <Text left="43%" position="absolute" alignSelf="center" fontFamily="NunitoBold" fontSize="17px" color={COLORS.white2}>
          {currentPage + 1}
          {' '}
          из
          {' '}
          {images.length}
        </Text>
      </Box>
    );
  };

  return (
    <Modal visible transparent>
      <ImageViewer
        renderImage={renderImage}
        useNativeDriver
        loadingRender={() => <Loader />}
        renderIndicator={() => null}
        renderHeader={renderHeader}
        imageUrls={images}
      />
    </Modal>
  );
}

export default SwiperImage;
