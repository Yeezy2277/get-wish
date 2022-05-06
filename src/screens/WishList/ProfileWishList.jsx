import React from 'react';
import { useWindowDimensions } from 'react-native';
import { SceneMap, TabView } from 'react-native-tab-view';
import { FriendsContainer } from '../../styles/friends';
import { FriendTabBars } from '../../styles/shared';
import { WishListPrivate, WishListPublic, WishListTabBar } from '../../components';

function ProfileWishList() {
  const renderScene = SceneMap({
    public: WishListPublic,
    private: WishListPrivate,
  });
  const [index, setIndex] = React.useState(0);
  const layout = useWindowDimensions();
  const routes = React.useMemo(() => {
    return [
      {
        key: 'public',
        title: 'Публичные'
      },
      {
        key: 'private',
        title: 'Приватные',
      },
    ];
  }, []);

  return (
    <FriendsContainer>
      <TabView
        renderTabBar={({ navigationState, jumpTo }) => {
          return (
            <FriendTabBars>
              {navigationState?.routes.map((el, idx) => (
                <WishListTabBar
                  key={el.key}
                  index={el.key}
                  title={el.title}
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
    </FriendsContainer>
  );
}

export default ProfileWishList;
