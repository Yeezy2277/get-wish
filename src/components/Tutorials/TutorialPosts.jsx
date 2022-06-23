import React from 'react';
import {
  Box, Image, Pressable, ScrollView, VStack
} from 'native-base';
import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../../functions/constants';

function TutorialPosts({ setShowTutorial }) {
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
            top="5%"
            right="25px"
            position="absolute"
            onPress={async () => {
              await AsyncStorage.setItem(
                'showTutorialPosts',
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
          <Image marginTop={smallSmart ? '20%' : '25%'} alignSelf="center" width="350px" height="541px" source={require('../../assets/images/icons/posts/tutorial_top.png')} />
            <Pressable onPress={async () => {
                await AsyncStorage.setItem(
                    'showTutorialPosts',
                    'true'
                );
                setShowTutorial(false);
            }}>
                <Image marginTop="25%" alignSelf="center" width="100%" maxWidth="335px" height="50px" source={require('../../assets/images/icons/posts/tutorial_bottom.png')} />
            </Pressable>
        </VStack>
      </ScrollView>
    </Box>
  );
}

export default TutorialPosts;
