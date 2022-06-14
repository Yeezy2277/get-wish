import React from 'react';
import ParsedText from 'react-native-parsed-text';
import { StyleSheet } from 'react-native';
import { COLORS } from '../../functions/constants';
import { goToComments, handleGoToUser, parsingUserTag } from '../../functions/helpers';

function TextParser({ description, maxLenght, post }) {
  const [text, setText] = React.useState('');
  const [users, setUsers] = React.useState([]);
  React.useEffect(() => {
    (async function () {
      const {
        description:
            descriptionAnswer, users: usersAnswer
      } = await parsingUserTag(description);
      setUsers(usersAnswer);
      setText(descriptionAnswer);
    }());
  }, []);

  const handleOpenFriend = async (friend) => {
    const { id } = users.find((el) => el.username === friend.split('@')[1]);
    await handleGoToUser(id);
  };

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
                  pattern: /... еще/gm,
                  style: styles.link,
                  onPress: handleClickMore
                }
              ]
          }
    >
      { maxLenght ? ((text)?.length >= 120)
        ? (`${(text).substring(0, 120 - 3)}... еще`)
        : text : text}
    </ParsedText>
  );
}

const styles = StyleSheet.create({
  tag: {
    color: COLORS.purple,
  },
  link: {
    color: COLORS.gray
  }
});

export default TextParser;
