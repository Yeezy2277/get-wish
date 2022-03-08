import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button } from 'native-base';
import {
  ShareScreenButtonPanel
} from '../../styles/profile';
import { FlexContainer } from '../../styles/main';
import { SearchHeader, ShareGroup } from '../../components';
import AuthButton from '../../components/Shared/AuthButton';
import { COLORS } from '../../functions/constants';

function ShareScreen({ navigation }) {

  React.useEffect(() => {
    const parent = navigation.getParent();
    parent.setOptions({ tabBarStyle: { display: 'none' } });
    return () => {
      parent.setOptions({ tabBarStyle: { display: 'flex' } });
    };
  }, []);

  const [checkBox1, setCheckBox1] = React.useState(false);
  const [checkBox2, setCheckBox2] = React.useState(false);
  const [checkBox3, setCheckBox3] = React.useState(false);

  const isDisabled = !checkBox1 && !checkBox2 && !checkBox3;

  const sendSeparately = (checkBox1 && checkBox2 && !checkBox3)
      || (!checkBox1 && checkBox2 && checkBox3) || (checkBox1 && !checkBox2 && checkBox3)
        || (checkBox1 && checkBox2 && checkBox3);

  const onChangeCheckBoxFalse = () => {
    setCheckBox1(false);
    setCheckBox2(false);
    setCheckBox3(false);
  };

  const onChangeCheckBoxTrue = () => {
    setCheckBox1(true);
    setCheckBox2(true);
    setCheckBox3(true);
  };

  return (
    <>
      <SearchHeader cancel title="Получатели" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={styles.container}>
        <FlexContainer>
          <ShareScreenButtonPanel>
            <Button
              style={{
                backgroundColor: COLORS.white, borderRadius: 10, flex: 1, marginRight: 10
              }}
              _text={{
                color: '#8424FF'
              }}
              onPress={onChangeCheckBoxTrue}
            >
              Выбрать всех
            </Button>
            <Button
              isDisabled={isDisabled}
              style={{ backgroundColor: COLORS.white, borderRadius: 10, flex: 1 }}
              _text={{
                color: !isDisabled ? '#8424FF' : '#C8CCE1'
              }}
              onPress={onChangeCheckBoxFalse}
            >
              Снять выбор
            </Button>
          </ShareScreenButtonPanel>
          <ShareGroup
            setCheckBox1={setCheckBox1}
            setCheckBox2={setCheckBox2}
            setCheckBox3={setCheckBox3}
            checkBox1={checkBox1}
            checkBox2={checkBox2}
            checkBox3={checkBox3}
          />
          <AuthButton style={{ marginTop: 'auto', marginBottom: 44 }} active={!isDisabled}>
            {sendSeparately ? 'Отправить по отдельности' : 'Отправить'}
          </AuthButton>
        </FlexContainer>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white2
  }
});

export default ShareScreen;
