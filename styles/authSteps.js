import styled from "styled-components/native/dist/styled-components.native.esm";

export const AuthStepContainer = styled.View`
  padding: 0 20px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  font-family: 'Nunito';
`;

export const AuthStepHeader = styled.View`
  height: 44px;
  width: 100%;
  display: flex;
    justify-content: ${props => props.jc};
  flex-direction: row;
  align-items: center;
  margin-bottom: 48px;
`;

export const ExitImage = styled.Image`
    align-self: flex-end;
`;

export const HeaderTouchableHighlight = styled.TouchableHighlight`
  align-self: flex-end;
  width: 74.42px;
  height: 16px;
`;

export const AuthStepContent = styled.View`
  display: flex;
  align-items: center;
  margin-top: ${props => props.mt}px;
`;

export const AuthStepContentHeader = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: ${props => props.mw}px;
`;

export const AuthStepContentHeaderTitle = styled.Text`
  font-weight: bold;
  font-size: 20px;
  line-height: 27.28px;
  color: #1A1A1A;
`;

export const AuthStepContentHeaderText = styled.Text`
  margin-top: 7px;
  color: #7C82A5;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
`;

export const PhoneContainer = styled.View`
  margin-top: 69px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const PhonePrefix = styled.Text`
  color: #1A1A1A;
  font-size: 30px;
  margin-right: 12px;
`;

export const TextOffer = styled.Text`
  font-weight: 300;
  font-size: 12px;
  line-height: 16px;
  color: #7C82A5;
  max-width: 312px;
  margin-top: 119px;
  text-align: center;
  margin-bottom: 20px;
`;

export const TextOfferPurple = styled.Text`
  color: #8424FF;
`

export const Codes = styled.View`
  margin-top: 73px;
  width: 150px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 30px;
`

export const CodeElement = styled.View`
    position: relative;
  display: flex;
  flex-direction: column;
      height: 30px;
      width: 30px;
`

export const CodePlaceholder = styled.View`
        position: absolute;
      align-self: center;
      align-content: center;
      left: 10px;
      top: 10px;
      border-radius: 30px;
      background: #D4DAEC;
      height: 10px;
      width: 10px;
`

export const EnterCodeStepContainer = styled.View`
    display: flex;
    width: 100%;
    align-items: center;
    flex-direction: column;
`


export const EnterCodeStepBottom = styled.View`
    display: flex;
    width: 100%;
    align-items: center;
    flex-direction: column;
    margin-top: auto;
`


export const EnterNickNameStepContainer = styled.View`
    display: flex;
    width: 100%;
    flex-direction: column;
    height: 272px;
`

export const EnterNickNameInfo = styled.Text`
    max-width: 325px;
    align-self: center;
    text-align: center;
    font-size: 13px;
    line-height: 18px;
    color: #7C82A5;
    margin-bottom: 20px;
`

export const TimerContainer = styled.View`
    margin-top: 112px;
    display: flex;
  font-family: 'Nunito';
  flex-direction: row;
  align-items: center;
    margin-bottom: 46px;
    width: 199px;
    height: 21px;
`
export const TimerTexts = styled.Text`
  font-weight: bold;
  font-size: 15px;
  line-height: 20px;
  color: #D4DAEC;
`

export const TimerTextSendAgain = styled.Text`
  font-weight: bold;
  font-size: 15px;
  line-height: 20px;
  align-self: center; 
  width: 100%;
  color: #8424FF;
  text-align: center;
`

export const TimerNumber = styled.Text`
  font-weight: 600;
  font-size: 15px;
  line-height: 20px;
  margin-left: 12px;
  color: #1A1A1A;
`


