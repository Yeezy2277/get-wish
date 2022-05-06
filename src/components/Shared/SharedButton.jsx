import React from 'react';
import { Button } from 'native-base';
import { COLORS } from '../../functions/constants';

function SharedButton({
  style, textStyle, children, onPress, color, flex = true, lineHeight = 16
}) {
  return (
    <Button
      onPress={onPress}
      style={{
        backgroundColor: COLORS.white,
        height: 30,
        width: 120,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        maxWidth: 120,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        ...(flex && { flex: 1 }),
        ...style
      }}
      _text={{
        color: color || '#8424FF',
        fontSize: 14,
        lineHeight,
        ...textStyle
      }}
    >
      {children}
    </Button>
  );
}

export default SharedButton;
