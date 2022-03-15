import React from 'react';
import PropTypes from 'prop-types';
import {
  HeaderArrow,
  HeaderArrowMore,
  HeaderAvatar,
  HeaderPressable,
  HeaderPressableAvatar,
  HeaderPressableMore,
  HeaderRow,
  HeaderTitle
} from '../../styles/shared';
import { searchPanelHandler } from '../../redux/actions/genericActions';

function Header({
  navigation, title, more, morePress, avatar, search
}) {
  const goBack = async () => {
    if (search) {
      await searchPanelHandler(true);
      navigation.navigation.goBack();
    } else {
      navigation.navigation.goBack();
    }
  };
  return (
    <HeaderRow>
      <HeaderPressable onPress={goBack}>
        <HeaderArrow source={require('../../assets/images/icons/arrow.png')} />
      </HeaderPressable>
      <HeaderTitle>{title}</HeaderTitle>
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
    </HeaderRow>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
