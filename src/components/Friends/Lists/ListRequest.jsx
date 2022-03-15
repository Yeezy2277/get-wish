import React from 'react';
import {
  Box, FlatList, Avatar, HStack, Text, Heading, Image, VStack, Button
} from 'native-base';
import { COLORS } from '../../../functions/constants';
import AuthButton from '../../Shared/AuthButton';

function ListRequest() {
  const data = [{
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    fullName: 'Aafreen Khan',
    status: 'friend',
    timeStamp: '12:47 PM',
    recentText: 'Good Day!',
    avatarUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
  }, {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    fullName: 'Sujitha Mathur',
    timeStamp: '11:11 PM',
    status: 'friend',
    recentText: 'Cheer up, there!',
    avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU'
  }, {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    fullName: 'Anci Barroco',
    timeStamp: '6:22 PM',
    status: 'sent',
    recentText: 'Good Day!',
    avatarUrl: 'https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg'
  }, {
    id: '68694a0f-3da1-431f-bd56-142371e29d72',
    fullName: 'Aniket Kumar',
    timeStamp: '8:56 PM',
    status: 'rejected',
    recentText: 'All the best',
    avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU'
  }, {
    id: '28694a0f-3da1-471f-bd96-142456e29d72',
    fullName: 'Kiara',
    status: 'friend',
    timeStamp: '12:47 PM',
    recentText: 'I will call today.',
    avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU'
  }];
  return (
    <Box width="100%" paddingLeft="20px" paddingRight="20px">
      <Heading fontSize="15px" pb="19px" color={COLORS.gray}>
        5 заявок
      </Heading>
      <FlatList
        data={data}
        renderItem={({
          item
        }) => (
          <Box
            pb="30px"
          >
            <HStack space={3}>
              <Avatar
                size="62px"
                source={{
                  uri: item.avatarUrl
                }}
              />
              <VStack flex={1}>
                <Text
                  color={COLORS.black}
                  fontSize="14px"
                  fontWeight="600"
                >
                  {item.fullName}
                </Text>
                <HStack marginTop="10px" space={3} alignItems="center">
                  {item.status === 'friend' && (
                  <>
                    <Button
                      style={{
                        backgroundColor: COLORS.white,
                        height: 30,
                        width: 120,
                        maxWidth: 120,
                        borderRadius: 10,
                        flex: 1
                      }}
                      _text={{
                        color: '#8424FF',
                        fontSize: 14,
                        lineHeight: 16
                      }}
                    >
                      Отклонить
                    </Button>
                    <AuthButton
                      higlightStyle={{ height: 30 }}
                      lineHeightText={30}
                      style={{
                        height: 30,
                        width: 120,
                        maxWidth: 120,
                        borderRadius: 10,
                      }}
                      variant="small"
                      text="Принять"
                    />
                  </>
                  )}
                  {item.status === 'rejected' && (
                  <>
                    <Image width="9px" height="9px" source={require('../../../assets/images/icons/friends/cancel.png')} />
                    <Text fontSize={12} fontWeight="600" color={COLORS.gray}>Заявка отклонена</Text>
                  </>
                  )}
                  {item.status === 'sent' && (
                  <>
                    <Image width="11px" height="10px" source={require('../../../assets/images/icons/friends/check.png')} />
                    <Text fontSize={12} fontWeight="600" color={COLORS.gray}>Заявка принята</Text>
                    <Text marginLeft="14px" fontSize={12} fontWeight="700" color={COLORS.purple}>Написать сообщение</Text>
                  </>
                  )}
                </HStack>
              </VStack>
            </HStack>
          </Box>
        )}
        keyExtractor={(item) => item.id}
      />
    </Box>
  );
}

export default ListRequest;
