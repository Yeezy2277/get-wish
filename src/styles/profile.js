import styled from 'styled-components/native/dist/styled-components.native.esm';

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
  box-shadow: 0 0 5px rgba(0, 99, 249, 0.15);
  
  right: -13px;
  width: 36px;
`;

export const ReservedDesiresContainer = styled.Pressable`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 20px 20px 20px;
  height: 128px;
  width: 100%;
  border-radius: 10px;
  background-color: #F7F7F7;
  margin-top: 30px;
  margin-bottom: 20px;
`;

export const ReservedDesiresUserContainer = styled.ImageBackground`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0 5px rgba(0, 99, 249, 0.15);
  padding: 15px;
  min-height: 158px;
  width: 100%;
  border-radius: 10px;
  background-color: #F7F7F7;
  margin-bottom: 10px;
`;

export const ReservedDesiresTitle = styled.Text`
  font-family: 'Nunito';
  font-size: 15px;
  line-height: 20px;
  text-align: center;
  color: #1A1A1A;
`;

export const ReservedDesiresUserTitle = styled.Text`
  font-weight: bold;
  font-family: 'Nunito';
  align-self: flex-start;
  font-size: 16px;
  line-height: 16px;
  color: #1A1A1A;
  max-width: 80%;
`;

export const ReservedDesiresUserSubTitle = styled.Text`
  font-family: 'Nunito';
  margin-top: 5px;
  align-self: flex-start;
  font-size: 13px;
  line-height: 17px;
  color: #7C82A5;
`;

export const ReservedDesiresRow = styled.View`
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  margin-top: 14px;
  height: 58px;
`;

export const DesiresElementColumn = styled.View`
  max-width: 58px;
  height: 100%;
`;

export const DesiresScreenRow = styled.View`
  margin-top: 20px;
  padding: 0 15px 0 15px;
  display: flex;
  flex-direction: column;
  margin-bottom: 100px;
  align-items: center;
`;

export const DesiresScreenElementContainer = styled.View`
  padding: 15px;
  margin-bottom: 10px;
  background: #FFFFFF;
  box-shadow: 0px 2px 20px rgba(116, 118, 115, 0.1);
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 120px;
`;

export const DesiresScreenElementImage = styled.Image`
  width: 100%;
  height: 90px;
  max-width: 90px;
  border-radius: 6px;
`;

export const DesiresScreenElementContent = styled.View`
  padding-left: 15px;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const DesiresScreenElementContentDescription = styled.Text`
  font-family: 'Nunito';
  font-size: 13px;
  line-height: 18px;
  max-width: 90%;
  color: #7C82A5;
  margin-top: 5px;
`;

export const DesiresScreenElementContentBottom = styled.View`
  margin-top: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const DesiresScreenElementContentBottomIconContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const DesiresScreenElementContentBottomIcon = styled.Image`
  width: 10px;
  height: ${(props) => props.h}px;
`;

export const DesiresScreenElementContentBottomAvatar = styled.Image`
  width: 26px;
  height: 26px;
  margin-left: auto;
  border-radius: 13px;
`;

export const DesiresScreenElementContentBottomText = styled.Text`
  font-family: 'Nunito';
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  color: #8424FF;
  margin-left: 7px;
  max-width: 200px;
`;

export const DesiresScreenElementContentHeader = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const DesiresScreenElementContentHeaderTitle = styled.Text`
  font-size: 15px;
  max-width: 80%;
  line-height: 20px;
  color: #1A1A1A;
`;

export const DesiresScreenElementContentHeaderImage = styled.Image`
  width: 3px;
  height: 15px;

`;

export const DesiresElementImage = styled.Image`
  position: relative;
  max-width: 58px;
  height: 58px;
  border-radius: 10px;
`;

export const DesiresElementAvatarImage = styled.Image`
  max-width: 26px;
  height: 26px;
  border-radius: 13px;
`;

export const DesiresElementAvatar = styled.View`
  height: 28px;
  position: absolute;
  background: #FFFFFF;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 14px;
  bottom: -7px;
  right: -7px;
  width: 28px;
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

export const ImageViewHeader = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 44px;
  justify-content: space-between;
  margin-top: 44px;
  width: 100%;
  margin-bottom: 131px;
  position: relative;
  padding: 0 19px;
`;

export const ImageViewBottom = styled.View`
  display: flex;
  flex-direction: row;
  height: 44px;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  margin-bottom: 34px;
  width: 100%;
  padding: 0 20px 0 19px;
`;

export const ImageViewCancel = styled.Text`
  font-family: 'Nunito';
  font-weight: ${(props) => (props.bold ? 'bold' : 600)};
  font-size: 16px;
  line-height: 22px;
  color: #ffffff;
`;

export const ImageViewTitle = styled.Text`
  font-family: 'Nunito';
  font-weight: bold;
  font-size: 17px;
  line-height: 23px;
  left: 40%;
  color: #FFFFFF;
  position: absolute;
`;

export const ImageViewContainer = styled.View`
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

export const ImageViewSourceContainer = styled.View`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 375px;
  background-color: #000000;
`;

export const ImageViewSource = styled.Image`
  position: relative;
  width: 375px;
  height: 375px;
  z-index: 2;
`;

export const ShareScreenHeader = styled.View`
  position: relative;
  height: 88px;
  width: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 44px 20px 0 20px;
`;

export const ShareScreenCancelText = styled.Text`
  position: absolute;
  left: 20px;
  top: 55px;
  font-family: 'Nunito';
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  color: #8424FF;
`;

export const ModalCancelText = styled.Text`
  font-family: 'Nunito';
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  color: #8424FF;
`;

export const ShareScreenTitle = styled.Text`
  font-family: 'Nunito';
  font-weight: bold;
  font-size: 17px;
  line-height: 23px;
  text-align: center;
  color: #1A1A1A;
`;

export const ShareScreenImage = styled.Image`
  width: 20px;
  height: 20px;
`;

export const SearchScreenImage = styled.Image`
  width: 15px;
  height: 15px;
  margin-left: 15px;
`;

export const ShareScreenPressable = styled.Pressable`
  width: 20px;
  top: 56px;
  height: 20px;
  position: absolute;
  right: 20px;
`;

export const ShareScreenButtonPanel = styled.View`
  margin-top: 10px;
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  flex-direction: row;
`;

export const ActionDesires = styled.View`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  width: 100%;
`;

export const ActionDesiresImageContainer = styled.View`
  height: 250px;
  display: flex;
  position: relative;
  width: 100%;
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
  position: relative;
`;

export const ActionDesiresImage = styled.Image`
  height: 250px;
  display: flex;
  width: 100%;
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
`;

export const ActionDesiresCount = styled.View`
  width: 42px;
  right: 15px;
  bottom: 15px;
  flex-direction: row;
  position: absolute;
  height: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3px 8px 2px 6px;
  background: rgba(26, 26, 26, 0.6);
  border-radius: 6px;
`;

export const ActionDesiresCountText = styled.Text`
  font-family: 'Nunito';
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  color: #FFFFFF;
`;

export const ActionDesiresCountIcon = styled.Image`
  width: 14px;
  height: 11px;
`;

export const ActionDesiresRow = styled.View`
  margin-top: 17px;
  padding: 0 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const ActionDesiresRowHeader = styled.View`
  display: flex;
  padding-bottom: 15px;
  border-bottom-width: 1px;
  border-bottom-color: #00000012;
  flex-direction: row;
  width: 100%;
  align-items: center;
`;

export const ActionDesiresRowHeaderAvatar = styled.Image`
  width: 26px;
  height: 26px;
  border-radius: 13px;
`;

export const ActionDesiresRowHeaderName = styled.Text`
  font-family: 'Nunito';
  font-weight: 600;
  font-size: 15px;
  margin-left: 15px;
  color: #1A1A1A;
`;

export const ActionDesiresActions = styled.Pressable`
  margin-left: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ActionDesiresActionsText = styled.Text`
  font-family: 'Nunito';
  font-weight: bold;
  font-size: 15px;
  line-height: 20px;
  color: #8424FF;
`;

export const ActionDesiresActionsIcon = styled.Image`
  width: 8px;
  transform: rotate(180deg);
  height: 12px;
  margin-left: 7px;
`;

export const ActionDesiresRowLinks = styled.View`
  display: flex;
  width: 100%;
  margin-top: 18px;
  flex-direction: row;
  align-items: center;
`;

export const ActionDesiresRowLinksIcon = styled.Image`
  width: 13px;
  height: ${(props) => props.h}px;
`;

export const ActionDesiresRowLinksText = styled.Text`
  font-family: 'Nunito';
  max-width: 50px;
  font-weight: 600;
  font-size: 16px;
  color: #8424FF;
`;

export const ActionDesiresRowLinksMenu = styled.Image`
  width: 4px;
  height: 20px;
`;

export const ActionDesiresRowName = styled.Text`
  font-family: 'NunitoBold';
  font-weight: bold;
  font-size: 18px;
  margin-top: 18px;
  max-width: 80%;
  line-height: 25px;
  color: #1A1A1A;
`;

export const ActionDesiresRowDescription = styled.Text`
  font-family: 'Nunito';
  font-size: 15px;
  line-height: 20px;
  margin-top: 10px;
  color: #1A1A1A;
`;

export const ActionElementChild = styled.View`
  padding: 25px 20px 10px 20px;
  display: flex;
  background-color: #fff;
  align-items: center;
  flex-direction: column;
  width: 100%;
  
`;

export const ActionDesiresChildName = styled.Text`
  font-family: 'Nunito';
  font-weight: bold;
  font-size: 18px;
  line-height: 25px;
  color: #1A1A1A;
  max-width: 250px;
  text-align: center;
`;

export const ActionDesiresChildDescription = styled.Text`
  font-family: 'Nunito';
  font-size: 13px;
  margin-top: 8px;
  line-height: 18px;
  color: #7C82A5;
`;

export const ActionDesiresChildButton = styled.View`
  width: 100%;
  justify-content: space-between;
  margin-top: 25px;
  display: flex;
  flex-direction: row;
  align-items: center;
  
`;

export const ChangeNicknameContainer = styled.View`
  width: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0 20px 0 20px;
`;

export const ChangeNicknameHeader = styled.View`
  padding-top: 44px;
  height: 88px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;
