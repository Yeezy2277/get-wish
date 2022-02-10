import styled from "styled-components/native/dist/styled-components.native.esm";

export const AuthStepContainer = styled.View`
  padding: 0 20px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  font-family: 'Nunito';
`;

export const AuthStepHeader = styled.View`
  height: 44px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 48px;
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
  font-weight: 600;
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
