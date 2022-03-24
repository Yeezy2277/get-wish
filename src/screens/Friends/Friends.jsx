import React from 'react';
import { Box, PresenceTransition, View } from 'native-base';
import { TabView, SceneMap } from 'react-native-tab-view';
import { useWindowDimensions } from 'react-native';
import { useSelector } from 'react-redux';
import {
  FriendsQuery, FriendsRequest, FriendTabBar, SearchHeader
} from '../../components';
import { FriendsContainer } from '../../styles/friends';
import { FriendTabBars } from '../../styles/shared';
import { FriendsFirst } from '../index';
import { COLORS } from '../../functions/constants';

function Friends(props) {
  const renderScene = SceneMap({
    friend: FriendsFirst,
    request: FriendsRequest,
    query: FriendsQuery,
  });
  const { openPanel } = useSelector((state) => state.generic);
  const {
    typeSearch, incomingRequest, outgoingRequest, friends
  } = useSelector((state) => state.user);

  const { navigation } = props;
  const layout = useWindowDimensions();

  const all = React.useCallback(() => {
    return incomingRequest
      ?.reduce((total, amount) => {
        // eslint-disable-next-line no-prototype-builtins
        if (!amount.hasOwnProperty('status')) {
          total += 1;
        }
        return total;
      }, 0);
  }, [incomingRequest]);

  const [index, setIndex] = React.useState(0);

  const routes = React.useMemo(() => {
    return [
      {
        key: 'friend',
        title: 'Друзья',
        imageActive: require('../../assets/images/icons/tabs/first_active.png'),
        image: require('../../assets/images/icons/tabs/first.png')
      },
      {
        key: 'request',
        title: 'Заявки',
        notification: !!all(),
        imageActive: require('../../assets/images/icons/tabs/second_active.png'),
        image: require('../../assets/images/icons/tabs/second.png')
      },
      {
        key: 'query',
        title: 'Запросы',
        imageActive: require('../../assets/images/icons/tabs/third_active.png'),
        image: require('../../assets/images/icons/tabs/third.png')
      },
    ];
  }, [all]);

  const hasPadding = React.useCallback(() => {
    if (typeSearch === 'friend' && friends?.length) {
      return true;
    } if (typeSearch === 'request' && incomingRequest?.length) {
      return true;
    } if (typeSearch === 'query' && outgoingRequest?.length) {
      return true;
    }
    return false;
  }, [friends?.length, incomingRequest?.length, outgoingRequest?.length, typeSearch]);

  const hP = hasPadding();

  return (
    <FriendsContainer>
      <SearchHeader navigation={navigation} title="Друзья" />
      <View height="100%" width="100%">
        <TabView
          renderTabBar={({ navigationState, jumpTo }) => {
            if (!openPanel) {
              return (
                <PresenceTransition
                  visible={!openPanel}
                  initial={{
                    opacity: 0
                  }}
                  animate={{
                    opacity: 1,
                    transition: {
                      duration: 250
                    }
                  }}
                >
                  <FriendTabBars>
                    {navigationState?.routes.map((el, idx) => (
                      <FriendTabBar
                        key={el.key}
                        index={el.key}
                        title={el.title}
                        image={el.image}
                        notification={el.notification}
                        imageActive={el.imageActive}
                        jumpTo={jumpTo}
                        active={navigationState.index === idx}
                        {...props}
                      />
                    ))}
                  </FriendTabBars>
                </PresenceTransition>
              );
            }
            return (
              <Box height={hP ? '0px' : '44px'} width="100%" backgroundColor={COLORS.white2} />
            );
          }}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
        />
      </View>
    </FriendsContainer>
  );
}

export default Friends;
