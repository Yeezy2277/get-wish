import React from 'react';
import {
  FlatList, Text, View
} from 'native-base';
import { COLORS } from '../../functions/constants';
import { getLikes } from '../../redux/actions/postsActions';
import LikesBody from '../../components/Posts/LikesBody';
import useLoader from "../../hooks/useLoader";

function Likes({ navigation, route: { params: { lenta, my, postId } } }) {
  const parent = navigation.getParent();
  const { start, stop, loading } = useLoader(true);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    (async function () {
      start()
      try {
        const likesData = await getLikes(postId);
        setData(likesData);
      } finally {
        stop()
      }
    }());
  }, [postId]);

  React.useEffect(() => {
    parent.setOptions({ tabBarStyle: { display: 'none' } });

    return () => {
      parent.setOptions({ tabBarStyle: { display: 'flex' } });
    };
  }, [navigation]);

  return (
    <>
      {data?.length ? (
        <FlatList
          data={data}
          height="100%"
          backgroundColor={COLORS.white2}
          pl="20px"
          pr="20px"
          pt="20px"
          flex={1}
          width="100%"
          renderItem={({ item: el }) => {
            return (
              <LikesBody lenta my el={el} postId={postId} />
            );
          }}
        />
      ) : (
        <View backgroundColor={COLORS.white2} height="100%" width="100%" flex={1} justifyContent="center" alignItems="center">
          <Text color={COLORS.gray}>Нет лайков</Text>
        </View>
      )}
    </>
  );
}

export default Likes;
