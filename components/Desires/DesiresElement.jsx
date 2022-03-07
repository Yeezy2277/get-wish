import React from 'react';
import PropTypes from 'prop-types';
import {
    DesiresElementAvatar,
    DesiresElementAvatarImage,
    DesiresElementColumn,
    DesiresElementImage
} from "../../styles/profile";

function DesiresElement({source, empty = false}) {
    return (
            <DesiresElementColumn>
                <DesiresElementImage source={source ? source : require('../../assets/images/icons/profile/desires/example1.png')} resizeMode="cover"/>
                {!empty && <DesiresElementAvatar>
                    <DesiresElementAvatarImage source={require('../../assets/images/icons/profile/desires/avatar1.png')}
                                               resizeMode="cover"/>
                </DesiresElementAvatar>}
            </DesiresElementColumn>
    );
}

DesiresElement.propTypes = {
    source: PropTypes.number,
    empty: PropTypes.bool
}

export default DesiresElement;
