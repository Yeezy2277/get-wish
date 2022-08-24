import React, {useRef} from 'react';
import ParsedText from 'react-native-parsed-text';
import {StyleSheet} from 'react-native';
import { COLORS } from '../../functions/constants';
import { goToComments, handleGoToUser } from '../../functions/helpers';
import {Text, View} from "native-base";
import {useSelector} from "react-redux";
import {getOneUser, openUser} from "../../redux/actions/userActions";
import ReadMore from '@fawazahmed/react-native-read-more';

function TextParserPostVariant({ description, children, post, username }) {
  const [text, setText] = React.useState('');
  const [users, setUsers] = React.useState([]);
  const [tags, setTags] = React.useState([]);
  const { friends } = useSelector((state) => state.user);



  const parsingUserTag = async (description) => {
    let newDesc = description;
    const tags = newDesc?.match(/<(.*?)>/gm);
    const tagsVar2 = newDesc?.match(/\@[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*/gm);
    let users = [];
    let usersUnique = [];
    let users2 = [];
    if (tags?.length) {
      for await (const tag of tags) {
        let id = tag.split('@')[1].split('>')[0];
        let { data: dataTag } = await getOneUser(id);

        users = [...users, { username: dataTag.username, id: dataTag.id }]
      }
      users.filter((item) => {
        if (!usersUnique.some((element) => element.id == item.id)) {
          usersUnique = [...usersUnique, item];
        }
      });
      tags.forEach((el) => {
        let object = usersUnique.find((unique) => unique.id === +el.split('@')[1].split('>')[0]);
        newDesc = newDesc.replace(el, `@${object.username}`);
      });
    }
    if (tagsVar2?.length) {
      for await (const tag of tagsVar2) {
        if (tag?.split('@')?.length > 1) {
          users2.push(tag?.split('@')[1])
        }
      }
    }
    return { description: newDesc, users: usersUnique, users2: users2 };
  };


  React.useEffect(() => {
    (async function () {
      const {
        description:
            descriptionAnswer, users: usersAnswer, users2
      } = await parsingUserTag(description);
      setUsers(usersAnswer);
      setText(descriptionAnswer);
      setTags(users2);
    }());
  }, [description]);

  const handleOpenFriend = async (friend) => {
    if (tags?.length) {
        const {data} = await openUser(friend.split('@')[1])
        await handleGoToUser(data?.id);
    } else {
      const find = users.find((el) => el.username === friend.split('@')[1]);
      if (find?.id)
        await handleGoToUser(find.id);
      const findFriends = friends.find((el) => el.username === friend.split('@')[1]);
      if (findFriends?.id)
        await handleGoToUser(findFriends?.id);
    }
  };

  const renderText = (matchingString, matches) => {
    return <Text onPress={handleClickMore} zIndex={99} style={styles.link}>
      ... еще</Text>;
  }

  const handleClickMore = async () => {
    await goToComments(post);
  };

  const big = text.split("\n")[text.split("\n").length - 1].length > 100


  return (
      <View marginTop="10px" paddingLeft="15px" paddingRight="15px">
        <ReadMore seeMoreText="...еще" ellipsis='' seeLessText="" wrapperStyle={{
          maxWidth: '90%'
        }} seeMoreStyle={{
          color: COLORS.gray,
          left: big ? '200%' : 0,
          fontSize: 14,
        }} style={{
          fontSize: 14,
          fontFamily: 'Nunito',
          fontWeight: '300',
          flexWrap: 'wrap',
          display: 'flex'
        }} numberOfLines={3}>
          <Text fontSize="14px" paddingLeft="15px" paddingRight="15px" width="100%" marginTop="10px">
            <Text fontFamily="NunitoBold">{username}</Text>
            {' '}
          </Text>
          <ParsedText
              style={{
                marginLeft: 15,
                fontSize: 14,
                fontWeight: '300',
              }}
              parse={
                [
                  {
                    pattern: /\@[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*/gm,
                    style: styles.tag,
                    onPress: handleOpenFriend
                  }
                ]
              }
              childrenProps={{allowFontScaling: false}}
          >
            {text}
          </ParsedText>
        </ReadMore>
      </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    color: COLORS.purple,
  },
  link: {
    color: COLORS.gray,
    marginLeft: 0,
    fontSize: 14,
  }
});

export default TextParserPostVariant;
