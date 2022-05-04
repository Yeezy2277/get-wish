import React from 'react';
import {
  Avatar, Box, Text, FlatList, Checkbox
} from 'native-base';
import { useSelector } from 'react-redux';
import { COLORS } from '../../../functions/constants';
import { ShareContext } from '../../../functions/context';

function CheckBoxElement({ selecteds, handleAddSelected, item }) {
  const [selected, setSelected] = React.useState(false);
  const { selectedFriends: selectedFriendsRedux } = useSelector((state) => state.wishList);

  React.useEffect(() => {
    if (selecteds?.includes(item.id)) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [item.id, selecteds, selectedFriendsRedux]);

  return (
    <Box
      _dark={{
        borderColor: 'gray.600'
      }}
      width="100%"
      borderColor="coolGray.200"
    >
      <Checkbox
        value={item.id}
        isChecked={selected}
        display="flex"
        alignItems="center"
        flexDirection="row"
        marginBottom={15}
        onChange={(e) => {
          handleAddSelected(e, item.id);
          if (e) {
            setSelected(true);
          } else {
            setSelected(false);
          }
        }}
        flex={1}
        size="sm"
        borderRadius={10}
        colorScheme="purple"
      >
        <Avatar
          marginLeft="20px"
          size="40px"
          source={item?.avatar ? {
            uri: `${item?.avatar}`
          } : require('../../../assets/images/icons/profile/avatar.png')}
        />
        <Text
          marginLeft="10px"
          color={COLORS.black}
          fontSize="14px"
          fontWeight="600"
        >
          {item.username}
        </Text>
      </Checkbox>
    </Box>
  );
}

function ListFriendCheckElement({
  data, first = false
}) {

  const {
    setSelectedFriends: setSelected,
    selectedFriends: selecteds
  } = React.useContext(ShareContext);

  const handleAddSelected = (e, id) => {
    if (selecteds?.find((el) => el === id)) {
      setSelected((prev) => [...prev?.filter((element) => element !== id)]);
    } else {
      setSelected((prev) => [...prev, id]);
    }
  };

  return (
    <FlatList
      style={{
        marginBottom: first ? 30 : 100,
        flexGrow: first ? 0 : 1,
        width: '100%',
        zIndex: -1
      }}
      zIndex={9}
      data={data}
      renderItem={({
        item
      }) => (
        <CheckBoxElement item={item} selecteds={selecteds} handleAddSelected={handleAddSelected} />
      )}
      keyExtractor={(item) => item.id}
    />
  );
}

export default ListFriendCheckElement;
