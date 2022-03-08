import React from 'react';
import PropTypes from 'prop-types';
import {
  HeaderArrow, HeaderPressable, HeaderRow, HeaderTitle
} from '../../styles/shared';

function Header({ navigation, title }) {
  const goBack = () => {
    navigation.navigation.goBack();
  };
  return (
    <HeaderRow>
      <HeaderPressable onPress={goBack}>
        <HeaderArrow source={require('../../assets/images/icons/arrow.png')} />
      </HeaderPressable>
      <HeaderTitle>{title}</HeaderTitle>
    </HeaderRow>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
