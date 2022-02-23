import React from 'react';
import {HeaderArrow, HeaderPressable, HeaderRow, HeaderTitle} from "../../styles/shared";

function Header({navigation, title}) {
    return (
        <HeaderRow>
            <HeaderPressable onPress={() => navigation.navigation.goBack()}>
                <HeaderArrow source={require('../../assets/images/icons/arrow.png')}/>
            </HeaderPressable>
            <HeaderTitle>{title}</HeaderTitle>
        </HeaderRow>
    );
}

export default Header;
