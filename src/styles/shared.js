import styled from 'styled-components/native/dist/styled-components.native.esm';

export const ButtonAuthLabel = styled.Text`
  font-family: 'Nunito';
  color: #FFFFFF;
  font-weight: bold;
`;

export const ButtonAuthLabelVariant2 = styled.Text`
  font-family: 'NunitoBold';
  position: absolute;
  text-align: center;
  font-size: 15px;
  color: #FFFFFF;
`;

export const NicknameContainer = styled.View`
  font-family: 'Nunito';
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 60px;
  position: relative;
`;

export const TextFieldTwoContainer = styled.View`
  font-family: 'Nunito';
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
  position: relative;
`;

export const NicknameBottom = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: auto;
`;

export const NicknameLabel = styled.View`
  position: absolute;
  left: 18px;
  z-index: 10;
  top: 9px;
`;

export const TextFieldLabel = styled.View`
  position: absolute;
  left: 11px;
  z-index: 10;
  top: 11px;
`;

export const PressableTextField = styled.Pressable`
  position: absolute;
  right: 15px;
  z-index: 10;
  height: 16px;
  width: 16px;
  border-radius: 8px;
  top: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TextFieldCloseIcon = styled.Image`
  z-index: 10;
  height: 16px;
  width: 16px;
  border-radius: 8px;
`;

export const TextFieldLabelText = styled.Text`
  font-size: 15px;
  line-height: 20px;
  color: #7C82A5;
`;

export const NicknameLabelText = styled.Text`
  font-size: 12px;
  line-height: 16px;
  color: #7C82A5;
`;
export const NicknameInput = styled.TextInput`
  width: 100%;
  height: 56px;
  background-color: #F7F7F7;
  border-radius: 12px;
  font-size: 15px;
  line-height: 20px;
  padding-left: ${(props) => props.errorAnimation || 18}px;
  padding-bottom: 9px;
  padding-top: 27px;
  color: #1A1A1A;
`;

export const TextFieldTwoInput = styled.TextInput`
  width: 100%;
  height: 42px;
  background-color: #F7F7F7;
  border-radius: 12px;
  font-size: 15px;
  line-height: 20px;
  padding-right: 35px;
  padding-left: ${(props) => props.errorAnimation || 97}px;
  padding-bottom: 11px;
  padding-top: 11px;
  color: #1A1A1A;
`;

export const NicknameError = styled.Text`
  font-size: 13px;
  line-height: 18px;
  color: #FF3D54;
  font-family: 'Nunito';
  margin-left: 4px;
  margin-top: 10px;
`;

export const NicknameSuccess = styled.Text`
  font-size: 13px;
  line-height: 18px;
  color: #00D085;
  font-family: 'Nunito';
  margin-left: 4px;
  margin-top: 10px;
`;

export const NicknameField = styled.View`
  display: flex;
  flex-direction: column;
`;

export const FormGroupContainer = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: ${(props) => props.lst}px;
  background: #F7F7F7;
  border-radius: 12px;
`;

export const FormGroupElement = styled.View`
  padding: 11px 14px 10px 14px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const FormGroupElementDate = styled.View`
  padding: 11px 14px 5px 14px;
  height: 45px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const FormGroupElementSwitch = styled.View`
  padding: 10px 14px 10px 14px;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

export const FormGroupLine = styled.View`
  width: 100%;
  padding-left: 14px;
`;
export const FormGroupLineElement = styled.View`
  height: 1px;
  background-color: #EBEFFF;
`;

export const FormGroupText = styled.Text`
  font-family: 'Nunito';
  font-size: 15px;
  line-height: 20px;
  color: #7C82A5;
`;

export const FormGroupTextSwitch = styled.Text`
  font-family: 'Nunito';
  font-size: 15px;
  line-height: 20px;
  text-align: center;
  color: #1A1A1A;
`;

export const FormGroupTextInput = styled.TextInput`
  font-family: 'Nunito';
  font-size: ${(props) => (props.android ? 12 : 15)}px;
  margin-top: 0;
  text-align: right;
  color: #1A1A1A;
  min-width: 82px;
  height: 20px;
`;

export const FormGroupSelect = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const FormGroupSwitch = styled.Switch`
  width: 50px;
  height: 30px;
`;

export const FormGroupSelectText = styled.Text`
  font-family: 'Nunito';
  font-size: 15px;
  color: #1A1A1A;
  line-height: 20px;
`;

export const FormGroupButton = styled.TouchableHighlight`
  
`;

export const FormGroupButtonText = styled.Text`
  font-family: 'Nunito';
  font-size: 15px;
  line-height: 20px;
  color: ${(props) => props.color || '#1A1A1A'};
`;

export const HeaderRow = styled.View`
  display: flex;
  flex-direction: row;
  padding: 44px 20px 0 20px;
  justify-content: center;
  position: relative;
  background-color: #fff;
  height: 88px;
  align-items: center;
`;

export const HeaderArrow = styled.Image`
  height: 16px;
  width: 8px;
`;

export const HeaderArrowMore = styled.Image`
  height: 4px;
  width: 20px;
`;

export const HeaderAvatar = styled.Image`
  height: 30px;
  width: 30px;
  border-radius: 15px;
`;

export const HeaderArchive = styled.Image`
  height: 22px;
  width: 24px;
`;

export const HeaderPressable = styled.Pressable`
  width: 26px;
  height: 26px;
  position: absolute;
  z-index: 10;
  top: 58px;
  left: 20px;
`;

export const HeaderPressableMore = styled.Pressable`
  width: 26px;
  height: 26px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  top: 53px;
  right: 20px;
`;

export const HeaderPressableAvatar = styled.Pressable`
  width: 30px;
  z-index: 999;
  height: 30px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 51px;
  right: 20px;
`;

export const HeaderPressableArchive = styled.Pressable`
  width: 22px;
  height: 24px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 55px;
  right: 20px;
`;

export const HeaderTitle = styled.Text`
  font-family: 'Nunito';
  font-weight: bold;
  font-size: 17px;
  line-height: 23px;
  text-align: center;
  color: #1A1A1A;
  max-width: 253px;
`;

export const SharedGroupContainer = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const SharedGroupText = styled.Text`
  font-family: 'Nunito';
  font-weight: 600;
  margin-bottom: 19px;
  font-size: 15px;
  line-height: 20px;
  color: #7C82A5;
`;

export const SharedGroupElement = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const SharedGroupImage = styled.Image`
  height: 40px;
  margin-left: 20px;
  width: 40px;
  border-radius: 20px;
`;

export const SharedGroupCheckboxText = styled.Text`
  font-family: 'Nunito';
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  margin-left: 10px;
  color: #1A1A1A;
`;

export const ModalContent = styled.View`
  display: flex;
  flex-direction: row;
  background-color: #fff;
  justify-content: space-between;
  width: 100%;
  height: 96px;
  align-items: center;
  padding-left: 20px;
  padding-bottom: 12px;
  padding-right: 20px;
  padding-top: 44px;
`;

export const FriendTabBars = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #fff;
`;

export const WishListTabBarContainer = styled.Pressable`
    width: 50%;
    background-color: #fff;
    height: 44px;
    display: flex;
    flex-direction: row;
    border-bottom-width: 2px;
    border-bottom-color: ${(props) => (props.active ? '#8424FF' : '#EBEFFF')};
    justify-content: center;
    align-items: center;
`;

export const FriendTabBarContainer = styled.Pressable`
    width: 33.333%;
    background-color: #fff;
    height: 44px;
    display: flex;
    flex-direction: row;
    border-bottom-width: 2px;
    border-bottom-color: ${(props) => (props.active ? '#8424FF' : '#fff')};
    justify-content: center;
    align-items: center;
`;

export const TabBarPanelContainer = styled.Pressable`
    width: 50%;
    background-color: #fff;
    height: 39px;
    display: flex;
    flex-direction: row;
    border-bottom-width: 2px;
    border-bottom-color: ${(props) => (props.active ? '#8424FF' : '#fff')};
    justify-content: center;
    align-items: center;
`;

export const FriendTabBarImage = styled.Image`
    width: 18px;
    margin-right: 8px;
    height: 16px;
`;

export const TabBarPanelImage = styled.Image`
    width: 18px;
    height: 18px;
`;
