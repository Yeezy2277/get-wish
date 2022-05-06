import React from 'react';
import {
  Box,
  HStack, Image, Pressable, ScrollView, Text
} from 'native-base';

function ImagesChose({ images, deletePhoto }) {

  return (
    <ScrollView minHeight="68px" maxHeight="68px" marginTop="20px" horizontal>
      <HStack space={3}>
        {images?.map((el) => {
          return (
            <Pressable size="66px" position="relative">
              <Image
                zIndex={1}
                borderRadius="10px"
                borderWidth="2px"
                borderColor={el?.image ? '#D4DAEC' : 'transparent'}
                size="66px"
                source={el?.image ? { uri: el.image } : require('../../assets/images/icons/profile/desires/placeholder.png')}
              />
              {el?.image && (
              <Pressable onPress={() => deletePhoto(el.id)} zIndex={2} top="5px" right="5px" position="absolute">
                <Image size="15px" zIndex={2} source={require('../../assets/images/icons/wishlist/deletePhoto.png')} />
              </Pressable>
              )}
            </Pressable>
          );
        })}
      </HStack>
    </ScrollView>
  );
}

export default ImagesChose;
