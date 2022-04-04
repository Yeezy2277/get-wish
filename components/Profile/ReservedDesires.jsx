import React from 'react';
import PropTypes from 'prop-types';
import {
    ReservedDesiresContainer,
    ReservedDesiresPlaceholder,
    ReservedDesiresRow,
    ReservedDesiresTitle
} from "../../styles/profile";
import {navigateAction} from "../../functions/NavigationService";
import {DesiresElement} from "../index";
import {useI18n} from "../../i18n/i18n";

function ReservedDesires({empty = false}) {
    const t = useI18n();

    return (
        <ReservedDesiresContainer onPress={() => navigateAction('DesiresScreen')}>
            <ReservedDesiresTitle>{t('profile_reservedDesires')}</ReservedDesiresTitle>
            {empty && <ReservedDesiresPlaceholder>{t('profile_reservedDesiresEmpty')}</ReservedDesiresPlaceholder>}
            {!empty && <ReservedDesiresRow>
                <DesiresElement/>
                <DesiresElement/>
                <DesiresElement/>
                <DesiresElement empty source={require('../../assets/images/icons/profile/desires/placeholder.png')}/>
            </ReservedDesiresRow> }
        </ReservedDesiresContainer>
    );
}

ReservedDesires.propTypes = {
    empty: PropTypes.bool
}

export default ReservedDesires;
