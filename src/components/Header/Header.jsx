import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'native-base';
import {
  HeaderArchive,
  HeaderArrow,
  HeaderArrowMore,
  HeaderAvatar,
  HeaderPressable, HeaderPressableArchive,
  HeaderPressableAvatar,
  HeaderPressableMore,
  HeaderRow,
  HeaderTitle
} from '../../styles/shared';
import { searchPanelHandler } from '../../redux/actions/genericActions';
import { goToArchive } from '../../functions/helpers';
import { COLORS } from '../../functions/constants';

function Header({
  navigation, title, more, morePress, avatar, search, archive, cancel = true, cancelText
}) {
  const { route } = navigation;
  const goBack = async () => {
    if (search && !route.params?.noSearch) {
      await searchPanelHandler(true);
      navigation.navigation.goBack();
    } else {
      navigation?.hasOwnProperty('goBack') ? navigation.goBack() : navigation.navigation.goBack();
    }
  };
  return (
    <HeaderRow>
      {cancel && (
      <HeaderPressable onPress={goBack}>
        <HeaderArrow source={require('../../assets/images/icons/arrow.png')} />
      </HeaderPressable>
      )}
      {cancelText && (
        <Text color={COLORS.purple} left={19} top="56px" position="absolute" onPress={goBack} fontSize={16} fontWeight={600}>Отмена</Text>
      )}
      <HeaderTitle numberOfLines={1}>{title}</HeaderTitle>
      {more && (
      <HeaderPressableMore onPress={morePress}>
        <HeaderArrowMore source={require('../../assets/images/icons/header/more.png')} />
      </HeaderPressableMore>
      )}
      {avatar && (
        <HeaderPressableAvatar>
          <HeaderAvatar source={require('../../assets/images/icons/profile/avatar.png')} />
        </HeaderPressableAvatar>
      )}
      {archive && (
      <HeaderPressableArchive onPress={goToArchive}>
        <HeaderArchive source={require('../../assets/images/icons/wishlist/archive.png')} />
      </HeaderPressableArchive>
      )}
    </HeaderRow>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
