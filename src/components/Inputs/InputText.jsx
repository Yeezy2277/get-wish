import React from 'react';
import {
  Box, Image, Input, Pressable, Text
} from 'native-base';
import { Animated } from 'react-native';
import { COLORS } from '../../functions/constants';
import ChoseWishActionsheet from '../Actionsheet/ChoseWishActionsheet';

function InputText({
  value, onChange, marginTop = '0px', marginBottom = '0px', label = 'Название', link = false,
  description = false, select = false, active, setActive, data, disabled, setDisabled
}) {

  const [focused, setFocused] = React.useState(false);
  const [visibleActions, setVisibleActions] = React.useState(false);
  let _animatedIsFocused = new Animated.Value(value === '' ? 0 : 1);
  let style = {
    left: 18,
    position: 'absolute',
    top: _animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [18, 8],
    }),
    fontSize: _animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [15, 12],
    }),
    color: '#7C82A5'
  };
  const handleBlur = () => {
    setFocused(false);
  };
  const handleFocus = () => {
    setFocused(true);
  };

  const Right = React.useCallback(() => {
    if (link) {
      return (
        <Image
          resizeMode="contain"
          marginRight="18px"
          size="16px"
          source={require('../../assets/images/icons/users/link.png')}
        />
      );
    }
    return null;
  }, []);

  const TextInfo = React.useCallback(() => {
    if (description) {
      return (
        <Text
          right="18px"
          top="11px"
          position="absolute"
          fontSize="10px"
          color={value?.length >= 150 ? COLORS.red
            : COLORS.gray2}
        >
          {value?.length}
          /150
        </Text>
      );
    }
    return null;
  }, [value]);

  React.useEffect(() => {
    Animated.timing(_animatedIsFocused, {
      toValue: (focused || value !== '') ? 1 : 0,
      duration: 200,
    }).start();
  }, [_animatedIsFocused, focused, value]);

  const handleKeyPress = ({ nativeEvent: { key: keyValue } }) => {
    if (description) {
      if (value.length >= 150 && keyValue !== 'Backspace') {
        setDisabled(true);
      } else {
        setDisabled(false);
      }
    }
  };

  const handleChangeVisible = () => {
    setVisibleActions(true);
  };

  if (select) {
    return (
      <>
        <Box width="100%" marginTop={marginTop} position="relative">
          <Pressable
            marginBottom={marginBottom}
            onPress={handleChangeVisible}
            paddingLeft="16.5px"
            borderWidth={0}
            backgroundColor={COLORS.extralightGray}
            borderRadius="12px"
            position="relative"
            height="56px"
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            fontSize="15px"
            rightElement={link ? <Right /> : description ? <TextInfo /> : null}
            paddingRight="18px"
            width="100%"
          >
            <Text maxWidth="80%">
              <Text>
                {data?.length ? data?.find((el) => el.id === active)?.symbol : ''}
                {'   '}
              </Text>
              <Text fontSize="18px">
                {data?.length ? data?.find((el) => el.id === active)?.name : ''}
              </Text>
            </Text>
            <Image
              style={{ transform: [{ rotate: visibleActions ? '180deg' : '0deg' }] }}
              width="10px"
              height="6px"
              source={require('../../assets/images/icons/wishlist/down.png')}
            />
          </Pressable>
        </Box>
        <ChoseWishActionsheet
          data={data}
          setActive={setActive}
          active={active}
          open={visibleActions}
          handleClose={() => setVisibleActions(false)}
        />
      </>
    );
  }

  return (
    <Box width="100%" marginTop={marginTop} position="relative">
      <Input
        selectionColor={COLORS.purple}
        paddingTop="27px"
        marginBottom={marginBottom}
        value={value}
        onKeyPress={handleKeyPress}
        onChange={async ({
          nativeEvent: {
            text
          }
        }) => {
          if (description) {
            if (!text) {
              setFocused(false);
            }
            if (!disabled) {
              await onChange(text);
            }
          } else {
            if (!text) {
              setFocused(false);
            }
            await onChange(text);
          }

        }}
        paddingLeft="18px"
        borderWidth={0}
        backgroundColor={COLORS.extralightGray}
        borderRadius="12px"
        position="relative"
        height={!description ? '56px' : 'auto'}
        maxHeight="150px"
        multiline={description}
        type="text"
        fontSize="15px"
        onFocus={handleFocus}
        onBlur={handleBlur}
        rightElement={link ? <Right /> : description ? <TextInfo /> : null}
        paddingRight="18px"
        width="100%"
      />
      <Animated.Text style={style}>
        {label}
      </Animated.Text>
    </Box>
  );
}

export default InputText;
