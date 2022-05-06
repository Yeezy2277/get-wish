import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Input, Modal, Pressable, Spinner, Text, View
} from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { InteractionManager } from 'react-native';
import {
  ModalCancelText,
  SearchScreenImage,
  ShareScreenCancelText,
  ShareScreenHeader,
  ShareScreenImage,
  ShareScreenPressable,
  ShareScreenTitle
} from '../../styles/profile';
import { ModalContent, TextFieldCloseIcon } from '../../styles/shared';
import { COLORS } from '../../functions/constants';
import { searchPanelHandler } from '../../redux/actions/genericActions';
import { goBack, toastConfig } from '../../functions/helpers';
import {
  clearSearchData, getFriends, onChangeSearch,
} from '../../redux/actions/userActions';
import { SET_SEARCH, SET_SEARCH_DATA } from '../../redux/constants/userConstants';
import useLoader from '../../hooks/useLoader';
import ListFriendsCheck from '../Friends/Lists/ListFriendsCheck';
import { ShareContext } from '../../functions/context';
import {useI18n} from "../../i18n/i18n";

function SearchHeaderShare({
  cancel = false, title, setSelectedFriends, selectedFriends
}) {
  const { start, stop, loading } = useLoader(false);
  const [openPanel, setOpenPanel] = React.useState(false);
  const {
    users, typeSearch, incomingRequest, outgoingRequest, friends, friendsSearch
  } = useSelector((state) => state.user);
  const [term, setTerm] = React.useState('');
  const dispatch = useDispatch();
  const [debouncedTerm, setDebouncedTerm] = React.useState(term);

  const whiteBg = () => {
    if (term) {
      return true;
    } if (typeSearch === 'friend' && friends?.length) {
      return true;
    } if (typeSearch === 'request' && incomingRequest?.length) {
      return true;
    } if (typeSearch === 'share' && friends?.length) {
      return true;
    }
    return !!(typeSearch === 'query' && outgoingRequest?.length);

  };

  const bgTr = whiteBg();

  React.useEffect(() => {
    start();
    const timer = setTimeout(() => setTerm(debouncedTerm), 1000);
    return () => clearTimeout(timer);
  }, [debouncedTerm, start]);

  React.useEffect(() => {
    (async function Start() {
      if (term !== '') {
        await onSearchSubmit(term);
      } else {
        clearResults();
      }
    }());
  }, [clearResults, onSearchSubmit, term]);

  const onSearchSubmit = React.useCallback(async (value) => {
    try {
      const res = await onChangeSearch(value);
      await getFriends(value);
      if (res) {
        dispatch({
          type: SET_SEARCH_DATA,
          payload: res
        });
      }
    } finally {
      stop();
    }

  }, []);

  const clearResults = React.useCallback(() => clearSearchData(), []);

  const handleSearchPanel = (payload, close) => {
    return async () => {
      await searchPanelHandler(payload);
      if (close) {
        dispatch({
          type: SET_SEARCH,
          payload: ''
        });
        setTerm('');
        setDebouncedTerm('');
      }
    };
  };

  const handleChangeText = async (value) => {
    setDebouncedTerm(value);
  };

  const handleClear = async () => {
    setTerm('');
    setDebouncedTerm('');
    dispatch({
      type: SET_SEARCH,
      payload: ''
    });
  };

  const RightIcon = React.useCallback(() => {
    if (!debouncedTerm) {
      return null;
    }
    return (
      <Pressable onPress={handleClear} marginRight="15px">
        <TextFieldCloseIcon source={require('../../assets/images/icons/closeIcon.png')} resizeMode="cover" />
      </Pressable>
    );
  }, [debouncedTerm]);

  const LeftIcon = React.useCallback(() => {
    return <SearchScreenImage source={require('../../assets/images/icons/profile/desires/search.png')} />;
  }, []);

  const [state, setState] = React.useState({});

  const t = useI18n()

  React.useEffect(() => {
    if (state !== null && Object?.keys(state)?.length !== 0) {
      InteractionManager.runAfterInteractions(() => {
        state.focus();
      });
    }
  }, [state]);

  const handleClose = async () => {
    await searchPanelHandler();
  };

  return (
    <>
      <ShareScreenHeader>
        {cancel && <ShareScreenCancelText onPress={goBack}>Отмена</ShareScreenCancelText>}
        <ShareScreenTitle>{title}</ShareScreenTitle>
        <ShareScreenPressable onPress={() => setOpenPanel(true)}>
          <ShareScreenImage source={require('../../assets/images/icons/profile/desires/search.png')} />
        </ShareScreenPressable>
      </ShareScreenHeader>
      {openPanel ? (
        <Modal
          _backdrop={{
            ...(bgTr && { bg: 'transparent' })
          }}
          backgroundColor={COLORS.overlay}
          isOpen={openPanel}
          onClose={() => setOpenPanel(false)}
          size="full"
        >
          <Box paddingLeft="5px" paddingRight="5px" backgroundColor={debouncedTerm ? COLORS.white2 : COLORS.transparent} height="100%" borderTopRadius={0} borderBottomRadius={0} marginTop={0} marginBottom="auto">
            <ModalContent>
              <Input
                backgroundColor={COLORS.extralightGray}
                borderWidth={0}
                value={debouncedTerm}
                onChangeText={handleChangeText}
                height={36}
                autoFocus
                ref={(input) => { setState(input); }}
                borderRadius={10}
                InputLeftElement={<LeftIcon />}
                InputRightElement={<RightIcon />}
                w={{
                  base: '80%',
                }}
                fontSize={16}
                placeholder={t('friends_searchPlaceholder')}
              />
              <ModalCancelText onPress={() => setOpenPanel(false)}>Отмена</ModalCancelText>
            </ModalContent>
            {debouncedTerm ? (
              <View marginTop="20px" display="flex" flexDirection="column">
                {
              loading ? <Spinner color="indigo.500" size="lg" /> : users?.length
                ? (
                  <>
                    {friendsSearch?.length ? (
                      <ShareContext.Provider value={{ setSelectedFriends, selectedFriends }}>
                        <ListFriendsCheck
                          padding
                          data={friendsSearch}
                        />
                      </ShareContext.Provider>

                    ) : null}
                  </>
                ) : debouncedTerm ? (
                  <Text
                    marginLeft="20px"
                    alignSelf="flex-start"
                    fontSize="15px"
                    color={COLORS.gray}
                  >
                    {t('notFound')}
                  </Text>
                ) : null
            }
              </View>
            ) : (
              <Pressable
                zIndex={999}
                onPress={handleClose}
                display="flex"
                flexDirection="column"
                height="100%"
                width="100%"
                minHeight="100%"
                minWidth="100%"
                backgroundColor={COLORS.transparent}
              />
            )}
            <Toast config={toastConfig} />
          </Box>
        </Modal>
      ) : null}
    </>
  );
}

SearchHeaderShare.propTypes = {
  cancel: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

SearchHeaderShare.defaultProps = {
  cancel: false,
};

export default SearchHeaderShare;
