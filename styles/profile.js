import styled from "styled-components/native/dist/styled-components.native.esm";

export const ProfileHeader = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 1px;
  width: 100%;
`;

export const Avatar = styled.View`
  position: relative;
`;
export const AvatarTouchableHighlight = styled.TouchableHighlight`
  height: 36px;
  position: absolute;
  background: #FFFFFF;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  bottom: -5px;
  box-shadow: 0px 0px 20px rgba(0, 99, 249, 0.15);
  right: -13px;
  width: 36px;
`;

export const ReservedDesiresContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 24px 20px 24px;
  height: 128px;
  width: 100%;
  border-radius: 10px;
  background-color: #F7F7F7;
  margin-top: 30px;
  margin-bottom: 20px;
`;

export const ReservedDesiresTitle= styled.Text`
  font-weight: bold;
  font-family: 'Nunito';
  font-size: 15px;
  line-height: 20px;
  text-align: center;
  color: #1A1A1A;
`;

export const ReservedDesiresPlaceholder = styled.Text`
  font-family: 'Nunito';
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  margin-top: 14px;
  max-width: 280px;
  color: #7C82A5;
`;

export const ProfilePrivateText = styled.Text`
  margin-top: 10px;
  padding-left: 4px;
  max-width: 338px;
  align-self: flex-start;
  font-family: 'Nunito';
  font-size: 13px;
  line-height: 18px;
  color: #7C82A5;
`;
