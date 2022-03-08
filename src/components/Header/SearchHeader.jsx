import React from 'react';
import PropTypes from 'prop-types';
import { Input, Modal } from 'native-base';
import { useSelector } from 'react-redux';
import {
  ModalCancelText,
  SearchScreenImage,
  ShareScreenCancelText,
  ShareScreenHeader,
  ShareScreenImage,
  ShareScreenPressable,
  ShareScreenTitle
} from '../../styles/profile';
import { ModalContent } from '../../styles/shared';
import { COLORS } from '../../functions/constants';
import { searchPanelHandler } from '../../redux/actions/genericActions';
import { goToMain } from '../../functions/helpers';

function SearchHeader({
  cancel = false, title
}) {
  const { openPanel } = useSelector((state) => state.generic);
  const handleSearchPanel = (payload) => {
    return async () => {
      await searchPanelHandler(payload);
    };
  };

  return (
    <>
      <ShareScreenHeader>
        {cancel && <ShareScreenCancelText onPress={goToMain}>Отмена</ShareScreenCancelText>}
        <ShareScreenTitle>{title}</ShareScreenTitle>
        <ShareScreenPressable onPress={handleSearchPanel(true)}>
          <ShareScreenImage source={require('../../assets/images/icons/profile/desires/search.png')} />
        </ShareScreenPressable>
      </ShareScreenHeader>
      <Modal
        _backdrop={{
          // bg: "warmGray.50"
        }}
        isOpen={openPanel}
        onClose={searchPanelHandler}
        size="full"
      >
        <Modal.Content backgroundColor="#FFFFFF" borderBottomRadius={0} maxHeight="96px" height="96px" marginTop={0} marginBottom="auto">
          <ModalContent>
            <Input
              backgroundColor={COLORS.extralightGray}
              borderWidth={0}
              height={36}
              borderRadius={10}
              InputLeftElement={<SearchScreenImage source={require('../../assets/images/icons/profile/desires/search.png')} />}
              w={{
                base: '80%',
              }}
              fontSize={16}
              placeholder="Введи ник или телефон"
            />
            <ModalCancelText onPress={handleSearchPanel(false)}>Отмена</ModalCancelText>
          </ModalContent>
        </Modal.Content>
      </Modal>
    </>
  );
}

SearchHeader.propTypes = {
  cancel: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

SearchHeader.defaultProps = {
  cancel: false,
};

export default SearchHeader;
