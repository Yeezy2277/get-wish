import React from 'react';
import { Checkbox, Box } from 'native-base';
import {
  SharedGroupCheckboxText,
  SharedGroupContainer,
  SharedGroupElement,
  SharedGroupImage,
  SharedGroupText
} from '../../styles/shared';
import {useI18n} from "../../i18n/i18n";

function ShareGroup({
  checkBox3, checkBox1, setCheckBox1, setCheckBox2, setCheckBox3, checkBox2
}) {
  const t = useI18n()
  return (
    <SharedGroupContainer>
      <SharedGroupText>{t('groups')}</SharedGroupText>
      <Box flex={1}>
        <Checkbox marginBottom={15} size="sm" borderRadius={10} onChange={(e) => setCheckBox1(e)} isChecked={checkBox1} value={checkBox1} colorScheme="purple">
          <SharedGroupElement>
            <SharedGroupImage source={require('../../assets/images/icons/profile/desires/avatar1.png')} />
            <SharedGroupCheckboxText>to.kova</SharedGroupCheckboxText>
          </SharedGroupElement>
        </Checkbox>
        <Checkbox marginBottom={15} size="sm" borderRadius={10} onChange={(e) => setCheckBox2(e)} isChecked={checkBox2} value={checkBox2} colorScheme="purple">
          <SharedGroupElement>
            <SharedGroupImage source={require('../../assets/images/icons/profile/desires/avatar1.png')} />
            <SharedGroupCheckboxText>to.kova</SharedGroupCheckboxText>
          </SharedGroupElement>
        </Checkbox>
        <Checkbox size="sm" borderRadius={10} onChange={(e) => setCheckBox3(e)} isChecked={checkBox3} colorScheme="purple" value={checkBox3}>
          <SharedGroupElement>
            <SharedGroupImage source={require('../../assets/images/icons/profile/desires/avatar1.png')} />
            <SharedGroupCheckboxText>to.kova</SharedGroupCheckboxText>
          </SharedGroupElement>
        </Checkbox>
      </Box>
    </SharedGroupContainer>
  );
}

export default ShareGroup;
