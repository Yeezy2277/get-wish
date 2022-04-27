import styled from 'styled-components/native/dist/styled-components.native.esm';

export const WishListContainer = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding-left: 20px;
  flex: 1;
  padding-right: 20px;
`;

export const WishListAddUser = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  justify-content: space-between;
`;

export const WishListPrivateText = styled.Text`
  margin-top: 10px;
  max-width: 338px;
  align-self: flex-start;
  font-family: 'Nunito';
  font-size: 13px;
  line-height: 18px;
  color: #7C82A5;
`;
