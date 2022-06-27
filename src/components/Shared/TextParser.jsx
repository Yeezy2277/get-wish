import React from 'react';
import ParsedText from 'react-native-parsed-text';
import {StyleSheet, TouchableOpacity} from 'react-native';
import { COLORS } from '../../functions/constants';
import { goToComments, handleGoToUser } from '../../functions/helpers';
import {Pressable, Text} from "native-base";
import {useSelector} from "react-redux";
import {getOneUser, openUser} from "../../redux/actions/userActions";

function TextParser({ description, maxLenght, post }) {
  const [text, setText] = React.useState('');
  const [users, setUsers] = React.useState([]);
  const [tags, setTags] = React.useState([]);
  const { friends } = useSelector((state) => state.user);

  const parsingUserTag = async (description) => {
    let newDesc = description;
    const tags = newDesc?.match(/<(.*?)>/gm);
    const tagsVar2 = newDesc?.match(/\@[a-zA-Z]*/gm);
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
    console.log(friend)
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

  return (
    <ParsedText
      style={{
        maxWidth: 299,
        width: 299,
        fontSize: 14,
        fontWeight: '300'
      }}
      ellipsizeMode="tail"
      numberOfLines={4}
      parse={
              [
                {
                  pattern: /\@[a-zA-Z]*/gm,
                  style: styles.tag,
                  onPress: handleOpenFriend
                },
                {
                  pattern: /...еще/gm,
                  style: styles.link,
                  renderText: renderText,
                  onPress: handleClickMore
                }
              ]
          }
      childrenProps={{allowFontScaling: false}}
    >
      { maxLenght ? ((text)?.length >= 120)
        ? (`${(text).substring(0, 120 - 3)}...еще`)
        : text : text}
    </ParsedText>
  );
}

const styles = StyleSheet.create({
  tag: {
    color: COLORS.purple,
  },
  link: {
    color: COLORS.gray,
    marginLeft: 15,
    fontSize: 14,
  }
});

export default TextParser;
