import React from 'react';
import {
    DesiresScreenElementContainer,
    DesiresScreenElementContent,
    DesiresScreenElementContentBottom, DesiresScreenElementContentBottomAvatar, DesiresScreenElementContentBottomIcon,
    DesiresScreenElementContentBottomIconContainer, DesiresScreenElementContentBottomText,
    DesiresScreenElementContentDescription,
    DesiresScreenElementContentHeader,
    DesiresScreenElementContentHeaderImage,
    DesiresScreenElementContentHeaderTitle,
    DesiresScreenElementImage
} from "../../styles/profile";

function DesiresScreenElement(props) {
    return (
        <DesiresScreenElementContainer>
            <DesiresScreenElementImage source={require('../../assets/images/icons/profile/desires/example1.png')}/>
            <DesiresScreenElementContent>
                <DesiresScreenElementContentHeader>
                    <DesiresScreenElementContentHeaderTitle>Новогодний свитер</DesiresScreenElementContentHeaderTitle>
                    <DesiresScreenElementContentHeaderImage source={require('../../assets/images/icons/profile/desires/menu.png')}/>
                </DesiresScreenElementContentHeader>
                <DesiresScreenElementContentDescription>Размер 42-44</DesiresScreenElementContentDescription>
                <DesiresScreenElementContentBottom>
                    <DesiresScreenElementContentBottomIconContainer>
                        <DesiresScreenElementContentBottomIcon source={require('../../assets/images/icons/profile/desires/link.png')}/>
                        <DesiresScreenElementContentBottomText>zara.ru</DesiresScreenElementContentBottomText>
                    </DesiresScreenElementContentBottomIconContainer>
                    <DesiresScreenElementContentBottomAvatar source={require('../../assets/images/icons/profile/desires/avatar1.png')}/>
                </DesiresScreenElementContentBottom>
            </DesiresScreenElementContent>
        </DesiresScreenElementContainer>
    );
}

export default DesiresScreenElement;
