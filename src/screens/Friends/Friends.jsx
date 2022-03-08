import React from 'react';
import { View } from 'native-base';
import { TabView, SceneMap } from 'react-native-tab-view';
import { useWindowDimensions } from 'react-native';
import { FriendTabBar, SearchHeader } from '../../components';
import { FriendsContainer } from '../../styles/friends';
import { FriendTabBars } from '../../styles/shared';
import { COLORS } from '../../functions/constants';

function FirstRoute() {
  return <View style={{ flex: 1, backgroundColor: COLORS.red }} />;
}

function SecondRoute() {
  return <View style={{ flex: 1, backgroundColor: COLORS.purple }} />;
}

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: FirstRoute,
});

function Friends(props) {
  const { navigation } = props;
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Друзья' },
    { key: 'second', title: 'Заявки' },
    { key: 'third', title: 'Запросы' },
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
