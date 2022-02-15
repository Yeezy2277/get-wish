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
