import React from 'react';
import {
  FlatList,
  HStack, Image, Pressable, ScrollView, Text, View
} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {goToMyPost, goToUserPost, goToUserPostOther, isVideo} from '../../functions/helpers';
import { PrivateAccount } from '../index';
import { getUserPosts } from '../../redux/actions/postsActions';
import { COLORS } from '../../functions/constants';
import useLoader from "../../hooks/useLoader";
import Loader from "../Shared/Loader";
import {SET_POSTS_USER_OTHER} from "../../redux/constants/postsConstants";
import {Video} from "expo-av";
import RenderVideo from "../RenderVideo";

function UserPosts() {
  const { oneUser } = useSelector((state) => state.user);
  const { otherUserPosts } = useSelector((state) => state.posts);



  return (
    <>
          <View height="100%" width="100%" flex={1}>
            {
              (oneUser?.private && !oneUser?.is_friend) ? (
                  <ScrollView height="100%" width="100%" flex={1}>
                    <PrivateAccount />
                  </ScrollView>
              ) : (
                  otherUserPosts?.length ? (
                      <FlatList
                          data={otherUserPosts}
                          numColumns={4}
                          columnWrapperStyle={{ display: 'flex', flexDirection: 'row' }}
                          key="_"
                          keyExtractor={(item) => `_${item.id}`}
                          renderItem={({ item: el }) => {
                              return (
                                <Pressable
                                    key={el.id}
                                    onPress={() => goToUserPostOther({ id: el.id })}
                                    height="125px"
                                    width="33.2%"
                                    borderWidth={1}
                                    borderColor={COLORS.white2}
                                    position="relative"
                                >
                                    {isVideo(el.attachments[0]) ? (
                                        <RenderVideo video={el.attachments[0]}/>
                                    ) : (
                                        <Image
                                            alt="text"
                                            height="125px"
                                            maxWidth="100%"
                                            source={{ uri: el.attachments[0] }}
                                        />
                                    )}
                                    {el.attachments?.length > 1 ? (
                                      <Image
                                          source={require('../../assets/images/icons/posts/multi.png')}
                                          height="16px"
                                          position="absolute"
                                          top="10px"
                                          right="10px"
                                          width="16px"
                                      />
                                  ) : null}
                                </Pressable>
                            );
                          }}
                      />
                  ) : (
                      <View paddingTop="200px" height="100%" width="100%" flex={1} alignItems="center">
                        <Text>У пользователя пока нет постов</Text>
                      </View>
                  )
              )
            }
          </View>
    </>

  );
}

export default UserPosts;
