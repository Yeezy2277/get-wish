import React from 'react';
import {
    ReservedDesiresContainer,
    ReservedDesiresPlaceholder,
    ReservedDesiresRow,
    ReservedDesiresTitle
} from "../../styles/profile";
import DesiresElement from "../Desires/DesiresElement";

function ReservedDesires({empty = false}) {
    return (
        <ReservedDesiresContainer>
            <ReservedDesiresTitle>Зарезервированные желания</ReservedDesiresTitle>
            {empty && <ReservedDesiresPlaceholder>Загляни на странички своих друзей, чтобы выбрать желания, которые хочешь
                исполнить.
                Они появятся здесь.</ReservedDesiresPlaceholder>}
            {!empty && <ReservedDesiresRow>
                <DesiresElement/>
                <DesiresElement/>
                <DesiresElement/>
                <DesiresElement empty source={require('../../assets/images/icons/profile/desires/placeholder.png')}/>
            </ReservedDesiresRow> }
        </ReservedDesiresContainer>
    );
}

export default ReservedDesires;
