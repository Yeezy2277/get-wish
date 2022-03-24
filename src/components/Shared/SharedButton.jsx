import React from 'react';
import { Button } from 'native-base';
import { COLORS } from '../../functions/constants';

function SharedButton({
  style, textStyle, children, onPress, color, flex = true
}) {
  return (
    <Button
      onPress={onPress}
      style={{
        backgroundColor: COLORS.white,
        height: 30,
        width: 120,
        maxWidth: 120,
        borderRadius: 10,
        ...(flex && { flex: 1 }),
        ...style
      }}
      _text={{
        color: color || '#8424FF',
        fontSize: 14,
        lineHeight: 16,
        ...textStyle
      }}
    >
      {children}
    </Button>
  );
}

export default SharedButton;
