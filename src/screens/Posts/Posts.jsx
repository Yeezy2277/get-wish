import React from 'react';
import { ScrollView } from 'native-base';
import { SceneMap, TabView } from 'react-native-tab-view';
import { useWindowDimensions } from 'react-native';
import { COLORS } from '../../functions/constants';
import { FriendTabBars } from '../../styles/shared';
import { WishListPrivate, WishListPublic, WishListTabBar } from '../../components';
import { FriendsContainer } from '../../styles/friends';
import { PostLenta, PostMy } from '../index';
import PostsTabBar from '../../components/Posts/PostsTabBar';
import TutorialPosts from '../../components/Tutorials/TutorialPosts';
import Header from '../../components/Header/Header';

function Posts({ navigation }) {
  const renderScene = SceneMap({
    public: PostLenta,
    private: PostMy,
  });
  const [showTutorial, setShowTutorial] = React.useState(true);
  const parent = navigation.getParent();

  React.useEffect(() => {
    if (showTutorial) parent.setOptions({ tabBarStyle: { display: 'none' } });
    return () => {
      parent.setOptions({ tabBarStyle: { display: 'flex' } });
    };
  }, [navigation]);
  const [index, setIndex] = React.useState(0);
  const layout = useWindowDimensions();

  const handleCloseTutorial = () => {
    setShowTutorial(false);
    parent.setOptions({ tabBarStyle: { display: 'flex' } });
  };

  const routes = React.useMemo(() => {
    return [
      {
        key: 'public',
        title: 'Лента'
      },
      {
        key: 'private',
        title: 'Мои посты',
      },
    ];
  }, []);
  return (
    <>
      <Header navigation={navigation} cancel={false} title="Посты" />
      <FriendsContainer>
        <TabView
          renderTabBar={({ navigationState, jumpTo }) => {
            return (
              <FriendTabBars>
                {navigationState?.routes.map((el, idx) => (
                  <PostsTabBar
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
      {showTutorial && <TutorialPosts setShowTutorial={handleCloseTutorial} />}

    </>
  );
}

export default Posts;
