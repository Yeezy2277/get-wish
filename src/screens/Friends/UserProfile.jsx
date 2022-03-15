import React from 'react';
import { View } from 'native-base';
import { SceneMap, TabView } from 'react-native-tab-view';
import { useWindowDimensions } from 'react-native';
import { DesiresUser, TopPanel, UserPosts } from '../../components';
import { FriendTabBars } from '../../styles/shared';
import { COLORS } from '../../functions/constants';
import TabBarPanel from '../../components/Users/TabBarPanel';

function UserProfile() {
  const renderScene = SceneMap({
    first: UserPosts,
    second: DesiresUser,
  });
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: 'first',
      imageActive: require('../../assets/images/icons/users/tabs/first_active.png'),
      image: require('../../assets/images/icons/users/tabs/first.png')
    },
    {
      key: 'second',
      imageActive: require('../../assets/images/icons/users/tabs/second_active.png'),
      image: require('../../assets/images/icons/users/tabs/second.png')
    }]);
  return (
    <View>
      <TopPanel />
      <View backgroundColor={COLORS.white2} height="100%" width="100%" paddingTop="10px">
        <TabView
          renderTabBar={({ navigationState, jumpTo }) => {
            return (
              <FriendTabBars>
                {navigationState?.routes.map((el, idx) => (
                  <TabBarPanel
                    key={el.key}
                    index={el.key}
                    image={el.image}
                    imageActive={el.imageActive}
                    jumpTo={jumpTo}
                    active={navigationState.index === idx}
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
    </View>
  );
}

export default UserProfile;
