import React from 'react';
import {
  Box, ScrollView, Text, VStack
} from 'native-base';
import { useSelector } from 'react-redux';
import ReservedDesiresUser from '../Profile/ReservedDesiresUser';
import { PrivateAccount } from '../index';
import { filterWishList, getWishListUser } from '../../redux/actions/wishListActions';
import useLoader from '../../hooks/useLoader';
import { COLORS } from '../../functions/constants';
import {useI18n} from "../../i18n/i18n";

function DesiresUser() {
  const t = useI18n()
  const { oneUser } = useSelector((state) => state.user);
  const { userWishLists } = useSelector((state) => state.wishList);



  return (
    <ScrollView>
      {(oneUser?.private && !oneUser?.is_friend) ? (
        <PrivateAccount />
      )
        : (
          <VStack paddingBottom="300px" paddingRight="15px" paddingLeft="15px" marginTop="15px">
            {userWishLists?.length ? userWishLists?.map((el) => {
              return (
                <ReservedDesiresUser
                  el={el}
                  id={el.id}
                  name={el.name}
                  key={el.id}
                  isInWishList={false}
                />
              );
            }) : (
              <Box marginTop="40%">
                <Text textAlign="center" fontSize={18} color={COLORS.black}>{t('nothingHere')}</Text>
                <Text marginTop="11px" alignSelf="center" maxWidth="200px" textAlign="center" fontSize={14} color={COLORS.gray}>
                  {t('profile_noPosts')}
                </Text>
              </Box>
            )}
          </VStack>
        )}
    </ScrollView>

  );
}

export default DesiresUser;
