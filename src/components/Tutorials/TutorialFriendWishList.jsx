import React from 'react';
import {
  Box, Image, Pressable, ScrollView, VStack
} from 'native-base';
import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../../functions/constants';

function TutorialFriendWishList({ setShowTutorial }) {
  const { height } = Dimensions.get('screen');
  const smallSmart = height <= 800;
  return (
    <Box zIndex={999999} style={{ elevation: 2 }} position="absolute" width="100%" height="100%" backgroundColor={COLORS.black3}>
      <ScrollView height="100%" width="100%">
        <VStack position="relative" height="100%" width="100%">
          <Pressable
            height="30px"
            width="30px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            top="8%"
            right="25px"
            position="absolute"
            onPress={async () => {
              await AsyncStorage.setItem(
                'showTutorial',
                'true'
              );
              setShowTutorial(false);
            }}
          >
            <Image
              source={require('../../assets/images/icons/users/close.png')}
              height="18px"
              width="18px"
            />
          </Pressable>
          <Image marginTop={smallSmart ? '10%' : '20%'} alignSelf="center" width="306px" height="412px" source={require('../../assets/images/icons/users/tutorial.png')} />
          <Image marginTop="70px" alignSelf="center" width="100%" maxWidth="335px" height="169px" source={require('../../assets/images/icons/users/tutorial_image.png')} />
        </VStack>
      </ScrollView>
    </Box>
  );
}

export default TutorialFriendWishList;
