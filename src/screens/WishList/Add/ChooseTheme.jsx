import React from 'react';
import {
  HStack, Pressable, ScrollView, Text
} from 'native-base';
import { COLORS } from '../../../functions/constants';

function ChooseTheme({ active, setActive, themes }) {
  const [emojis] = React.useState([
    { id: 1, image: '🎄', color: '#EAFFD9' },
    { id: 2, image: '🎁', color: '#FFEAD1' },
    { id: 3, image: '💖', color: '#F5E6EF' },
    { id: 4, image: '💐', color: '#E1FDFF' },
    { id: 5, image: '🥳', color: '#F8E8FF' },
  ]);

  const handleChangeActive = (el) => {
    setActive(el);
  };

  return (
    <ScrollView minHeight="68px" maxHeight="68px" marginTop="20px" marginBottom="24px" horizontal>
      <HStack>
        {themes?.map((el) => {
          return (
            <Pressable
              marginRight="15px"
              key={el.id}
              borderWidth={2}
              justifyContent="center"
              alignItems="center"
              borderColor={el.id === active ? COLORS.purple : COLORS.lightGray}
              height="68px"
              onPress={() => handleChangeActive(el.id)}
              width="68px"
              borderRadius="10px"
              backgroundColor={`#${el.color}`}
            >
              <Text fontSize={38}>{el.symbol}</Text>
            </Pressable>
          );
        })}
      </HStack>
    </ScrollView>
  );
}

export default ChooseTheme;
