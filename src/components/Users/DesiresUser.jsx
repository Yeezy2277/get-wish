import React from 'react';
import { ScrollView, VStack } from 'native-base';
import { useSelector } from 'react-redux';
import ReservedDesiresUser from '../Profile/ReservedDesiresUser';
import { PrivateAccount } from '../index';

function DesiresUser() {
  const { oneUser } = useSelector((state) => state.user);
  return (
    <ScrollView>
      {(oneUser?.private && !oneUser?.is_friend) ? (
        <PrivateAccount />
      )
        : (
          <VStack paddingRight="15px" paddingLeft="15px" marginTop="15px">
            <ReservedDesiresUser />
          </VStack>
        )}
    </ScrollView>

  );
}

export default DesiresUser;
