import React from 'react';
import PropTypes from 'prop-types';
import {
  ReservedDesiresContainer,
  ReservedDesiresPlaceholder,
  ReservedDesiresRow,
  ReservedDesiresTitle
} from '../../styles/profile';
import { navigateAction } from '../../functions/NavigationService';
import { DesiresElement } from '../index';

function ReservedDesires({ empty = false }) {
  const goToDesires = () => {
    navigateAction('DesiresScreen');
  };
  return (
    <ReservedDesiresContainer onPress={goToDesires}>
      <ReservedDesiresTitle>Зарезервированные желания</ReservedDesiresTitle>
      {empty && (
      <ReservedDesiresPlaceholder>
        Загляни на странички своих друзей, чтобы выбрать желания, которые хочешь
        исполнить.
        Они появятся здесь.
      </ReservedDesiresPlaceholder>
      )}
      {!empty && (
      <ReservedDesiresRow>
        <DesiresElement />
        <DesiresElement />
        <DesiresElement />
        <DesiresElement empty source={require('../../assets/images/icons/profile/desires/placeholder.png')} />
      </ReservedDesiresRow>
      ) }
    </ReservedDesiresContainer>
  );
}

ReservedDesires.propTypes = {
  empty: PropTypes.bool
};

ReservedDesires.defaultProps = {
  empty: false
};

export default ReservedDesires;
