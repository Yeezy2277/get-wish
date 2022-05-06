import React from 'react';
import {
  ReservedDesiresContainer,
  ReservedDesiresPlaceholder,
  ReservedDesiresRow,
  ReservedDesiresTitle
} from '../../styles/profile';
import { DesiresElement } from '../index';
import { goToReservWishList } from '../../functions/helpers';
import {useI18n} from "../../i18n/i18n";

function ReservedDesires({ reservedWishList }) {
  const t = useI18n()
  const goToDesires = () => {
    if (reservedWishList?.length) {
      goToReservWishList();
    }
  };
  const renderReservedWishes = (element) => {
    if (!element) {
      return <DesiresElement empty source={require('../../assets/images/icons/profile/desires/placeholder.png')} />;
    }
    return (
      <DesiresElement
        avatar={element?.user?.avatar
          ? { uri: element?.user?.avatar } : require('../../assets/images/icons/profile/avatar.png')}
        shadow={!element?.image ? 1 : null}
        source={element?.image ? { uri: element?.image } : require('../../assets/images/icons/wishlist/noPhoto.png')}
      />
    );
  };
  return (
    <ReservedDesiresContainer onPress={goToDesires}>
      <ReservedDesiresTitle>{t('desires_reservedDesires')}</ReservedDesiresTitle>
      {!reservedWishList?.length ? (
        <ReservedDesiresPlaceholder>
          {t('desires_reservedDesiresInfo')}
        </ReservedDesiresPlaceholder>
      ) : null}
      {reservedWishList?.length ? (
        <ReservedDesiresRow>
          {renderReservedWishes(reservedWishList[0])}
          {renderReservedWishes(reservedWishList[1])}
          {renderReservedWishes(reservedWishList[2])}
          {renderReservedWishes(reservedWishList[3])}
        </ReservedDesiresRow>
      ) : null}
    </ReservedDesiresContainer>
  );
}

export default ReservedDesires;
