import React from 'react';
import { View } from 'native-base';
import { TabView, SceneMap } from 'react-native-tab-view';
import { useWindowDimensions } from 'react-native';
import { FriendTabBar, SearchHeader } from '../../components';
import { FriendsContainer } from '../../styles/friends';
import { FriendTabBars } from '../../styles/shared';
import { COLORS } from '../../functions/constants';
import { FriendsFirst } from '../index';

function FirstRoute() {
  return <View style={{ flex: 1, backgroundColor: COLORS.red }} />;
}

function SecondRoute() {
  return <View style={{ flex: 1, backgroundColor: COLORS.purple }} />;
}

function Friends(props) {
  const renderScene = SceneMap({
    first: FriendsFirst,
    second: SecondRoute,
    third: FirstRoute,
  });

  const { navigation } = props;
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: 'first',
      title: 'Друзья',
      imageActive: require('../../assets/images/icons/tabs/first_active.png'),
      image: require('../../assets/images/icons/tabs/first.png')
    },
    {
      key: 'second',
      title: 'Заявки',
      notification: true,
      imageActive: require('../../assets/images/icons/tabs/second_active.png'),
      image: require('../../assets/images/icons/tabs/second.png')
    },
    {
      key: 'third',
      title: 'Запросы',
      imageActive: require('../../assets/images/icons/tabs/third_active.png'),
      image: require('../../assets/images/icons/tabs/third.png')
    },
  ]);
  return (
    <FriendsContainer>
      <SearchHeader navigation={navigation} title="Друзья" />
      <View height="100%" width="100%">
        <TabView
          renderTabBar={({ navigationState, jumpTo }) => {
            return (
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
