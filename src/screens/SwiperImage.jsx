import React from 'react';
import ImageViewer from 'react-native-image-zoom-viewer';
import {
  Modal, Platform, TouchableOpacity
} from 'react-native';
import {
  Box, Image, Pressable, Text
} from 'native-base';
import { Video } from 'expo-av';
import { COLORS } from '../functions/constants';
import { findVideoFromStore, goBack } from '../functions/helpers';
import { Loader } from '../components';

function RenderImage({ currentPage, images }) {
  let video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [link, setLink] = React.useState('');
  const isVideo = images.find((el) => el.uri === currentPage.source.uri)?.duration;

  React.useEffect(() => {
    (async function startPlayer() {
      if (isVideo) {
        let response;
        if (typeof isVideo === 'string')
          response = await findVideoFromStore(images, currentPage.source.uri);
        else if (typeof isVideo === 'boolean') {
          response = currentPage.source.uri;
        }
        await setLink(response);}
    }());
  }, [isVideo, video]);

  React.useEffect(() => {
    if (video?.current) {
      video.current.playAsync()
    }
  }, [link, video, currentPage])

  if (isVideo) {
    return (
      <Pressable
        width="100%"
        height="100%"
        justifyContent="center"
        alignItems="center"
        onPress={() => (status.isPlaying ? video.current.pauseAsync() : video.current.playAsync())}
      >
        <Video
          ref={video}
          source={{
            uri: link,
          }}
          style={{ width: '100%', height: 250 }}
          useNativeControls
          resizeMode="cover"
          isLooping={false}
          onPlaybackStatusUpdate={(statusLocal) => setStatus(() => statusLocal)}
        />
      </Pressable>
    );
  }
  return (
    <Box width="100%" height="100%" justifyContent="center" alignItems="center">
      <Image alt={currentPage.source.uri} resizeMode="cover" width="100%" height="250px" source={{ uri: currentPage.source.uri }} />
    </Box>
  );
}

function SwiperImage({ navigation, route: { params: { images, hidePanel } } }) {

  React.useEffect(() => {
    const parent = navigation.getParent();
    parent.setOptions({ tabBarStyle: { display: 'none' } });
    return () => {
      if (!hidePanel) parent.setOptions({ tabBarStyle: { display: 'flex' } });
    };
  }, []);

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
        renderImage={(cur) => <RenderImage images={images} currentPage={cur} />}
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
