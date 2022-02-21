import styled from "styled-components/native/dist/styled-components.native.esm";

export const ButtonAuthLabel = styled.Text`
  font-family: 'Nunito';
  color: #FFFFFF;
  font-weight: bold;
`;

export const NicknameContainer = styled.View`
  font-family: 'Nunito';
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 60px;
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
  padding-left: ${props => props.errorAnimation || 18}px;
  padding-bottom: 9px;
  padding-top: 27px;
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
  margin-bottom: ${props => props.lst}px;
  background: #F7F7F7;
  border-radius: 12px;
`;

export const FormGroupElement = styled.View`
  padding: 11px 14px 10px 14px;
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
  font-size: 15px;
  margin-top: 0;
  text-align: right;
  color: #1A1A1A;
  min-width: 82px;
  height: 20px;
`;

export const FormGroupSelect = styled.Text`
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
  font-weight: bold;
  font-size: 15px;
  line-height: 20px;
  color: #8424FF;
`;
