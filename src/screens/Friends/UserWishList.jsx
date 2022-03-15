import React from 'react';
import {
  ScrollView, Text
} from 'native-base';
import { ImageBackground } from 'react-native';
import {
  HeaderArrow, HeaderAvatar, HeaderPressable, HeaderPressableAvatar
} from '../../styles/shared';
import { goBack } from '../../functions/helpers';
import { COLORS } from '../../functions/constants';
import { DesiresScreenRow } from '../../styles/profile';
import { DesiresScreenElement } from '../../components';

function UserWishList() {
  const [showTutorial, setShowTutorial] = React.useState(true);

  return (
    <ImageBackground
      resizeMode="cover"
      source={require('../../assets/images/icons/users/theme_background.png')}
      style={{
        width: '100%',
        position: 'relative',
        height: '100%',
      }}
    >
      <HeaderPressable onPress={goBack}>
        <HeaderArrow source={require('../../assets/images/icons/arrow.png')} />
      </HeaderPressable>
      <HeaderPressableAvatar>
        <HeaderAvatar source={require('../../assets/images/icons/profile/avatar.png')} />
      </HeaderPressableAvatar>
      <ScrollView width="100%" height="100%" paddingTop="78px">
        <Text textAlign="center" fontSize="22px" fontWeight="800" color={COLORS.black}>🎄 Новый год</Text>
        <Text textAlign="center" fontSize="16px" fontWeight="600" marginTop="10px" color={COLORS.gray}>7 желаний</Text>
        <DesiresScreenRow>
          <DesiresScreenElement
            showTutorial={showTutorial}
            friend
            setShowTutorial={setShowTutorial}
          />
          <DesiresScreenElement
            showTutorial={showTutorial}
            friend
            setShowTutorial={setShowTutorial}
          />
          <DesiresScreenElement
            showTutorial={showTutorial}
            friend
            setShowTutorial={setShowTutorial}
          />
        </DesiresScreenRow>
      </ScrollView>
      {/* {showTutorial && <TutorialFriendWishList setShowTutorial={setShowTutorial} />} */}
    </ImageBackground>
  );
}

export default UserWishList;
