import React from 'react';
import {ReservedDesiresContainer, ReservedDesiresPlaceholder, ReservedDesiresTitle} from "../../styles/profile";

function ReservedDesires(props) {
    return (
        <ReservedDesiresContainer>
            <ReservedDesiresTitle>Зарезервированные желания</ReservedDesiresTitle>
            <ReservedDesiresPlaceholder>Загляни на странички своих друзей, чтобы выбрать желания, которые хочешь исполнить.
                Они появятся здесь.</ReservedDesiresPlaceholder>
        </ReservedDesiresContainer>
    );
}

export default ReservedDesires;
