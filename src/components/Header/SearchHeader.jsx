import React from 'react';
import PropTypes from 'prop-types';
import {
  Box, Heading,
  Input, Modal, Pressable, Spinner, Text, View
} from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
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
import { declOfNum, goBack, toastConfig } from '../../functions/helpers';
import {
  clearSearchData, getFriends, getIncoming, getOutgoing, onChangeSearch, sendRequest
} from '../../redux/actions/userActions';
import { SET_SEARCH, SET_SEARCH_DATA } from '../../redux/constants/userConstants';
import { ListFriends } from '../index';
import useLoader from '../../hooks/useLoader';
import ListFriendElement from '../Friends/Lists/ListFriendElement';
import ListQueryElement from '../Friends/Lists/ListQueryElement';
import ListRequestElement from '../Friends/Lists/ListRequestElement';
import ListFriendsCheck from '../Friends/Lists/ListFriendsCheck';

function SearchHeader({
  cancel = false, title, setSelectedFriends, selectedFriends
}) {
  const { start, stop, loading } = useLoader(false);
  const { openPanel } = useSelector((state) => state.generic);
  const {
    users, typeSearch, incomingRequest, outgoingRequest, friends, friendsSearch,
    incomingRequestSearch, outgoingRequestSearch
  } = useSelector((state) => state.user);
  const [term, setTerm] = React.useState('');
  const dispatch = useDispatch();
  const [debouncedTerm, setDebouncedTerm] = React.useState(term);
  const isTabFriend = React.useCallback(() => typeSearch === 'friend', [typeSearch]);
  const isTabRequest = React.useCallback(() => typeSearch === 'request', [typeSearch]);
  const isTabQuery = React.useCallback(() => typeSearch === 'query', [typeSearch]);
  const isTabShare = React.useCallback(() => typeSearch === 'share', [typeSearch]);

  const allIncoming = React.useCallback(() => {
    return incomingRequestSearch
      ?.reduce((total, amount) => {
        // eslint-disable-next-line no-prototype-builtins
        if (!amount.hasOwnProperty('status')) {
          total += 1;
        }
        return total;
      }, 0);
  }, [incomingRequestSearch]);

  const allOutcoming = React.useCallback(() => {
    return outgoingRequestSearch
      ?.reduce((total, amount) => {
        if (!amount?.cancelRequest) {
          total += 1;
        }
        return total;
      }, 0);
  }, [outgoingRequestSearch]);

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
  }, [debouncedTerm]);

  React.useEffect(() => {
    (async function Start() {
      if (term !== '') {
        await onSearchSubmit(term);
      } else {
        clearResults();
      }
    }());
  }, [term]);

  const onSearchSubmit = React.useCallback(async (value) => {
    try {
      const res = await onChangeSearch(value);
      if (isTabFriend) {
        await getFriends(value);
      }
      if (isTabShare) {
        await getFriends(value);
      }
      if (isTabRequest) {
        await getIncoming(value);
      }
      if (isTabQuery) {
        await getOutgoing(value);
      }
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

  const handlePress = async ({ id }) => {
    await sendRequest(id).then(() => {
      Toast.show({
        type: 'search',
        text1: 'Запрос на дружбу отправлен',
        position: 'bottom',
        bottomOffset: 95
      });
    });

  };

  const handleClose = async () => {
    await searchPanelHandler();
  };

  return (
    <>
      <ShareScreenHeader>
        {cancel && <ShareScreenCancelText onPress={goBack}>Отмена</ShareScreenCancelText>}
        <ShareScreenTitle>{title}</ShareScreenTitle>
        <ShareScreenPressable onPress={handleSearchPanel(true, true)}>
          <ShareScreenImage source={require('../../assets/images/icons/profile/desires/search.png')} />
        </ShareScreenPressable>
      </ShareScreenHeader>
      {openPanel ? (
        <Modal
          _backdrop={{
            ...(bgTr && { bg: 'transparent' })
          }}
          backgroundColor={COLORS.black3}
          isOpen={openPanel}
          onClose={searchPanelHandler}
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
                borderRadius={10}
                InputLeftElement={<LeftIcon />}
                InputRightElement={<RightIcon />}
                w={{
                  base: '80%',
                }}
                fontSize={16}
                placeholder="Введи ник"
              />
              <ModalCancelText onPress={handleSearchPanel(false, true)}>Отмена</ModalCancelText>
            </ModalContent>
            {debouncedTerm ? (
              <View marginTop="20px" display="flex" flexDirection="column">
                {
              loading ? <Spinner color="indigo.500" size="lg" /> : users?.length
                ? (
                  <>
                    {isTabFriend() && friendsSearch?.length ? (
                      <View maxHeight="40%">
                        <Heading fontSize="15px" pb="19px" pl="20px" color={COLORS.gray}>
                          {`${friendsSearch?.length} ${declOfNum(friendsSearch?.length, ['друг', 'друга', 'друзей'])}`}
                        </Heading>
                        <ListFriendElement
                          add={false}
                          first
                          handlePress={handlePress}
                          handleSearchPanel={handleSearchPanel}
                          data={friendsSearch}
                        />
                      </View>
                    ) : null}
                    {isTabShare() && friendsSearch?.length ? (
                      <ListFriendsCheck
                        padding
                        data={friendsSearch}
                        selecteds={selectedFriends}
                        setSelected={setSelectedFriends}
                      />
                    ) : null}
                    {isTabQuery() && outgoingRequestSearch?.length ? (
                      <View maxHeight="40%">
                        <Heading fontSize="15px" pb="19px" pl="20px" color={COLORS.gray}>
                          {`${allOutcoming()} ${declOfNum(allOutcoming(), ['запрос', 'запроса', 'запросов'])}`}
                        </Heading>
                        <ListQueryElement
                          handleSearchPanel={handleSearchPanel}
                          data={outgoingRequestSearch}
                          first
                        />
                      </View>
                    ) : null}
                    {isTabRequest() && incomingRequestSearch?.length ? (
                      <View maxHeight="40%">
                        <Heading fontSize="15px" pb="19px" pl="20px" color={COLORS.gray}>
                          {`${allIncoming()} ${declOfNum(allIncoming(), ['запрос', 'запроса', 'запросов'])}`}
                        </Heading>
                        <ListRequestElement
                          data={incomingRequestSearch}
                          handleSearchPanel={handleSearchPanel}
                          first
                        />
                      </View>
                    ) : null}
                    {!isTabShare() && <ListFriends handlePress={handlePress} handleSearchPanel={handleSearchPanel} add title="Глобальный поиск" data={users} />}
                  </>
                ) : debouncedTerm ? (
                  <Text
                    marginLeft="20px"
                    alignSelf="flex-start"
                    fontSize="15px"
                    color={COLORS.gray}
                  >
                    Ничего не найдено :(
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

SearchHeader.propTypes = {
  cancel: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

SearchHeader.defaultProps = {
  cancel: false,
};

export default SearchHeader;
