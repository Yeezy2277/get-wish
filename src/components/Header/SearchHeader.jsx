import React from 'react';
import PropTypes from 'prop-types';
import { Input, Modal } from 'native-base';
import {
  ModalCancelText,
  SearchScreenImage,
  ShareScreenCancelText,
  ShareScreenHeader,
  ShareScreenImage,
  ShareScreenPressable,
  ShareScreenTitle
} from '../../styles/profile';
import { navigateAction } from '../../functions/NavigationService';
import { ModalContent } from '../../styles/shared';
import { COLORS } from '../../functions/constants';

function SearchHeader({ cancel = false, title }) {
  const [modalVisible, setModalVisible] = React.useState(false);
  return (
    <>
      <ShareScreenHeader>
        {cancel && <ShareScreenCancelText onPress={() => navigateAction('MainProfile')}>Отмена</ShareScreenCancelText>}
        <ShareScreenTitle>{title}</ShareScreenTitle>
        <ShareScreenPressable onPress={() => setModalVisible(true)}>
          <ShareScreenImage source={require('../../assets/images/icons/profile/desires/search.png')} />
        </ShareScreenPressable>
      </ShareScreenHeader>
      <Modal
        _backdrop={{
          // bg: "warmGray.50"
        }}
        isOpen={modalVisible}
        onClose={setModalVisible}
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
            <ModalCancelText onPress={() => setModalVisible(false)}>Отмена</ModalCancelText>
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
